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
    let svgText = await readFile(
      join(process.cwd(), "public", "favicon.svg"),
      "utf-8"
    );

    // Asegura que <svg> tenga width y height explícitos (requisito de next/og)
    if (!/\bwidth=/.test(svgText)) {
      svgText = svgText.replace("<svg", '<svg width="512" height="512"');
    }

    logoSrc = `data:image/svg+xml;base64,${Buffer.from(svgText).toString("base64")}`;
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
        {/* Halo dorado exterior */}
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

        {/* Contenedor circular con tu favicon.svg */}
        <div
          style={{
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            border: "5px solid #D4AF37",
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
              width="460"
              height="460"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                color: "#F3D57B",
                fontSize: "96px",
                fontWeight: 800,
                fontFamily: "Georgia, serif",
              }}
            >
              CAM
            </span>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}