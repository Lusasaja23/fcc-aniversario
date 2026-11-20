import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enviarCorreoEvento, esCorreo } from "@/lib/mailer";

function autorizado(request: Request) {
  const pass = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD || "filadelfia22";
  return pass === expected;
}

export async function GET(request: Request) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const registros = await prisma.registro.findMany({
    orderBy: { creadoEn: "desc" },
  });

  return NextResponse.json({
    registros,
    evento: {
      fecha: process.env.EVENTO_FECHA || "Próximamente",
      direccion:
        process.env.EVENTO_DIRECCION || "Templo Filadelfia Cuerpo de Cristo",
    },
  });
}

export async function POST(request: Request) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { accion, id, tipoCorreo = "RECORDATORIO" } = body;

    // Cuando se envía un recordatorio tradicional por WhatsApp, lo marcamos como enviado
    if (accion === "MARCAR_ENVIADO" && id) {
      const actualizado = await prisma.registro.update({
        where: { id: Number(id) },
        data: { recordatorioEnviado: true },
      });
      return NextResponse.json({ ok: true, registro: actualizado });
    }

    // Enviar correo individual (Confirmación o Recordatorio)
    if (accion === "CORREO_INDIVIDUAL" && id) {
      const reg = await prisma.registro.findUnique({ where: { id: Number(id) } });
      if (!reg || !esCorreo(reg.contacto)) {
        return NextResponse.json(
          { error: "Este registro no tiene un correo válido." },
          { status: 400 }
        );
      }

      const tipo = tipoCorreo === "CONFIRMACION" ? "CONFIRMACION" : "RECORDATORIO";

      await enviarCorreoEvento({
        destinatario: reg.contacto,
        identificador: reg.identificador,
        cantidad: reg.cantidad,
        tipo,
      });

      if (tipo === "RECORDATORIO") {
        await prisma.registro.update({
          where: { id: reg.id },
          data: { recordatorioEnviado: true },
        });
      }

      return NextResponse.json({ ok: true });
    }

    // Envío masivo de recordatorios a todos los correos pendientes
    if (accion === "CORREO_MASIVO") {
      const pendientes = await prisma.registro.findMany({
        where: {
          notificar: true,
          recordatorioEnviado: false,
        },
      });

      const conCorreo = pendientes.filter((r) => esCorreo(r.contacto));
      let enviados = 0;

      for (const reg of conCorreo) {
        await enviarCorreoEvento({
          destinatario: reg.contacto,
          identificador: reg.identificador,
          cantidad: reg.cantidad,
          tipo: "RECORDATORIO",
        });
        await prisma.registro.update({
          where: { id: reg.id },
          data: { recordatorioEnviado: true },
        });
        enviados++;
      }

      return NextResponse.json({ ok: true, enviados });
    }

    return NextResponse.json({ error: "Acción no reconocida." }, { status: 400 });
  } catch (error: unknown) {
    console.error("Error en acción admin:", error);
    const msg =
      error instanceof Error ? error.message : "Error enviando el correo.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  await prisma.registro.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}