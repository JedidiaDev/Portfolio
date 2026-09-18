"use client";

import { PIXEL_STACK } from "@/data/stack";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SpriteSheet from "@/components/common/SpriteSheet";

/* ============================================================
   Données de contenu — c'est ici que tu édites le texte réel.
   Les lignes marquées TODO sont celles que je n'ai pas pu vérifier
   ou pour lesquelles je n'invente pas de chiffre.
   ============================================================ */

const NAV = [
  { id: "accueil", label: "ACCUEIL" },
  { id: "profil", label: "PROFIL" },
  { id: "projets", label: "PROJETS" },
  { id: "parcours", label: "PARCOURS" },
  { id: "contact", label: "CONTACT" },
];

const STACK_TICKER = [
  "JAVA",
  "SPRING BOOT",
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "ELIXIR",
  "LARAVEL",
  "POSTGRESQL",
  "DOCKER",
  "NGINX",
  "WEBSOCKETS",
];

// TODO: vérifie chaque année avant publication — reconstituées à partir
// des projets connus, pas confirmées une à une.

/* ============================================================
   Sprites pixel 8×8, réutilisés via <use>
   ============================================================ */
// function SpriteSheet() {
//   return (
//     <svg
//       width="0"
//       height="0"
//       style={{ position: "absolute" }}
//       aria-hidden="true"
//     >
//       <defs>
//         <symbol id="i-heart" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M1 1h2v1H1zM5 1h2v1H5zM0 2h8v2H0zM1 4h6v1H1zM2 5h4v1H2zM3 6h2v1H3z"
//           />
//         </symbol>
//         <symbol id="i-coin" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M2 0h4v1H2zM1 1h1v1H1zM6 1h1v1H6zM0 2h1v4H0zM7 2h1v4H7zM1 6h1v1H1zM6 6h1v1H6zM2 7h4v1H2zM3 2h2v1H3zM3 3h1v2H3zM3 5h2v1H3z"
//           />
//         </symbol>
//         <symbol id="i-shield" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M1 0h6v1H1zM1 1h1v4H1zM6 1h1v4H6zM2 5h1v1H2zM5 5h1v1H5zM3 6h2v1H3zM3 2h2v1H3zM3 3h1v1H3z"
//           />
//         </symbol>
//         <symbol id="i-chip" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M2 0h1v1H2zM5 0h1v1H5zM1 1h6v6H1zM2 7h1v1H2zM5 7h1v1H5zM0 2h1v1H0zM0 5h1v1H0zM7 2h1v1H7zM7 5h1v1H7z"
//           />
//         </symbol>
//         <symbol id="i-bust" viewBox="0 0 16 16">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M5 2h6v1H5zM4 3h8v4H4zM5 7h6v1H5zM6 8h4v1H6zM3 9h10v7H3zM2 11h1v5H2zM13 11h1v5h-1z"
//           />
//         </symbol>
//         <symbol id="i-cart" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M0 0h2v1H0zM2 1h6v1H2zM2 2h6v3H2zM3 6h1v1H3zM6 6h1v1H6z"
//           />
//         </symbol>
//         <symbol id="i-key" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M1 1h3v3H1zM2 4h1v3H2zM3 5h2v1H3zM3 7h2v1H3zM5 2h2v1H5z"
//           />
//         </symbol>
//         <symbol id="i-flask" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M2 0h4v1H2zM3 1h1v3H3zM4 1h1v3H4zM2 4h4v3H2zM1 7h6v1H1z"
//           />
//         </symbol>
//         <symbol id="i-book" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M0 1h3v6H0zM5 1h3v6H5zM3 2h2v5H3z"
//           />
//         </symbol>
//         <symbol id="i-car" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M2 2h4v1H2zM1 3h6v2H1zM0 5h8v1H0zM1 6h1v1H1zM6 6h1v1H6z"
//           />
//         </symbol>
//         <symbol id="i-hands" viewBox="0 0 8 8">
//           <path
//             shapeRendering="crispEdges"
//             fill="currentColor"
//             d="M1 2h2v1H1zM5 2h2v1H5zM0 3h3v3H0zM5 3h3v3H5zM3 4h2v2H3z"
//           />
//         </symbol>
//       </defs>
//     </svg>
//   );
// }

/* ============================================================
   HUD + navigation avec suivi de section active
   ============================================================ */
// function Hud() {
//   const [active, setActive] = useState("accueil");

//   useEffect(() => {
//     const sections = NAV.map((n) => document.getElementById(n.id)).filter(
//       (el): el is HTMLElement => el !== null
//     );

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) setActive(entry.target.id);
//         });
//       },
//       { rootMargin: "-40% 0px -55% 0px" }
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <header className="hud">
//       <span className="l">ANONYM</span>
//       <nav className="hud-nav" aria-label="Navigation principale">
//         {NAV.map((n) => (
//           <a
//             key={n.id}
//             href={`#${n.id}`}
//             className={active === n.id ? "active" : undefined}
//             aria-current={active === n.id ? "true" : undefined}
//           >
//             {n.label}
//           </a>
//         ))}
//       </nav>
//       <span className="r">
//         <svg width="12" height="12">
//           <use href="#i-heart" />
//         </svg>
//         <svg width="12" height="12">
//           <use href="#i-heart" />
//         </svg>
//         <svg width="12" height="12">
//           <use href="#i-heart" />
//         </svg>
//         3 CREDITS
//       </span>
//     </header>
//   );
// }

/* ============================================================
   Attract screen
   ============================================================ */
function Hero() {
  return (
    <section id="accueil" className="attract-section">
      <div className="attract-inner">
        <p className="credits">ANONYM</p>
        <h1 className="t-xl title-stack">
          <span className="ndop-text">JEDIDIA KAMDEM SOUOP</span>
        </h1>
        <p className="role-line">
          FULL-STACK DEVELOPER
          <br />
          CTO @ AFROZA EDITOR
          <br />
          CYBERSECURITY ENTHUSIAST
        </p>
        <div className="sprites" aria-hidden="true">
          <svg style={{ color: "#F5A623" }}>
            <use href="#i-coin" />
          </svg>
          <svg style={{ color: "#E2453F" }}>
            <use href="#i-shield" />
          </svg>
          <svg style={{ color: "#45E08C" }}>
            <use href="#i-chip" />
          </svg>
          <svg style={{ color: "#F2E7D5" }}>
            <use href="#i-key" />
          </svg>
          <svg style={{ color: "#F5A623" }}>
            <use href="#i-coin" />
          </svg>
        </div>
        <a href="/about" className="prompt blink">
          PRESS START
        </a>
      </div>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...PIXEL_STACK, ...PIXEL_STACK, ...PIXEL_STACK, ...PIXEL_STACK].map((t, i) => (
            <Image
              key={`${t.id}-${i}`}
              src={t.image}
              alt=""
              width={44}
              height={44}
              className="ticker-icon"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function Home() {
  const [fxOn, setFxOn] = useState(true);
  const startedRef = useRef(false);

  // Une seule séquence de démarrage, jouée une fois, sautable et neutralisée
  // par prefers-reduced-motion (voir globals.css) — pas de fade-up répété
  // par section au défilement.
  useEffect(() => {
    startedRef.current = true;
  }, []);

  return (
    <>
      <SpriteSheet />
      {fxOn && <div className="scanlines" aria-hidden="true" />}
      {/* <Hud /> */}
      <main>
        <Hero />
      </main>
    </>
  );
}