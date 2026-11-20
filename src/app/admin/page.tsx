"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  Users,
  Bell,
  Mail,
  MessageCircle,
  CheckCircle2,
  Trash2,
  Download,
  Search,
  RefreshCw,
  ArrowLeft,
  Send,
  CheckCheck,
} from "lucide-react";

interface Registro {
  id: number;
  modalidad: "PERSONA" | "FAMILIA" | "GRUPO";
  identificador: string;
  integrantes: string | null;
  cantidad: number;
  contacto: string;
  notificar: boolean;
  recordatorioEnviado: boolean;
  creadoEn: string;
}

const esEmail = (valor: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

function formatearTelefonoWhatsApp(contacto: string) {
  const soloDigitos = contacto.replace(/\D/g, "");
  if (soloDigitos.length === 9) return `51${soloDigitos}`;
  return soloDigitos;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const [registros, setRegistros] = useState<Registro[]>([]);
  const [eventoInfo, setEventoInfo] = useState({
    fecha: "Próximamente",
    direccion: "Templo Filadelfia Cuerpo de Cristo",
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<"TODOS" | "RECORDAR" | "PENDIENTES">("TODOS");
  const [procesandoKey, setProcesandoKey] = useState<string | null>(null);
  const [enviandoMasivo, setEnviandoMasivo] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState("");

  const cargarDatos = async (clave = password) => {
    setCargando(true);
    setErrorLogin("");
    try {
      const res = await fetch("/api/admin/registros", {
        headers: { "x-admin-password": clave },
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorLogin(data.error || "Clave incorrecta");
        setAutenticado(false);
        return;
      }

      setRegistros(data.registros);
      if (data.evento) setEventoInfo(data.evento);
      setAutenticado(true);
    } catch {
      setErrorLogin("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    cargarDatos(password);
  };

  // WhatsApp Tradicional (wa.me): soporta tanto "CONFIRMACION" como "RECORDATORIO"
  const abrirWhatsApp = async (
    reg: Registro,
    tipo: "CONFIRMACION" | "RECORDATORIO"
  ) => {
    const telefono = formatearTelefonoWhatsApp(reg.contacto);
    const textoLugares =
      reg.cantidad === 1 ? "1 lugar reservado" : `${reg.cantidad} lugares reservados`;

    const texto =
      tipo === "CONFIRMACION"
        ? `✦ *¡Recibimos tu confirmación!* ✦\n\nHola *${reg.identificador}*, nos alegra muchísimo contar contigo para celebrar los *22 Años de Filadelfia Cuerpo de Cristo* 🙌✨\n\n👥 *Asistentes:* ${textoLugares}\n📅 *Fecha:* ${eventoInfo.fecha}\n📍 *Lugar:* ${eventoInfo.direccion}\n\n¡Te estaremos esperando para vivir un hermoso tiempo de Evangelismo, Alabanza y Oración!`
        : `🔔 *¡Falta muy poco para nuestro 22° Aniversario!* 🔔\n\nHola *${reg.identificador}*, te saludamos de *Filadelfia Cuerpo de Cristo* para recordarte con alegría que pronto celebraremos juntos estos 22 años de respaldo de Dios 🙌🔥\n\n📅 *Fecha:* ${eventoInfo.fecha}\n📍 *Lugar:* ${eventoInfo.direccion}\n🎟️ *Tu reserva:* ${textoLugares}\n\n¡Nos vemos muy pronto!`;

    window.open(
      `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer"
    );

    // Solo si es el recordatorio previo al evento, marcamos recordatorioEnviado = true
    if (tipo === "RECORDATORIO") {
      await fetch("/api/admin/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ accion: "MARCAR_ENVIADO", id: reg.id }),
      });

      setRegistros((prev) =>
        prev.map((item) =>
          item.id === reg.id ? { ...item, recordatorioEnviado: true } : item
        )
      );
    }
  };

  // Correo Individual (Confirmación o Recordatorio)
  const enviarCorreoIndividual = async (
    reg: Registro,
    tipoCorreo: "CONFIRMACION" | "RECORDATORIO"
  ) => {
    const key = `${reg.id}-${tipoCorreo}`;
    setProcesandoKey(key);
    setMensajeEstado("");

    try {
      const res = await fetch("/api/admin/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          accion: "CORREO_INDIVIDUAL",
          id: reg.id,
          tipoCorreo,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "No se pudo enviar el correo.");
        return;
      }

      if (tipoCorreo === "RECORDATORIO") {
        setRegistros((prev) =>
          prev.map((item) =>
            item.id === reg.id ? { ...item, recordatorioEnviado: true } : item
          )
        );
      }

      setMensajeEstado(
        `Correo de ${
          tipoCorreo === "CONFIRMACION" ? "confirmación" : "recordatorio"
        } enviado a ${reg.contacto}`
      );
    } finally {
      setProcesandoKey(null);
    }
  };

  const dispararCorreosMasivos = async () => {
    setEnviandoMasivo(true);
    setMensajeEstado("");
    try {
      const res = await fetch("/api/admin/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ accion: "CORREO_MASIVO" }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Revisa tus credenciales SMTP en el archivo .env");
        return;
      }
      await cargarDatos();
      setMensajeEstado(
        `¡Listo! Se enviaron ${data.enviados} correos de recordatorio automáticamente.`
      );
    } finally {
      setEnviandoMasivo(false);
    }
  };

  const eliminarRegistro = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este registro?")) return;
    const res = await fetch(`/api/admin/registros?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setRegistros((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const exportarCSV = () => {
    const encabezados = [
      "ID",
      "Modalidad",
      "Asistente / Familia / Grupo",
      "Cantidad",
      "Contacto",
      "Desea Recordatorio",
      "Recordatorio Enviado",
      "Fecha Registro",
    ];
    const filas = registros.map((r) => [
      r.id,
      r.modalidad,
      `"${r.identificador.replace(/"/g, '""')}"`,
      r.cantidad,
      `"${r.contacto}"`,
      r.notificar ? "SI" : "NO",
      r.recordatorioEnviado ? "SI" : "NO",
      new Date(r.creadoEn).toLocaleString("es-PE"),
    ]);

    const contenido =
      "\uFEFF" +
      [encabezados.join(","), ...filas.map((f) => f.join(","))].join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "asistentes-22-aniversario-filadelfia.csv";
    link.click();
  };

  const filtrados = useMemo(() => {
    return registros.filter((r) => {
      const coincideTexto =
        r.identificador.toLowerCase().includes(busqueda.toLowerCase()) ||
        r.contacto.toLowerCase().includes(busqueda.toLowerCase());

      if (!coincideTexto) return false;
      if (filtro === "RECORDAR") return r.notificar;
      if (filtro === "PENDIENTES") return r.notificar && !r.recordatorioEnviado;
      return true;
    });
  }, [registros, busqueda, filtro]);

  const totalPersonas = registros.reduce((acc, r) => acc + r.cantidad, 0);
  const pendientesCorreo = registros.filter(
    (r) => r.notificar && !r.recordatorioEnviado && esEmail(r.contacto)
  ).length;
  const pendientesWhatsApp = registros.filter(
    (r) => r.notificar && !r.recordatorioEnviado && !esEmail(r.contacto)
  ).length;

  // ================= LOGIN DE ADMINISTRADOR =================
  if (!autenticado) {
    return (
      <div className="flex h-dvh w-screen items-center justify-center bg-gradient-to-br from-[#06192D] via-[#0B2D50] to-[#041222] px-4 text-white">
        <div className="w-full max-w-sm rounded-3xl border border-[#D4AF37]/40 bg-[#071E36]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37] bg-[#D4AF37]/15 text-[#F3D57B]">
              <Lock className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              ✦ Panel de Recepción ✦
            </span>
            <h1 className="mt-1 font-serif text-2xl font-bold text-white">
              Administración 22 Años
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-sky-100">
                Contraseña de líderes / ujieres
              </label>
              <input
                type="password"
                required
                placeholder="Ingresa la clave de acceso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-sky-800 bg-[#041323] px-4 py-3 text-sm text-white placeholder-sky-300/40 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {errorLogin && (
              <p className="rounded-xl bg-rose-500/15 px-3 py-2 text-center text-xs text-rose-300">
                {errorLogin}
              </p>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] py-3.5 text-sm font-extrabold text-[#06192D] shadow-lg transition hover:brightness-105 disabled:opacity-50"
            >
              {cargando ? "Verificando..." : "Ingresar al Panel"}
            </button>

            <Link
              href="/"
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-sky-200/70 hover:text-[#F3D57B]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver a la invitación
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD PRINCIPAL =================
  return (
    <div className="h-dvh w-screen overflow-y-auto bg-gradient-to-br from-[#06192D] via-[#0B2D50] to-[#041222] px-4 py-6 text-white sm:px-8 lg:px-14">
      <div className="mx-auto max-w-6xl space-y-6 pb-12">
        {/* Cabecera */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#D4AF37]/25 pb-5 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F3D57B] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Ir a la web pública
            </Link>
            <h1 className="gold-text-gradient font-serif text-3xl font-extrabold sm:text-4xl">
              Control de Asistentes • 22 Años
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => cargarDatos()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-sky-800 bg-[#071E36] px-3.5 py-2 text-xs font-bold text-sky-100 transition hover:border-[#D4AF37]"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Actualizar
            </button>

            <button
              type="button"
              onClick={exportarCSV}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3.5 py-2 text-xs font-bold text-[#F3D57B] transition hover:bg-[#D4AF37] hover:text-[#06192D]"
            >
              <Download className="h-3.5 w-3.5" /> Exportar Excel (CSV)
            </button>
          </div>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#071E36]/85 p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200/70">
              Total Asistentes
            </span>
            <p className="mt-1 flex items-baseline gap-2 text-3xl font-extrabold text-[#F3D57B]">
              <Users className="h-5 w-5 text-[#D4AF37]" />
              {totalPersonas}
            </p>
            <span className="text-[11px] text-sky-200/60">
              en {registros.length} registros
            </span>
          </div>

          <div className="rounded-2xl border border-sky-800/80 bg-[#071E36]/85 p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200/70">
              Pidieron Aviso
            </span>
            <p className="mt-1 flex items-baseline gap-2 text-3xl font-extrabold text-white">
              <Bell className="h-5 w-5 text-[#D4AF37]" />
              {registros.filter((r) => r.notificar).length}
            </p>
            <span className="text-[11px] text-sky-200/60">casilla activada</span>
          </div>

          <div className="rounded-2xl border border-sky-800/80 bg-[#071E36]/85 p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200/70">
              Emails Pendientes
            </span>
            <p className="mt-1 flex items-baseline gap-2 text-3xl font-extrabold text-sky-300">
              <Mail className="h-5 w-5" />
              {pendientesCorreo}
            </p>
            <span className="text-[11px] text-sky-200/60">recordatorio auto</span>
          </div>

          <div className="rounded-2xl border border-sky-800/80 bg-[#071E36]/85 p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200/70">
              WhatsApp Pendientes
            </span>
            <p className="mt-1 flex items-baseline gap-2 text-3xl font-extrabold text-emerald-300">
              <MessageCircle className="h-5 w-5" />
              {pendientesWhatsApp}
            </p>
            <span className="text-[11px] text-sky-200/60">envío directo wa.me</span>
          </div>
        </div>

        {/* Buscador, Filtros y Disparo Masivo de Emails */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[#D4AF37]/35 bg-[#08223E]/90 p-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300/60" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o contacto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full rounded-xl border border-sky-800 bg-[#041323] py-2.5 pl-10 pr-4 text-xs text-white placeholder-sky-300/40 focus:border-[#D4AF37] focus:outline-none sm:text-sm"
              />
            </div>

            <div className="flex gap-1.5 rounded-xl bg-[#041323] p-1">
              {(
                [
                  { id: "TODOS", label: "Todos" },
                  { id: "RECORDAR", label: "Con aviso" },
                  { id: "PENDIENTES", label: "Pendientes" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFiltro(tab.id)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    filtro === tab.id
                      ? "bg-[#D4AF37] text-[#06192D]"
                      : "text-sky-200/70 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={enviandoMasivo || pendientesCorreo === 0}
            onClick={dispararCorreosMasivos}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] px-5 py-2.5 text-xs font-extrabold text-[#06192D] shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm"
          >
            <Send className="h-4 w-4" />
            <span>
              {enviandoMasivo
                ? "Enviando correos..."
                : `Enviar Emails Pendientes (${pendientesCorreo})`}
            </span>
          </button>
        </div>

        {mensajeEstado && (
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-semibold text-emerald-200">
            {mensajeEstado}
          </div>
        )}

        {/* Tabla de asistentes */}
        <div className="overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#071E36]/85 shadow-2xl">
          {filtrados.length === 0 ? (
            <div className="p-10 text-center text-sm text-sky-200/60">
              No hay registros que coincidan con el filtro actual.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-sky-900/80 bg-[#041323]/90 text-[11px] uppercase tracking-wider text-[#F3D57B]">
                  <tr>
                    <th className="px-4 py-3.5">Asistente / Familia / Grupo</th>
                    <th className="px-4 py-3.5 text-center">Lugares</th>
                    <th className="px-4 py-3.5">Contacto</th>
                    <th className="px-4 py-3.5">Recordatorio</th>
                    <th className="px-4 py-3.5 text-right">Confirmar / Recordar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-900/50">
                  {filtrados.map((reg) => {
                    const tieneCorreo = esEmail(reg.contacto);
                    const enviandoConf =
                      procesandoKey === `${reg.id}-CONFIRMACION`;
                    const enviandoRec =
                      procesandoKey === `${reg.id}-RECORDATORIO`;

                    return (
                      <tr
                        key={reg.id}
                        className="transition hover:bg-[#0B2B4C]/40"
                      >
                        <td className="px-4 py-3.5">
                          <span className="inline-block rounded-md bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#F3D57B]">
                            {reg.modalidad}
                          </span>
                          <p className="mt-1 font-bold text-white">
                            {reg.identificador}
                          </p>
                          <span className="text-[11px] text-sky-200/50">
                            {new Date(reg.creadoEn).toLocaleDateString("es-PE", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 font-extrabold text-[#F3D57B]">
                            {reg.cantidad}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 font-medium text-sky-100">
                          {reg.contacto}
                        </td>

                        <td className="px-4 py-3.5">
                          {!reg.notificar ? (
                            <span className="text-xs text-sky-300/45">
                              No solicitó
                            </span>
                          ) : reg.recordatorioEnviado ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Enviado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 text-[11px] font-bold text-amber-300">
                              <Bell className="h-3.5 w-3.5" /> Pendiente
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap items-center justify-end gap-1.5">
                            {tieneCorreo ? (
                              <>
                                <button
                                  type="button"
                                  disabled={enviandoConf}
                                  onClick={() =>
                                    enviarCorreoIndividual(reg, "CONFIRMACION")
                                  }
                                  title="Reenviar correo: ¡Recibimos tu confirmación!"
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-sky-500/35 bg-sky-500/10 px-2.5 py-1.5 text-[11px] font-bold text-sky-200 transition hover:bg-sky-500 hover:text-slate-950 disabled:opacity-50"
                                >
                                  <CheckCheck className="h-3.5 w-3.5" />
                                  <span>
                                    {enviandoConf ? "..." : "Confirmar"}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  disabled={enviandoRec}
                                  onClick={() =>
                                    enviarCorreoIndividual(reg, "RECORDATORIO")
                                  }
                                  title="Enviar correo de recordatorio previo al evento"
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-2.5 py-1.5 text-[11px] font-bold text-[#F3D57B] transition hover:bg-[#D4AF37] hover:text-[#06192D] disabled:opacity-50"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                  <span>
                                    {enviandoRec ? "..." : "Recordar"}
                                  </span>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    abrirWhatsApp(reg, "CONFIRMACION")
                                  }
                                  title="Abrir WhatsApp con: ¡Recibimos tu confirmación!"
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-bold text-emerald-200 transition hover:bg-emerald-500 hover:text-slate-950"
                                >
                                  <CheckCheck className="h-3.5 w-3.5" />
                                  <span>Confirmar WA</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    abrirWhatsApp(reg, "RECORDATORIO")
                                  }
                                  title="Abrir WhatsApp con recordatorio previo al evento"
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1.5 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                  <span>Recordar WA</span>
                                </button>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => eliminarRegistro(reg.id)}
                              title="Eliminar registro"
                              className="cursor-pointer rounded-xl border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-300 transition hover:bg-rose-500 hover:text-white"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}