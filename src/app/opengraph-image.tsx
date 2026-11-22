import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "22 Años - Filadelfia Cuerpo de Cristo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Cargamos public/logo.jpg en Base64 para que siempre aparezca nítido en el banner
  let logoSrc: string | null = null;
  try {
    const logoBuffer = await readFile(join(process.cwd(), "public", "logo.jpg"));
    logoSrc = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  const fecha = process.env.EVENTO_FECHA || "Sábado 5 de Diciembre • 5:00 PM";
  const direccion = process.env.EVENTO_DIRECCION || "Av. Atusparia 133, La Victoria";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #041222 0%, #0A2A4D 50%, #051629 100%)",
          padding: "46px 64px",
          position: "relative",
          fontFamily: "Georgia, serif",
          color: "#ffffff",
        }}
      >
        {/* Marco doble dorado elegante */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            left: "22px",
            right: "22px",
            bottom: "22px",
            border: "2px solid rgba(212, 175, 55, 0.55)",
            borderRadius: "28px",
            display: "flex",
          }}
        />

        {/* Cabecera con Logo Oficial + Nombre del Ministerio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "999px",
              border: "3px solid #D4AF37",
              background: "#08223E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 0 35px rgba(212, 175, 55, 0.4)",
            }}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                width="102"
                height="102"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#F3D57B", fontSize: "26px", fontWeight: 700 }}>
                CAM
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#F3D57B",
                fontSize: "18px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
              }}
            >
              ✦ Centro de Avivamiento Mundial ✦
            </span>
            <span
              style={{
                color: "#E0F2FE",
                fontSize: "24px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                fontWeight: 800,
                marginTop: "6px",
              }}
            >
              Filadelfia Cuerpo de Cristo
            </span>
          </div>
        </div>

        {/* Bloque Central Protagonista: 22 Años */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "rgba(212, 175, 55, 0.16)",
              border: "1px solid rgba(243, 213, 123, 0.55)",
              borderRadius: "999px",
              padding: "8px 26px",
              color: "#F3D57B",
              fontSize: "17px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Invitación Especial de Aniversario
          </div>

          <div
            style={{
              fontSize: "126px",
              fontWeight: 900,
              lineHeight: 1,
              color: "#F6DC86",
              textShadow: "0 10px 30px rgba(0, 0, 0, 0.55)",
            }}
          >
            22 Años
          </div>

          <div
            style={{
              marginTop: "16px",
              fontSize: "25px",
              color: "#F0F9FF",
              maxWidth: "880px",
              lineHeight: 1.35,
              fontFamily: "Arial, sans-serif",
            }}
          >
            Te invitamos a conmemorar con nosotros esta fecha y agradecer a Dios los años de respaldo.
          </div>
        </div>

        {/* Pie del Banner con Fecha, Dirección y Llamado a la Acción */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(212, 175, 55, 0.35)",
            paddingTop: "20px",
            fontFamily: "Arial, sans-serif",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "28px", color: "#BAE6FD", fontSize: "20px" }}>
            <span>📅 {fecha}</span>
            <span>📍 {direccion}</span>
          </div>

          <div
            style={{
              background: "#D4AF37",
              color: "#06192D",
              padding: "10px 26px",
              borderRadius: "14px",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            Confirmar Asistencia →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}