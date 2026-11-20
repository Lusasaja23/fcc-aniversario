"use client";

import { useState, useEffect } from "react";
import {
  HeartHandshake,
  Music,
  Flame,
  Share2,
  Check,
  MapPin,
  ExternalLink,
  Sparkles,
  UserPlus,
  Compass,
} from "lucide-react";

export interface ResumenRegistro {
  titulo: string;
  cantidad: number;
}

interface VistaEsperandoProps {
  resumen: ResumenRegistro | null;
  onNuevoRegistro: () => void;
}

const PILARES = [
  {
    id: "evangelismo",
    numero: "01",
    titulo: "Evangelismo",
    subtitulo: "Buenas Nuevas de Salvación",
    icono: HeartHandshake,
    imagen:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80",
    descripcion:
      "Un mensaje vivo de esperanza y redención para tocar corazones, compartir la luz de Jesús y recordar Su propósito eterno en nosotros.",
    cita: "«Porque no me avergüenzo del evangelio, pues es poder de Dios...» — Romanos 1:16",
  },
  {
    id: "alabanza",
    numero: "02",
    titulo: "Alabanza",
    subtitulo: "Adoración y Gratitud Viva",
    icono: Music,
    imagen:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
    descripcion:
      "Unidos a una sola voz exaltando el nombre de Cristo con cánticos de júbilo por estos 22 años de fidelidad, milagros y respaldo incondicional.",
    cita: "«Todo lo que respira alabe a Jehová. ¡Aleluya!» — Salmos 150:6",
  },
  {
    id: "oracion",
    numero: "03",
    titulo: "Oración",
    subtitulo: "Comunión y Clamor",
    icono: Flame,
    imagen:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1000&q=80",
    descripcion:
      "Un altar de intercesión por cada hogar asistente, agradeciendo el camino recorrido y consagrando a Dios las nuevas generaciones de la iglesia.",
    cita: "«Clama a mí, y yo te responderé...» — Jeremías 33:3",
  },
];

// Reemplaza ambas constantes con los enlaces reales de tu iglesia en Google Maps
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.0037193051003!2d-77.0197536570768!3d-12.071518134264938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c89b0e4350cf%3A0xd3151ceb7826b438!2sAtusparia%20133%2C%20Lima%2015033!5e0!3m2!1ses-419!2spe!4v1795152480103!5m2!1ses-419!2spe";
const GOOGLE_MAPS_DIRECTIONS = "https://maps.google.com";

export default function VistaEsperando({
  resumen,
  onNuevoRegistro,
}: VistaEsperandoProps) {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [tabMobile, setTabMobile] = useState<"viviremos" | "mapa">("viviremos");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (pausado) return;
    const timer = setInterval(() => {
      setActivo((prev) => (prev + 1) % PILARES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [pausado]);

  const compartirInvitacion = async () => {
    const shareData = {
      title: "22 Años • Filadelfia Cuerpo de Cristo",
      text: "¡Ya confirmé mi asistencia al 22° Aniversario de Filadelfia Cuerpo de Cristo! Te invito a celebrarlo juntos:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Cancelado por el usuario
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2600);
    }
  };

  const pilarActual = PILARES[activo];
  const IconoActual = pilarActual.icono;

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-3.5 py-2.5 sm:px-12 sm:py-6 lg:px-20 xl:px-28">
      {/* ======= COLLAGES DECORATIVOS EN BORDES EXTERIORES (2XL) ======= */}
      <div className="pointer-events-none absolute -left-16 top-10 hidden 2xl:block">
        <div className="animate-float-slow">
          <div className="h-32 w-44 -rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0A2744]/45 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80"
              alt="Fraternidad"
              className="h-full w-full rounded-xl object-cover opacity-40 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-14 hidden 2xl:block">
        <div className="animate-float-reverse">
          <div className="h-32 w-48 rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0A2744]/45 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=700&q=80"
              alt="Celebración"
              className="h-full w-full rounded-xl object-cover opacity-40 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      {/* ======= CONTENEDOR CENTRAL ======= */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-between gap-2 sm:justify-center sm:gap-4 lg:gap-5">
        
        {/* ======= CABECERA COMPACTA EN MOBILE / AMPLIA EN DESKTOP ======= */}
        <div className="flex shrink-0 flex-col items-center justify-between gap-2 lg:flex-row lg:items-end">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] sm:px-3 sm:py-1 sm:text-[11px]">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[#06192D]">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>¡Registro confirmado con éxito!</span>
            </div>

            <h1 className="gold-text-gradient mt-1 font-serif text-[22px] font-extrabold leading-tight tracking-tight min-[375px]:text-2xl sm:mt-1.5 sm:text-4xl xl:text-[44px]">
              Te estaremos esperando
            </h1>
          </div>

          {/* Sello de reserva optimizado a ancho completo en mobile */}
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-[#D4AF37]/40 bg-[#08223E]/85 px-3 py-1.5 shadow-xl backdrop-blur-md sm:w-auto sm:justify-start sm:gap-3 sm:px-3.5 sm:py-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="hidden h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37] bg-[#06192D] p-0.5 sm:flex">
                {!logoError ? (
                  <img
                    src="/favicon.svg"
                    alt="CAM"
                    onError={() => setLogoError(true)}
                    className="h-full w-full scale-[1.04] rounded-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-[10px] font-bold text-[#F3D57B]">
                    CAM
                  </span>
                )}
              </div>

              <div className="min-w-0 text-left">
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#D4AF37] sm:text-[10px] sm:tracking-[0.16em]">
                  ✦ Reserva 22° Aniversario
                </span>
                <p className="truncate text-[11px] font-bold text-white min-[375px]:text-xs sm:text-sm">
                  {resumen?.titulo || "Invitado Especial"}{" "}
                  <span className="text-[#F3D57B]">
                    • {resumen?.cantidad || 1}{" "}
                    {(resumen?.cantidad || 1) === 1 ? "lugar" : "lugares"}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onNuevoRegistro}
              title="Registrar a otra persona o familia"
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-sky-800 bg-[#051629] px-2 py-1.5 text-[11px] font-semibold text-sky-200/85 transition hover:border-[#D4AF37] hover:text-[#F3D57B] sm:px-2.5"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Otro registro</span>
            </button>
          </div>
        </div>

        {/* ======= CONMUTADOR SIMÉTRICO DE UNA SOLA LÍNEA EN MOBILE ======= */}
        <div className="grid shrink-0 grid-cols-2 gap-1.5 rounded-xl border border-sky-900/80 bg-[#041323]/90 p-1 lg:hidden">
          <button
            type="button"
            onClick={() => setTabMobile("viviremos")}
            className={`flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-extrabold transition min-[375px]:text-xs ${
              tabMobile === "viviremos"
                ? "bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] text-[#06192D]"
                : "text-sky-200/75"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Lo que viviremos</span>
          </button>
          <button
            type="button"
            onClick={() => setTabMobile("mapa")}
            className={`flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-extrabold transition min-[375px]:text-xs ${
              tabMobile === "mapa"
                ? "bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] text-[#06192D]"
                : "text-sky-200/75"
            }`}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>Ubicación</span>
          </button>
        </div>

        {/* ======= CUERPO CENTRAL FLEXIBLE (SIN DESBORDES EN 320px NI EN PC) ======= */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:max-h-[395px] lg:grid-cols-12 lg:gap-6">
          
          {/* COLUMNA IZQUIERDA (7 COLS): VITRINA DINÁMICA */}
          <div
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            className={`min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#071E36]/85 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:rounded-3xl sm:p-4 lg:col-span-7 ${
              tabMobile === "viviremos" ? "flex" : "hidden lg:flex"
            }`}
          >
            <div className="shrink-0">
              <div className="mb-1.5 flex items-center justify-between px-0.5 sm:mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F3D57B] sm:text-[11px] sm:tracking-[0.2em]">
                  ✦ Lo que viviremos juntos
                </span>
                <span className="text-[10px] text-sky-200/60 sm:text-[11px]">
                  {activo + 1} / {PILARES.length}
                </span>
              </div>

              {/* Botones apilados en mobile para mostrar la palabra completa incluso en 320px */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {PILARES.map((item, idx) => {
                  const Icon = item.icono;
                  const esActivo = activo === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivo(idx)}
                      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border px-1.5 py-1.5 text-center transition-all duration-300 sm:flex-row sm:justify-start sm:gap-2 sm:rounded-2xl sm:px-3.5 sm:py-2 sm:text-left ${
                        esActivo
                          ? "border-[#F3D57B] bg-gradient-to-b from-[#D4AF37]/25 to-[#0B2D50]/90 text-white shadow-[0_6px_20px_rgba(212,175,55,0.22)] sm:bg-gradient-to-r"
                          : "border-sky-900/70 bg-[#041323]/75 text-sky-200/70 hover:border-[#D4AF37]/40 hover:text-white"
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition sm:h-7 sm:w-7 sm:rounded-xl ${
                          esActivo
                            ? "bg-[#D4AF37] text-[#06192D]"
                            : "bg-sky-950/90 text-[#F3D57B]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="hidden text-[10px] font-bold tracking-widest text-[#D4AF37] sm:block">
                          {item.numero}
                        </span>
                        <span className="block text-[10px] font-extrabold leading-tight min-[375px]:text-[11px] sm:truncate sm:text-sm">
                          {item.titulo}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta Escénica con insignia arriba y descripción abajo (nunca se corta) */}
            <div className="relative mt-2 flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-xl border border-[#D4AF37]/35 p-3 sm:mt-3 sm:rounded-2xl sm:p-5">
              {PILARES.map((pilar, idx) => (
                <img
                  key={pilar.id}
                  src={pilar.imagen}
                  alt={pilar.titulo}
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                    activo === idx
                      ? "scale-105 opacity-60"
                      : "scale-100 opacity-0"
                  }`}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041222] via-[#061B33]/80 to-[#041222]/40" />

              {/* Parte superior de la foto: Subtítulo */}
              <div className="relative z-10 flex items-start">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#06192D]/85 px-2.5 py-0.5 text-[10px] font-bold text-[#F3D57B] backdrop-blur-sm sm:text-[11px]">
                  <IconoActual className="h-3 w-3 shrink-0 text-[#D4AF37]" />
                  <span className="truncate">{pilarActual.subtitulo}</span>
                </div>
              </div>

              {/* Parte inferior de la foto: Título + Descripción + Cita */}
              <div className="relative z-10 mt-2">
                <h3 className="font-serif text-lg font-extrabold leading-tight text-white min-[375px]:text-xl sm:text-2xl">
                  {pilarActual.titulo}
                </h3>

                <p className="mt-1 max-w-xl text-[11px] leading-snug text-sky-50/95 min-[375px]:text-xs sm:leading-relaxed sm:text-[13px]">
                  {pilarActual.descripcion}
                </p>

                <p className="mt-1.5 border-l-2 border-[#D4AF37] pl-2 text-[10px] italic leading-tight text-[#F3D57B]/95 sm:mt-2 sm:pl-2.5 sm:text-[11px]">
                  {pilarActual.cita}
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (5 COLS): GOOGLE MAPS + INVITAR A UN AMIGO */}
          <div
            className={`min-h-0 flex-col justify-between gap-3.5 lg:col-span-5 ${
              tabMobile === "mapa" ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Mapa con Marco Dorado */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#071E36]/85 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:rounded-3xl sm:p-3.5">
              <div className="mb-2 flex shrink-0 items-center justify-between gap-2 px-1">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F3D57B]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-xs font-extrabold text-white sm:text-[13px]">
                      Ubicación del Aniversario
                    </span>
                    <span className="block truncate text-[10px] text-sky-200/65">
                      Filadelfia Cuerpo de Cristo
                    </span>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-2.5 py-1.5 text-[11px] font-bold text-[#F3D57B] transition hover:bg-[#D4AF37] hover:text-[#06192D]"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Cómo llegar</span>
                  <ExternalLink className="hidden h-3 w-3 opacity-80 min-[375px]:inline" />
                </a>
              </div>

              <div className="group relative min-h-0 flex-1 overflow-hidden rounded-xl border border-sky-900/80 bg-[#041323] sm:rounded-2xl">
                <iframe
                  title="Ubicación Filadelfia Cuerpo de Cristo"
                  src={GOOGLE_MAPS_EMBED}
                  className="h-full w-full border-0 opacity-90 contrast-[1.04] saturate-[0.85] transition duration-500 group-hover:opacity-100 group-hover:saturate-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Bloque Desktop: Invitar a un Amigo */}
            <div className="hidden rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-r from-[#092543]/95 via-[#0C3158]/95 to-[#08223E]/95 p-3.5 shadow-xl backdrop-blur-md lg:block">
              <div className="mb-2 flex items-center justify-between px-0.5">
                <span className="text-[11px] font-semibold text-sky-100/90">
                  ¿Alguien más debería vivir esta noche?
                </span>
                <span className="text-[11px] font-bold text-[#F3D57B]">
                  ✦ Comparte la bendición
                </span>
              </div>

              <button
                type="button"
                onClick={compartirInvitacion}
                className="btn-shimmer group relative flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-[#FFF2BE]/60 bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] py-3 text-sm font-extrabold tracking-wide text-[#06192D] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_45px_rgba(212,175,55,0.5)] active:scale-[0.99] sm:text-base"
              >
                {copiado ? (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>¡Enlace copiado para compartir!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    <span>Invitar a un amigo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======= BOTÓN "INVITAR A UN AMIGO" PROPORCIONADO EN MOBILE ======= */}
        <div className="shrink-0 lg:hidden">
          <button
            type="button"
            onClick={compartirInvitacion}
            className="btn-shimmer relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#FFF2BE]/60 bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] py-2.5 text-sm font-extrabold text-[#06192D] shadow-[0_8px_25px_rgba(212,175,55,0.35)] active:scale-[0.99] min-[390px]:rounded-2xl min-[390px]:py-3.5 min-[390px]:text-base"
          >
            {copiado ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span>¡Enlace copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 shrink-0" />
                <span>Invitar a un amigo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}