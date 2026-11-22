"use client";

import { useState } from "react";
import VistaInvitacion from "@/components/VistaInvitacion";
import VistaFormulario from "@/components/VistaFormulario";
import VistaEsperando, { ResumenRegistro } from "@/components/VistaEsperando";

type Vista = "invitacion" | "formulario" | "esperando";

export default function AniversarioPage() {
  const [vista, setVista] = useState<Vista>("invitacion");
  const [resumenRegistro, setResumenRegistro] =
    useState<ResumenRegistro | null>(null);

  return (
    <div className="relative flex h-dvh w-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-[#06192D] via-[#0B2D50] to-[#041222] text-white">
      {/* Resplandores Azul Océano y Dorado de fondo */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#155289]/35 blur-[110px]" />
      <div className="pointer-events-none absolute right-10 top-10 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-96 rounded-full bg-[#0F4577]/30 blur-[90px]" />

      {/* CONTENEDOR CENTRAL DE PANTALLA COMPLETA (CERO SCROLL) */}
      <main className="z-10 flex min-h-0 w-full flex-1 items-center justify-center">
        {vista === "invitacion" && (
          <VistaInvitacion onContinuar={() => setVista("formulario")} />
        )}

        {vista === "formulario" && (
          <VistaFormulario
            onVolver={() => setVista("invitacion")}
            onExito={(resumen) => {
              setResumenRegistro(resumen);
              setVista("esperando");
            }}
          />
        )}

        {vista === "esperando" && (
          <VistaEsperando
            resumen={resumenRegistro}
            onNuevoRegistro={() => setVista("formulario")}
          />
        )}
      </main>

      {/* FOOTER SIMPLE CON SÍMBOLO © */}
      <footer className="z-20 flex shrink-0 items-center justify-center border-t border-[#D4AF37]/15 bg-[#041322]/70 px-6 py-2.5 text-xs text-sky-200/65 backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5 tracking-wide">
          <span className="text-sm leading-none text-[#D4AF37]">&copy;</span>
          <span>Filadelfia Cuerpo de Cristo 2026</span>
        </span>
      </footer>
    </div>
  );
}