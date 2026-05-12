import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "mtverse - Free tools, AI prompts, website templates, and UI components";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "72px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0f172a",
              color: "#fff",
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div style={{ fontSize: "34px", fontWeight: 900 }}>mtverse</div>
        </div>

        <div
          style={{
            maxWidth: "920px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              lineHeight: 1,
              letterSpacing: "-0.06em",
              fontWeight: 900,
            }}
          >
            Free tools, prompts, templates, and UI components.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              lineHeight: 1.35,
              color: "#475569",
            }}
          >
            Fast public utilities for creators, developers, students, and teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "24px",
            color: "#334155",
          }}
        >
          {["Free tools", "AI prompts", "Templates", "UI components"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "999px",
                padding: "12px 20px",
                background: "#fff",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
