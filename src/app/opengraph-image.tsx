import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export const alt = `${SITE_NAME} – free online coloring for kids`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fffbf7 0%, #ffe4ec 100%)",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 24 }}>🎀</div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#e84c6f",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#5c4a5a",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size,
  );
}
