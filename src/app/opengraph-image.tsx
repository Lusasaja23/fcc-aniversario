import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Filadelfia Cuerpo de Cristo - 22 Años";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  let logoSrc: string | null = null;
  try {
    const logoBuffer = await readFile(join(process.cwd(), "public", "logo.jpg"));
    logoSrc = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at center, #0E3762 0%, #06192D 65%, #030E1A 100%)",
          position: "relative",
        }}
      >
        {/* Halo dorado suave alrededor del escudo */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            border: "2px solid rgba(212, 175, 55, 0.28)",
            display: "flex",
          }}
        />

        {/* Escudo central grande (ocupa todo el recorte cuadrado de WhatsApp sin cortarse) */}
        <div
          style={{
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            border: "6px solid #D4AF37",
            background: "#08223E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.65)",
          }}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              width="482"
              height="482"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <img src="/favicon.svg" alt="" />
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}