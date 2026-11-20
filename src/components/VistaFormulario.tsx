"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  Users,
  Sparkles,
  Plus,
  Minus,
  X,
  Bell,
  Phone,
  CheckCircle2,
  Ticket,
} from "lucide-react";

type Modalidad = "PERSONA" | "FAMILIA" | "GRUPO";

interface VistaFormularioProps {
  onVolver: () => void;
  onExito: (resumen: { titulo: string; cantidad: number }) => void;
}

const FOTOS_REGISTRO = [
  {
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Bienvenida Fraternal",
  },
  {
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Familias en Cristo",
  },
  {
    url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Casa de Oración",
  },
];

export default function VistaFormulario({
  onVolver,
  onExito,
}: VistaFormularioProps) {
  const [modalidad, setModalidad] = useState<Modalidad>("PERSONA");
  const [nombrePersona, setNombrePersona] = useState("");
  const [apellidoFamilia, setApellidoFamilia] = useState("");
  const [cantidadFamilia, setCantidadFamilia] = useState(3);
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [listaGrupo, setListaGrupo] = useState<string[]>([]);
  const [contacto, setContacto] = useState("");
  const [notificar, setNotificar] = useState(true);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [logoError, setLogoError] = useState(false);

  const agregarAlGrupo = () => {
    if (!nuevoIntegrante.trim()) return;
    setListaGrupo((prev) => [...prev, nuevoIntegrante.trim()]);
    setNuevoIntegrante("");
    setError("");
  };

  const eliminarDelGrupo = (index: number) => {
    setListaGrupo((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCalculado =
    modalidad === "PERSONA"
      ? 1
      : modalidad === "FAMILIA"
      ? cantidadFamilia
      : listaGrupo.length;

  const tituloPase =
    modalidad === "PERSONA"
      ? nombrePersona.trim() || "Invitado Especial"
      : modalidad === "FAMILIA"
      ? apellidoFamilia.trim()
        ? `Familia ${apellidoFamilia.trim()}`
        : "Familia Invitada"
      : listaGrupo.length > 0
      ? `Grupo (${listaGrupo[0]}${
          listaGrupo.length > 1 ? ` +${listaGrupo.length - 1}` : ""
        })`
      : "Grupo de Invitados";

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let grupoFinal = [...listaGrupo];
    if (modalidad === "GRUPO" && nuevoIntegrante.trim()) {
      grupoFinal.push(nuevoIntegrante.trim());
      setListaGrupo(grupoFinal);
      setNuevoIntegrante("");
    }

    setEnviando(true);

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modalidad,
          nombrePersona,
          apellidoFamilia,
          cantidadFamilia,
          listaGrupo: grupoFinal,
          contacto,
          notificar,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Revisa los campos e inténtalo de nuevo.");
        setEnviando(false);
        return;
      }

      const cantidadFinal =
        modalidad === "GRUPO" ? grupoFinal.length : totalCalculado;
      onExito({ titulo: tituloPase, cantidad: cantidadFinal });
    } catch {
      setError("Error de conexión. Inténtalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="relative flex h-full w-full items-center overflow-hidden px-4 py-2 sm:px-8 lg:px-14 xl:px-20">
      {/* ======= FOTOS DECORATIVAS FLOTANTES EN ESQUINAS EXTERIORES (XL) ======= */}
      <div className="pointer-events-none absolute -right-10 -top-6 hidden xl:block">
        <div className="animate-float-slow">
          <div className="h-36 w-52 rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src={FOTOS_REGISTRO[2].url}
              alt={FOTOS_REGISTRO[2].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-55 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -left-8 hidden xl:block">
        <div className="animate-float-reverse">
          <div className="h-36 w-52 -rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src={FOTOS_REGISTRO[0].url}
              alt={FOTOS_REGISTRO[0].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-55 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      {/* ======= CONTENEDOR PRINCIPAL DE PANTALLA COMPLETA ======= */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-10">
        
        {/* ======= COLUMNA IZQUIERDA (5 COLS): BIENVENIDA + COLLAGE ESPACIADO + PASE EN VIVO ======= */}
        <div className="flex flex-col justify-center lg:col-span-5">
          {/* Barra superior con botón Volver */}
          <div className="mb-2 flex items-center justify-between lg:mb-3.5">
            <button
              type="button"
              onClick={onVolver}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#08223E]/80 px-4 py-1.5 text-xs font-semibold text-[#F3D57B] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#F3D57B] hover:bg-[#0D3158]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Volver a la invitación</span>
            </button>

            <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-1 text-[11px] font-bold text-[#F3D57B] lg:hidden">
              <Ticket className="h-3 w-3" />
              {totalCalculado} {totalCalculado === 1 ? "lugar" : "lugares"}
            </span>
          </div>

          {/* Título principal */}
          <div className="text-center lg:text-left">
            <span className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] lg:inline-flex">
              ✦ Confirmación de Asistencia ✦
            </span>
            <h1 className="gold-text-gradient mt-0.5 font-serif text-2xl font-extrabold leading-tight sm:text-4xl xl:text-[44px]">
              Nos alegramos de contar contigo
            </h1>
            <p className="mt-1.5 hidden max-w-md text-sm leading-relaxed text-sky-100/80 lg:block">
              Preparamos cada detalle con amor para recibirte a ti, a tu familia
              o a tus amigos en esta celebración de gratitud.
            </p>
          </div>

          {/* Mini Collage Interactivo + Pase de Invitado con separación limpia (Desktop) */}
          <div className="mt-5 hidden flex-col gap-6 lg:flex">
            {/* Dúo de fotos contenido en su propia caja sin invadir abajo */}
            <div className="relative flex items-center justify-start py-2">
              <div className="animate-float-slow z-10 w-[53%] hover:z-30">
                <div className="collage-card group -rotate-2 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/50 bg-[#0B2B4C]/85 p-1.5 shadow-xl hover:rotate-0 hover:scale-[1.03] hover:border-[#F3D57B]">
                  <div className="relative h-28 overflow-hidden rounded-xl xl:h-32">
                    <img
                      src={FOTOS_REGISTRO[0].url}
                      alt={FOTOS_REGISTRO[0].etiqueta}
                      className="collage-img h-full w-full object-cover group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-[#F3D57B]">
                      ✦ {FOTOS_REGISTRO[0].etiqueta}
                    </span>
                  </div>
                </div>
              </div>

              <div className="animate-float-reverse -ml-5 translate-y-2 z-20 w-[52%] hover:z-30">
                <div className="collage-card group rotate-2 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/60 bg-[#08223E]/90 p-1.5 shadow-2xl hover:rotate-0 hover:scale-[1.03] hover:border-[#FFF2BE]">
                  <div className="relative h-28 overflow-hidden rounded-xl xl:h-32">
                    <img
                      src={FOTOS_REGISTRO[1].url}
                      alt={FOTOS_REGISTRO[1].etiqueta}
                      className="collage-img h-full w-full object-cover group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-[#F3D57B]">
                      ✦ {FOTOS_REGISTRO[1].etiqueta}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta "Pase de Recepción" libre de colisiones */}
            <div className="relative z-30 overflow-hidden rounded-2xl border border-[#D4AF37]/45 bg-gradient-to-r from-[#08223E]/95 via-[#0B2D50]/90 to-[#08223E]/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#D4AF37]/15 blur-xl" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37] bg-[#06192D] p-0.5">
                    {!logoError ? (
                      <img
                        src="/favicon.svg"
                        alt="CAM"
                        onError={() => setLogoError(true)}
                        className="h-full w-full scale-[1.04] rounded-full object-cover"
                      />
                    ) : (
                      <span className="font-serif text-xs font-bold text-[#F3D57B]">
                        CAM
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                      Pase de Recepción • 22 Años
                    </span>
                    <p className="truncate font-serif text-lg font-bold text-white">
                      {tituloPase}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3.5 py-1.5 text-center">
                  <span className="block text-lg font-extrabold leading-none text-[#F3D57B]">
                    {totalCalculado}
                  </span>
                  <span className="text-[10px] font-medium text-sky-100/80">
                    {totalCalculado === 1 ? "Asistente" : "Asistentes"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======= COLUMNA DERECHA (7 COLS): FORMULARIO INTERACTIVO DE CRISTAL ======= */}
        <div className="flex w-full justify-center lg:col-span-7 lg:justify-end">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-[#071E36]/85 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-6 xl:p-7">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F3D57B] to-transparent" />

            <form onSubmit={enviarFormulario} className="space-y-3.5 sm:space-y-4">
              {/* 1. SELECTOR DE MODALIDAD */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-200/80">
                  ¿Cómo nos acompañarás?
                </label>
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-sky-900/80 bg-[#041323]/90 p-1.5">
                  {(
                    [
                      {
                        id: "PERSONA",
                        label: "Persona",
                        sub: "Individual",
                        icon: User,
                      },
                      {
                        id: "FAMILIA",
                        label: "Familia",
                        sub: "Por apellido",
                        icon: Users,
                      },
                      {
                        id: "GRUPO",
                        label: "Grupo",
                        sub: "Varios nombres",
                        icon: Sparkles,
                      },
                    ] as const
                  ).map((item) => {
                    const Icon = item.icon;
                    const activo = modalidad === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setModalidad(item.id);
                          setError("");
                        }}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl px-2 py-2 transition-all duration-300 sm:flex-row sm:gap-2 sm:py-2.5 ${
                          activo
                            ? "bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] text-[#06192D] shadow-[0_6px_20px_rgba(212,175,55,0.35)]"
                            : "text-sky-200/70 hover:bg-sky-950/60 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <div className="text-center sm:text-left">
                          <span className="block text-xs font-extrabold leading-tight sm:text-sm">
                            {item.label}
                          </span>
                          <span
                            className={`hidden text-[10px] xl:block ${
                              activo
                                ? "font-medium text-[#06192D]/80"
                                : "text-sky-300/50"
                            }`}
                          >
                            {item.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CAMPOS DINÁMICOS SEGÚN SELECCIÓN */}
              {modalidad === "PERSONA" && (
                <div className="animate-in fade-in duration-300">
                  <label className="mb-1.5 block text-xs font-semibold text-sky-100">
                    Tu nombre y apellido
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/80" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={nombrePersona}
                      onChange={(e) => setNombrePersona(e.target.value)}
                      className="w-full rounded-xl border border-sky-800/90 bg-[#041323]/90 py-3 pl-10 pr-4 text-sm text-white placeholder-sky-300/35 transition focus:border-[#D4AF37] focus:bg-[#05182C] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {modalidad === "FAMILIA" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 animate-in fade-in duration-300">
                  <div className="sm:col-span-7">
                    <label className="mb-1.5 block text-xs font-semibold text-sky-100">
                      Apellido de la familia
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/80" />
                      <input
                        type="text"
                        required
                        placeholder="Ej. Gómez Rojas"
                        value={apellidoFamilia}
                        onChange={(e) => setApellidoFamilia(e.target.value)}
                        className="w-full rounded-xl border border-sky-800/90 bg-[#041323]/90 py-3 pl-10 pr-3.5 text-sm text-white placeholder-sky-300/35 transition focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <label className="mb-1.5 block text-xs font-semibold text-sky-100">
                      ¿Cuántos asistirán?
                    </label>
                    <div className="flex h-[46px] items-center justify-between rounded-xl border border-sky-800/90 bg-[#041323]/90 px-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCantidadFamilia((prev) => Math.max(2, prev - 1))
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#092542] text-[#F3D57B] transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06192D]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="text-center">
                        <span className="text-base font-extrabold text-[#F3D57B]">
                          {cantidadFamilia}
                        </span>
                        <span className="ml-1 text-[11px] text-sky-200/70">
                          personas
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCantidadFamilia((prev) => Math.min(30, prev + 1))
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#092542] text-[#F3D57B] transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06192D]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalidad === "GRUPO" && (
                <div className="animate-in fade-in duration-300">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-sky-100">
                      Añade la lista de asistentes (mín. 2)
                    </span>
                    <span className="rounded-full bg-[#D4AF37]/15 px-2.5 py-0.5 font-bold text-[#F3D57B]">
                      {listaGrupo.length} en lista
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Escribe un nombre y pulsa Añadir"
                      value={nuevoIntegrante}
                      onChange={(e) => setNuevoIntegrante(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          agregarAlGrupo();
                        }
                      }}
                      className="flex-1 rounded-xl border border-sky-800/90 bg-[#041323]/90 px-3.5 py-2.5 text-sm text-white placeholder-sky-300/35 transition focus:border-[#D4AF37] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={agregarAlGrupo}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 text-xs font-bold text-[#F3D57B] transition hover:bg-[#D4AF37] hover:text-[#06192D]"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Añadir</span>
                    </button>
                  </div>

                  <div className="mt-2 min-h-[40px] max-h-20 overflow-y-auto rounded-xl border border-sky-900/60 bg-[#041323]/60 p-2">
                    {listaGrupo.length === 0 ? (
                      <p className="py-1 text-center text-xs text-sky-300/45">
                        Aún no has agregado integrantes a la lista
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {listaGrupo.map((persona, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#0B2B4C] px-3 py-1 text-xs font-medium text-[#F3D57B]"
                          >
                            <span>{persona}</span>
                            <button
                              type="button"
                              onClick={() => eliminarDelGrupo(idx)}
                              className="cursor-pointer rounded-full text-[#F3D57B]/80 transition hover:text-white"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. CONTACTO */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-sky-100">
                  Teléfono o correo de contacto
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/80" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. 999 888 777 o correo@ejemplo.com"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    className="w-full rounded-xl border border-sky-800/90 bg-[#041323]/90 py-3 pl-10 pr-4 text-sm text-white placeholder-sky-300/35 transition focus:border-[#D4AF37] focus:bg-[#05182C] focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. SWITCH DE RECORDATORIO */}
              <button
                type="button"
                onClick={() => setNotificar((prev) => !prev)}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                  notificar
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
                    : "border-sky-900/80 bg-[#041323]/70 hover:border-sky-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      notificar
                        ? "bg-[#D4AF37] text-[#06192D]"
                        : "bg-sky-950 text-sky-300/60"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white sm:text-sm">
                      Recordatorio previo al aniversario
                    </span>
                    <span className="block text-[11px] text-sky-200/65">
                      Te enviaremos un aviso días antes de la fecha especial
                    </span>
                  </div>
                </div>

                <div
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                    notificar ? "bg-[#D4AF37]" : "bg-sky-950"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                      notificar ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>

              {error && (
                <p className="rounded-xl border border-rose-400/30 bg-rose-500/15 px-3 py-2 text-center text-xs font-medium text-rose-200">
                  {error}
                </p>
              )}

              {/* 5. BOTÓN GRANDE "APUNTARME" CON ESPACIADO CORREGIDO */}
              <button
                type="submit"
                disabled={enviando}
                className="btn-shimmer group relative flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-[#FFF2BE]/60 bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] py-3.5 text-base font-extrabold tracking-wide text-[#06192D] shadow-[0_10px_35px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_14px_45px_rgba(212,175,55,0.5)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-lg"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>
                  {enviando
                    ? "Confirmando tu lugar..."
                    : totalCalculado > 0
                    ? `Apuntarme • ${totalCalculado} ${
                        totalCalculado === 1 ? "asistente" : "asistentes"
                      }`
                    : "Apuntarme"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}