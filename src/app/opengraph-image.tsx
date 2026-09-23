import { ImageResponse } from "next/og";

/* ==========================================================================
   Image de partage, générée au build.

   Remplace la référence à /og-image.png, qui pointait vers un fichier absent
   (donc aucune vignette sur LinkedIn, WhatsApp ou X). Reprend la palette
   Ndop et le motif en losanges plutôt qu'une carte générique.

   Pas de police pixel ici : la charger imposerait un appel réseau au build.
   L'image mise sur la couleur et la structure, qui portent déjà la DA.
   ========================================================================== */

export const alt =
  "Jedidia Kamdem Souop — Développeur Full Stack & Ethical Hacker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#080B22";
const NDOP_HI = "#26327F";
const RAFFIA = "#F2E7D5";
const RAFFIA_DIM = "#A9A2BE";
const TOGHU = "#E2453F";
const OCHRE = "#F5A623";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: VOID,
          color: RAFFIA,
          position: "relative",
        }}
      >
        {/* Motif Ndop — losanges tissés, en fond. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `repeating-linear-gradient(45deg, transparent 0 22px, rgba(242,231,213,0.07) 22px 26px), repeating-linear-gradient(-45deg, transparent 0 22px, rgba(242,231,213,0.07) 22px 26px)`,
          }}
        />

        {/* Barre de HUD, comme sur le site. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            height: 88,
            background: "#18215C",
            borderBottom: `8px solid ${TOGHU}`,
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          <span style={{ color: OCHRE }}>ANONYM</span>
          <span style={{ color: RAFFIA_DIM }}>YAOUNDE · CM</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
              // Ombre portée nette, sans flou : l'équivalent du drop-shadow
              // pixel du titre sur le site.
              textShadow: `8px 8px 0 ${TOGHU}`,
            }}
          >
            JEDIDIA KAMDEM SOUOP
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 32,
              letterSpacing: 2,
              color: OCHRE,
            }}
          >
            FULL-STACK DEVELOPER · CTO @ AFROZA EDITOR
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {["JAVA", "SPRING BOOT", "REACT", "NEXT.JS", "TYPESCRIPT"].map(
              (chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "12px 20px",
                    background: "#0C1030",
                    border: `4px solid ${NDOP_HI}`,
                    color: RAFFIA_DIM,
                    fontSize: 22,
                    letterSpacing: 2,
                  }}
                >
                  {chip}
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 24,
            background: TOGHU,
          }}
        />
      </div>
    ),
    size,
  );
}
