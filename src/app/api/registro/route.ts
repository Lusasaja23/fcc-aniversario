import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { enviarCorreoEvento, esCorreo } from "@/lib/mailer";

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function normalizarContacto(valor: string): string {
  const limpio = valor.trim();
  if (esCorreo(limpio)) {
    return limpio.toLowerCase();
  }
  const soloDigitos = limpio.replace(/\D/g, "");
  if (soloDigitos.length === 11 && soloDigitos.startsWith("51")) {
    return soloDigitos.slice(2);
  }
  return soloDigitos || limpio.toLowerCase();
}

function limpiarEspacios(texto: string): string {
  return texto.trim().replace(/\s+/g, " ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      modalidad,
      nombrePersona,
      apellidoFamilia,
      cantidadFamilia,
      listaGrupo,
      contacto,
      notificar,
    } = body;

    if (!contacto || !contacto.trim()) {
      return NextResponse.json(
        { error: "El teléfono o correo de contacto es obligatorio." },
        { status: 400 }
      );
    }

    const contactoOriginal = limpiarEspacios(contacto);
    const esEmail = esCorreo(contactoOriginal);
    const digitosTelefono = contactoOriginal.replace(/\D/g, "");

    if (!esEmail && digitosTelefono.length < 7) {
      return NextResponse.json(
        { error: "Ingresa un número de teléfono o correo electrónico válido." },
        { status: 400 }
      );
    }

    let identificador = "";
    let cantidad = 1;
    let integrantes: string | null = null;
    let nombresIndividualesVerificar: string[] = [];

    if (modalidad === "PERSONA") {
      if (!nombrePersona?.trim()) {
        return NextResponse.json(
          { error: "Ingresa tu nombre y apellido." },
          { status: 400 }
        );
      }
      identificador = limpiarEspacios(nombrePersona);
      cantidad = 1;
      nombresIndividualesVerificar = [identificador];
    } else if (modalidad === "FAMILIA") {
      const cant = Number(cantidadFamilia);
      if (!apellidoFamilia?.trim() || isNaN(cant) || cant < 2) {
        return NextResponse.json(
          {
            error:
              "Ingresa el apellido familiar y una cantidad válida (mínimo 2).",
          },
          { status: 400 }
        );
      }
      const apellidoSinPrefijo = limpiarEspacios(apellidoFamilia).replace(
        /^familia\s+/i,
        ""
      );
      identificador = `Familia ${apellidoSinPrefijo}`;
      cantidad = cant;
    } else if (modalidad === "GRUPO") {
      const limpios = Array.isArray(listaGrupo)
        ? listaGrupo.map((n: string) => limpiarEspacios(n)).filter(Boolean)
        : [];

      if (limpios.length < 2) {
        return NextResponse.json(
          { error: "Añade al menos 2 nombres en la lista del grupo." },
          { status: 400 }
        );
      }

      const vistosEnGrupo = new Set<string>();
      for (const persona of limpios) {
        const norm = normalizarTexto(persona);
        if (vistosEnGrupo.has(norm)) {
          return NextResponse.json(
            {
              error: `El nombre "${persona}" está repetido dentro de la lista del grupo.`,
            },
            { status: 400 }
          );
        }
        vistosEnGrupo.add(norm);
      }

      identificador = limpios.join(", ");
      integrantes = JSON.stringify(limpios);
      cantidad = limpios.length;
      nombresIndividualesVerificar = limpios;
    } else {
      return NextResponse.json(
        { error: "Modalidad no válida." },
        { status: 400 }
      );
    }

    // Verificación anti-duplicados (teléfonos, correos y nombres exactos)
    const registrosExistentes = await prisma.registro.findMany({
      select: {
        modalidad: true,
        identificador: true,
        integrantes: true,
        contacto: true,
      },
    });

    const contactoNuevoNorm = normalizarContacto(contactoOriginal);
    const identificadorNuevoNorm = normalizarTexto(identificador);

    for (const reg of registrosExistentes) {
      if (normalizarContacto(reg.contacto) === contactoNuevoNorm) {
        return NextResponse.json(
          {
            error: esEmail
              ? "Este correo electrónico ya fue registrado anteriormente."
              : "Este número de teléfono ya fue registrado anteriormente.",
          },
          { status: 409 }
        );
      }

      if (normalizarTexto(reg.identificador) === identificadorNuevoNorm) {
        return NextResponse.json(
          {
            error: `Ya existe una confirmación registrada a nombre de "${reg.identificador}".`,
          },
          { status: 409 }
        );
      }

      if (nombresIndividualesVerificar.length > 0) {
        const nombresExistentes: string[] = [];

        if (reg.modalidad === "PERSONA") {
          nombresExistentes.push(normalizarTexto(reg.identificador));
        } else if (reg.modalidad === "GRUPO" && reg.integrantes) {
          try {
            const parsed = JSON.parse(reg.integrantes);
            if (Array.isArray(parsed)) {
              parsed.forEach((n: string) =>
                nombresExistentes.push(normalizarTexto(n))
              );
            }
          } catch {
            // Ignorar JSON antiguo si existiera
          }
        }

        for (const candidato of nombresIndividualesVerificar) {
          if (nombresExistentes.includes(normalizarTexto(candidato))) {
            return NextResponse.json(
              {
                error: `"${candidato}" ya cuenta con un registro confirmado para el evento.`,
              },
              { status: 409 }
            );
          }
        }
      }
    }

    const contactoParaGuardar = esEmail
      ? contactoOriginal.toLowerCase()
      : contactoNuevoNorm;

    const nuevoRegistro = await prisma.registro.create({
      data: {
        modalidad,
        identificador,
        integrantes,
        cantidad,
        contacto: contactoParaGuardar,
        notificar: Boolean(notificar),
      },
    });

    // Envío con await para que Vercel no congele la función antes de enviar el correo
    if (esEmail && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await enviarCorreoEvento({
          destinatario: contactoParaGuardar,
          identificador,
          cantidad,
          tipo: "CONFIRMACION",
        });
      } catch (err) {
        console.error(
          "Aviso: El registro se guardó, pero falló el correo:",
          err
        );
      }
    }

    return NextResponse.json(
      { ok: true, registro: nuevoRegistro },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Este nombre, teléfono o correo ya se encuentra registrado." },
        { status: 409 }
      );
    }

    console.error("Error al registrar asistente:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al guardar tu registro." },
      { status: 500 }
    );
  }
}