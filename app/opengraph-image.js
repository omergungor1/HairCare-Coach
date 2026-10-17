import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "HairCare Coach — stop quitting your hair routine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/downloads/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#F8FAFC",
          color: "#0F172A",
          padding: "64px 72px",
        }}
      >
        {/* ImageResponse only paints a plain img; next/image is not available here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={420} height={420} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 620 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Stop quitting your hair routine.
          </div>
          <div style={{ fontSize: 30, color: "#2D6A4F" }}>Daily consistency. Zero false promises.</div>
          <div style={{ fontSize: 24, color: "#475569" }}>haircarecoach.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
