"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface VistaInvitacionProps {
  onContinuar: () => void;
}

const FOTOS_COLLAGE = [
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Alabanza y Adoración",
  },
  {
    url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Un Solo Cuerpo",
  },
  {
    url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Palabra Viva",
  },
  {
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Fraternidad",
  },
  {
    url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
    etiqueta: "Gratitud",
  },
  {
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    etiqueta: "22 Años de Gloria",
  },
];

export default function VistaInvitacion({ onContinuar }: VistaInvitacionProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <section className="relative flex h-full w-full items-center overflow-hidden px-4 py-2 sm:px-10 lg:px-14 xl:px-20">
      {/* ======= FOTOS DECORATIVAS EN ESQUINAS IZQUIERDAS (SOLO ESCRITORIO GRANDE) ======= */}
      <div className="pointer-events-none absolute -left-8 -top-6 hidden xl:block">
        <div className="animate-float-slow">
          <div className="h-36 w-52 -rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0A2744]/60 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src={FOTOS_COLLAGE[2].url}
              alt={FOTOS_COLLAGE[2].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-65 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 left-6 hidden xl:block">
        <div className="animate-float-reverse">
          <div className="h-32 w-48 rotate-6 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1.5 shadow-2xl backdrop-blur-sm">
            <img
              src={FOTOS_COLLAGE[4].url}
              alt={FOTOS_COLLAGE[4].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-60 mix-blend-luminosity"
            />
          </div>
        </div>
      </div>

      {/* ======= GRID PRINCIPAL (PANTALLA COMPLETA EN PC / ADAPTADO EN MOBILE) ======= */}
      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center lg:grid-cols-12 lg:gap-8">
        
        {/* COLUMNA PRINCIPAL (CENTRADA EN MOBILE Y ALINEADA EN SU PROPIO EJE EN PC) */}
        <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-evenly text-center sm:justify-center sm:gap-5 lg:col-span-7">
          
          {/* ENCABEZADO CENTRADO: LOGO + INSIGNIA + SUBTÍTULO */}
          <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-4">
            {/* Contenedor circular del Logo con respaldo SVG centrado */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#092644] p-0.5 shadow-[0_0_30px_rgba(212,175,55,0.35)] sm:h-20 sm:w-20">
              <div className="pointer-events-none absolute -inset-1.5 rounded-full border border-[#D4AF37]/35" />
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#08223E]">
                {!logoError ? (
                  <img
                    src="/logo.svg"
                    alt="Logo FCC"
                    onError={() => setLogoError(true)}
                    className="h-full w-full scale-[1.04] object-cover"
                  />
                ) : (
                  /* Emblema vectorial centrado de respaldo si public/logo.jpg aún no existe */
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="#08223E"
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                    />
                    <text
                      x="50"
                      y="24"
                      textAnchor="middle"
                      fill="#F3D57B"
                      className="font-serif text-[14px] font-bold tracking-[0.18em]"
                    >
                      CAM
                    </text>
                    <path
                      d="M50 30 C58 44, 66 50, 62 66 C59 75, 53 79, 50 82 C47 79, 41 75, 38 66 C34 50, 44 44, 50 30 Z"
                      fill="#D4AF37"
                    />
                    <path
                      d="M50 46 L50 78 M41 59 L59 59"
                      stroke="#08223E"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Textos centrados entre sí */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F3D57B] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                <Sparkles className="h-3 w-3 shrink-0 text-[#D4AF37] sm:h-3.5 sm:w-3.5" />
                <span>Celebramos nuestro aniversario</span>
              </span>
              <span className="mt-1.5 text-[10px] font-medium tracking-[0.2em] text-sky-200/75 sm:text-xs">
                ✦ RESPALDO Y FIDELIDAD DE DIOS ✦
              </span>
            </div>
          </div>

          {/* TÍTULO EN ARCO CENTRADO JUSTO ARRIBA DE "22 AÑOS" */}
          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 520 122"
              className="w-[285px] overflow-visible min-[390px]:w-[320px] sm:w-[420px] xl:w-[470px]"
            >
              <defs>
                <path
                  id="arcoFiladelfia"
                  d="M 20,112 Q 260,10 500,112"
                  fill="transparent"
                />
                <linearGradient id="doradoArco" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E4BE57" />
                  <stop offset="50%" stopColor="#FFF2BE" />
                  <stop offset="100%" stopColor="#C99A2E" />
                </linearGradient>
              </defs>
              <text
                fill="url(#doradoArco)"
                className="text-[19.5px] font-bold uppercase tracking-[0.22em] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              >
                <textPath
                  href="#arcoFiladelfia"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  ✦ Filadelfia Cuerpo de Cristo ✦
                </textPath>
              </text>
            </svg>

            <h1 className="gold-text-gradient -mt-7 text-center font-serif text-5xl font-extrabold leading-none tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] min-[390px]:text-6xl sm:-mt-10 sm:text-7xl xl:text-8xl">
              22 Años
            </h1>

            {/* Divisor dorado sutil centrado */}
            <div className="mt-2.5 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent sm:mt-3 sm:w-40" />
          </div>

          {/* TEXTO DE INVITACIÓN CENTRADO */}
          <p className="max-w-xs text-balance text-sm leading-relaxed text-sky-50/90 min-[390px]:max-w-sm sm:max-w-md sm:text-lg">
            Te invitamos a conmemorar con nosotros esta fecha y agradecer a
            Dios los años de respaldo.
          </p>

          {/* BOTÓN GRANDE "ESTARÉ AHÍ" */}
          <div className="flex w-full justify-center">
            <button
              type="button"
              onClick={onContinuar}
              className="btn-shimmer group relative inline-flex w-full max-w-[260px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#FFF2BE]/60 bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] px-8 py-3.5 text-base font-extrabold tracking-wide text-[#061A2E] shadow-[0_10px_35px_rgba(212,175,55,0.38)] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_50px_rgba(212,175,55,0.55)] active:scale-[0.98] sm:max-w-[290px] sm:px-10 sm:py-4 sm:text-xl"
            >
              <span>Estaré Ahí</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </button>
          </div>

          {/* ABANICO DE COLLAGE ADAPTADO A MOBILE / TABLET (< lg) */}
          <div className="relative flex w-full max-w-sm items-center justify-center pt-1 lg:hidden">
            {/* Foto Izquierda */}
            <div className="collage-card relative -mr-3 h-20 w-28 -rotate-6 overflow-hidden rounded-xl border border-[#D4AF37]/45 bg-[#0A2744] p-1 shadow-xl min-[390px]:h-24 min-[390px]:w-32">
              <img
                src={FOTOS_COLLAGE[0].url}
                alt={FOTOS_COLLAGE[0].etiqueta}
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/75 via-transparent to-transparent" />
            </div>

            {/* Foto Central Destacada */}
            <div className="collage-card relative z-20 -translate-y-1.5 h-24 w-32 overflow-hidden rounded-xl border-2 border-[#D4AF37]/75 bg-[#08223E] p-1 shadow-[0_12px_30px_rgba(0,0,0,0.65)] min-[390px]:h-28 min-[390px]:w-36">
              <img
                src={FOTOS_COLLAGE[5].url}
                alt={FOTOS_COLLAGE[5].etiqueta}
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
              <span className="absolute bottom-1.5 inset-x-1 text-center text-[9px] font-bold text-[#F3D57B]">
                ✦ 22 Años de Gloria
              </span>
            </div>

            {/* Foto Derecha */}
            <div className="collage-card relative -ml-3 h-20 w-28 rotate-6 overflow-hidden rounded-xl border border-[#D4AF37]/45 bg-[#0A2744] p-1 shadow-xl min-[390px]:h-24 min-[390px]:w-32">
              <img
                src={FOTOS_COLLAGE[1].url}
                alt={FOTOS_COLLAGE[1].etiqueta}
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/75 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (5 COLUMNAS): COLLAGE INTERACTIVO EN ESCRITORIO */}
        <div className="relative hidden h-[82%] w-full lg:col-span-5 lg:block">
          <div className="pointer-events-none absolute inset-10 rounded-full bg-[#D4AF37]/15 blur-3xl" />

          {/* Tarjeta 1: Arriba Izquierda */}
          <div className="animate-float-slow absolute left-0 top-2 z-20 w-[54%] hover:z-40">
            <div className="collage-card group -rotate-3 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/45 bg-[#0B2B4C]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#F3D57B] hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
              <div className="relative h-40 overflow-hidden rounded-xl xl:h-48">
                <img
                  src={FOTOS_COLLAGE[0].url}
                  alt={FOTOS_COLLAGE[0].etiqueta}
                  className="collage-img h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-[#061A2E]/15 to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-xs font-semibold tracking-wide text-[#F3D57B]">
                  ✦ {FOTOS_COLLAGE[0].etiqueta}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Arriba Derecha */}
          <div className="animate-float-reverse absolute right-0 top-8 z-10 w-[50%] hover:z-40">
            <div className="collage-card group rotate-3 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0B2B4C]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#F3D57B] hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
              <div className="relative h-36 overflow-hidden rounded-xl xl:h-44">
                <img
                  src={FOTOS_COLLAGE[1].url}
                  alt={FOTOS_COLLAGE[1].etiqueta}
                  className="collage-img h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-xs font-semibold tracking-wide text-[#F3D57B]">
                  ✦ {FOTOS_COLLAGE[1].etiqueta}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Centro Protagonista */}
          <div className="animate-float-slow absolute left-[16%] top-[34%] z-30 w-[66%] hover:z-40">
            <div className="collage-card group rotate-1 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#D4AF37]/70 bg-[#08223E]/90 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#FFF2BE] hover:shadow-[0_28px_65px_rgba(212,175,55,0.35)]">
              <div className="relative h-44 overflow-hidden rounded-xl xl:h-52">
                <img
                  src={FOTOS_COLLAGE[5].url}
                  alt={FOTOS_COLLAGE[5].etiqueta}
                  className="collage-img h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/90 via-[#061A2E]/20 to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {FOTOS_COLLAGE[5].etiqueta}
                  </span>
                  <span className="rounded-full bg-[#D4AF37] px-2.5 py-0.5 text-[10px] font-extrabold text-[#061A2E]">
                    CAM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Abajo Izquierda */}
          <div className="animate-float-reverse absolute bottom-2 left-2 z-20 w-[48%] hover:z-40">
            <div className="collage-card group rotate-2 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0B2B4C]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#F3D57B] hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
              <div className="relative h-32 overflow-hidden rounded-xl xl:h-40">
                <img
                  src={FOTOS_COLLAGE[3].url}
                  alt={FOTOS_COLLAGE[3].etiqueta}
                  className="collage-img h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-semibold text-[#F3D57B]">
                  ✦ {FOTOS_COLLAGE[3].etiqueta}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 5: Abajo Derecha */}
          <div className="animate-float-slow absolute bottom-4 right-1 z-20 w-[46%] hover:z-40">
            <div className="collage-card group -rotate-3 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/45 bg-[#0B2B4C]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#F3D57B] hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
              <div className="relative h-32 overflow-hidden rounded-xl xl:h-36">
                <img
                  src={FOTOS_COLLAGE[2].url}
                  alt={FOTOS_COLLAGE[2].etiqueta}
                  className="collage-img h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-semibold text-[#F3D57B]">
                  ✦ {FOTOS_COLLAGE[2].etiqueta}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}