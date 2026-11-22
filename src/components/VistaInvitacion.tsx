"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Calendar, Clock, MapPin } from "lucide-react";

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

const RUTAS_LOGO = ["/favicon.svg", "/logo.svg", "/logo.jpg"];

export default function VistaInvitacion({ onContinuar }: VistaInvitacionProps) {
  const [indiceLogo, setIndiceLogo] = useState(0);
  const usarSvgFallback = indiceLogo >= RUTAS_LOGO.length;

  return (
    <section className="relative flex h-full w-full items-center overflow-hidden px-5 py-3 sm:px-10 lg:px-14 xl:px-20">
      {/* ======= MARCO AMBIENTAL DE FOTOS ALREDEDOR (MÓVIL Y TABLET) ======= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
        {/* Esquina Superior Izquierda */}
        <div className="animate-float-slow absolute -left-8 top-3 sm:-left-5 sm:top-6">
          <div className="h-24 w-32 -rotate-12 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1 shadow-2xl backdrop-blur-xs sm:h-32 sm:w-44">
            <img
              src={FOTOS_COLLAGE[0].url}
              alt={FOTOS_COLLAGE[0].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-45 sm:opacity-60"
            />
          </div>
        </div>

        {/* Esquina Superior Derecha */}
        <div className="animate-float-reverse absolute -right-8 top-5 sm:-right-5 sm:top-8">
          <div className="h-24 w-32 rotate-12 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1 shadow-2xl backdrop-blur-xs sm:h-32 sm:w-44">
            <img
              src={FOTOS_COLLAGE[1].url}
              alt={FOTOS_COLLAGE[1].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-45 sm:opacity-60"
            />
          </div>
        </div>

        {/* Esquina Inferior Izquierda */}
        <div className="animate-float-reverse absolute -left-7 bottom-5 sm:-left-4 sm:bottom-8">
          <div className="h-24 w-34 rotate-8 overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0A2744]/60 p-1 shadow-2xl backdrop-blur-xs sm:h-32 sm:w-46">
            <img
              src={FOTOS_COLLAGE[5].url}
              alt={FOTOS_COLLAGE[5].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-50 sm:opacity-65"
            />
          </div>
        </div>

        {/* Esquina Inferior Derecha */}
        <div className="animate-float-slow absolute -right-7 bottom-4 sm:-right-4 sm:bottom-7">
          <div className="h-24 w-34 -rotate-8 overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#0A2744]/60 p-1 shadow-2xl backdrop-blur-xs sm:h-32 sm:w-46">
            <img
              src={FOTOS_COLLAGE[2].url}
              alt={FOTOS_COLLAGE[2].etiqueta}
              className="h-full w-full rounded-xl object-cover opacity-50 sm:opacity-65"
            />
          </div>
        </div>

        {/* Viñeta central suave para garantizar lectura limpia en el centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,25,45,0.68)_32%,transparent_88%)]" />
      </div>

      {/* ======= FOTOS DECORATIVAS EN ESQUINAS IZQUIERDAS (ESCRITORIO GRANDE) ======= */}
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

      {/* ======= GRID PRINCIPAL ======= */}
      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center lg:grid-cols-12 lg:gap-8">
        {/* COLUMNA PRINCIPAL CENTRADA Y CON AIRE LIMPIO */}
        <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-4 py-3 text-center min-[390px]:gap-5 sm:gap-4 lg:col-span-7 lg:gap-5">
          {/* 1. ENCABEZADO: ESCUDO + INSIGNIA DE SEDE CENTRAL */}
          <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#092644] p-0.5 shadow-[0_0_32px_rgba(212,175,55,0.38)] min-[390px]:h-[76px] min-[390px]:w-[76px] sm:h-[74px] sm:w-[74px] lg:h-20 lg:w-20">
              <div className="pointer-events-none absolute -inset-1.5 rounded-full border border-[#D4AF37]/35" />
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#08223E]">
                {!usarSvgFallback ? (
                  <img
                    src={RUTAS_LOGO[indiceLogo]}
                    alt="Logo CAM"
                    onError={() => setIndiceLogo((prev) => prev + 1)}
                    className="h-full w-full scale-[1.04] object-cover"
                  />
                ) : (
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

            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F3D57B] sm:px-4 sm:text-xs sm:tracking-[0.16em]">
                <Sparkles className="h-3 w-3 shrink-0 text-[#D4AF37] sm:h-3.5 sm:w-3.5" />
                <span>Aniversario • Sede Central La Victoria</span>
              </span>
            </div>
          </div>

          {/* 2. BLOQUE CENTRAL: ARCO + NOMBRE + 22 AÑOS + TEXTO + CÁPSULA + BOTÓN */}
          <div className="flex w-full flex-col items-center">
            {/* Arco suave superior */}
            <svg
              viewBox="0 0 600 60"
              className="w-[305px] overflow-visible min-[390px]:w-[345px] sm:w-[430px] lg:w-[465px] xl:w-[505px]"
            >
              <defs>
                <path
                  id="arcoCAM"
                  d="M 24,52 Q 300,4 576,52"
                  fill="transparent"
                />
                <linearGradient
                  id="doradoArco"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E4BE57" />
                  <stop offset="50%" stopColor="#FFF2BE" />
                  <stop offset="100%" stopColor="#C99A2E" />
                </linearGradient>
              </defs>
              <text
                fill="url(#doradoArco)"
                className="text-[17.5px] font-bold uppercase tracking-[0.18em] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              >
                <textPath
                  href="#arcoCAM"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  ✦ Centro de Avivamiento Mundial ✦
                </textPath>
              </text>
            </svg>

            {/* Subtítulo recto enmarcado con filetes dorados */}
            <div className="mt-1 flex items-center justify-center gap-2 sm:mt-0.5">
              <span className="h-[1px] w-5 bg-gradient-to-r from-transparent to-[#D4AF37]/70 min-[390px]:w-7" />
              <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-sky-100/95 drop-shadow min-[390px]:text-[12.5px] min-[390px]:tracking-[0.22em] sm:text-sm sm:tracking-[0.26em]">
                Filadelfia Cuerpo de Cristo
              </p>
              <span className="h-[1px] w-5 bg-gradient-to-l from-transparent to-[#D4AF37]/70 min-[390px]:w-7" />
            </div>

            {/* Título principal */}
            <h1 className="gold-text-gradient mt-2 text-center font-serif text-5xl font-extrabold leading-none tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] min-[390px]:text-[62px] sm:text-6xl lg:mt-2.5 lg:text-7xl xl:text-8xl">
              22 Años
            </h1>

            {/* Mensaje de invitación */}
            <p className="mt-3 max-w-[310px] text-balance text-[14px] leading-relaxed text-sky-50/90 min-[390px]:mt-4 min-[390px]:max-w-[340px] min-[390px]:text-[15px] sm:mt-3.5 sm:max-w-md sm:text-base lg:mt-5 lg:text-lg">
              Te invitamos a conmemorar con nosotros esta fecha y agradecer a
              Dios los años de respaldo.
            </p>

            {/* CÁPSULA DE FECHA, HORA Y SEDE */}
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-[#08223E]/85 px-3.5 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.38)] backdrop-blur-md sm:mt-4 sm:gap-3.5 sm:px-5 lg:mt-5 lg:py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white sm:text-sm">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-[#D4AF37] sm:h-4 sm:w-4" />
                <span className="sm:hidden">Sáb. 5 Dic</span>
                <span className="hidden sm:inline">Sábado 5 de Diciembre</span>
              </div>

              <span className="h-3.5 w-[1px] bg-[#D4AF37]/45" />

              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#F3D57B] sm:text-sm">
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#D4AF37] sm:h-4 sm:w-4" />
                <span>5:00 PM</span>
              </div>

              <span className="h-3.5 w-[1px] bg-[#D4AF37]/45" />

              <div className="flex items-center gap-1 text-xs font-bold text-sky-200 sm:text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4AF37] sm:h-4 sm:w-4" />
                <span>La Victoria</span>
              </div>
            </div>

            {/* Botón principal */}
            <div className="mt-5 flex w-full justify-center min-[390px]:mt-6 sm:mt-5 lg:mt-6">
              <button
                type="button"
                onClick={onContinuar}
                className="btn-shimmer group relative inline-flex w-full max-w-[270px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#FFF2BE]/60 bg-gradient-to-r from-[#C8992D] via-[#E8C564] to-[#D4AF37] px-8 py-3.5 text-base font-extrabold tracking-wide text-[#061A2E] shadow-[0_10px_35px_rgba(212,175,55,0.38)] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_50px_rgba(212,175,55,0.55)] active:scale-[0.98] min-[390px]:max-w-[300px] min-[390px]:py-4 min-[390px]:text-[17px] sm:max-w-[310px] sm:px-10 sm:text-xl"
              >
                <span>Estaré Ahí</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: COLLAGE INTERACTIVO EN ESCRITORIO */}
        <div className="relative hidden h-[82%] w-full lg:col-span-5 lg:block">
          <div className="pointer-events-none absolute inset-10 rounded-full bg-[#D4AF37]/15 blur-3xl" />

          {/* Tarjeta 1 */}
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

          {/* Tarjeta 2 */}
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

          {/* Tarjeta 3 */}
          <div className="animate-float-slow absolute left-[16%] top-[34%] z-30 w-[66%] hover:z-40">
            <div className="collage-card group rotate-1 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#D4AF37]/70 bg-[#08223E]/90 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#FFF2BE] hover:shadow-[0_28px_65px_rgba(0,0,0,0.35)]">
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

          {/* Tarjeta 4 */}
          <div className="animate-float-reverse absolute bottom-2 left-2 z-20 w-[48%] hover:z-40">
            <div className="collage-card group rotate-2 cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#0B2B4C]/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md hover:rotate-0 hover:scale-[1.04] hover:border-[#F3D57B] hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
              <div className="relative h-32 overflow-hidden rounded-xl xl:h-40">
                <img
                  src={FOTOS_COLLAGE[3].url}
                  alt={FOTOS_COLLAGE[3].etiqueta}
                  className="h-full w-full object-cover group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A2E]/85 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-semibold text-[#F3D57B]">
                  ✦ {FOTOS_COLLAGE[3].etiqueta}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 5 */}
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