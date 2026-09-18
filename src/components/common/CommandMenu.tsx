"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { stageLabelFor, TABS } from "@/lib/nav";

type MenuItem = { label: string; hint: string; href: string; download?: boolean };

const ITEMS: MenuItem[] = [
  { label: "PLAYER CARD",  hint: "qui je suis",   href: "/about" },
  { label: "STAGE SELECT", hint: "6 projets",     href: "/projects" },
  { label: "QUEST LOG",    hint: "parcours",      href: "/parcours" },
  { label: "CONTINUE?",    hint: "me contacter",  href: "/contact" },
  { label: "CV.PDF",       hint: "télécharger",   href: "/cv.pdf", download: true },
];

export default function CommandMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    itemRefs.current[0]?.focus();
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    itemRefs.current[active]?.focus();
  }, [active]);

  function activate(item: MenuItem) {
    if (item.download) {
      const a = document.createElement("a");
      a.href = item.href;
      a.download = "";
      a.click();
      return;
    }
    router.push(item.href);
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Escape": e.preventDefault(); onClose(); break;
      case "ArrowDown": e.preventDefault(); setActive((i) => (i + 1) % ITEMS.length); break;
      case "ArrowUp": e.preventDefault(); setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length); break;
      case "Home": e.preventDefault(); setActive(0); break;
      case "End": e.preventDefault(); setActive(ITEMS.length - 1); break;
      case "Enter":
      case " ": e.preventDefault(); activate(ITEMS[active]); break;
    }
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Menu principal" onKeyDown={onKeyDown} className="command-overlay">
      <div className="hud">
        <span className="l" style={{ color: "var(--raffia-dim)", textDecoration: "line-through" }}>ANONYM</span>
        <span className="m">{stageLabelFor(pathname)} / MENU</span>
        <button onClick={onClose} className="r" style={{ background: "none", border: 0, cursor: "pointer", font: "inherit" }}>
          ESC POUR FERMER
        </button>
      </div>

      <nav className="hud-nav">
        {TABS.map((tab) => {
          const isActive = tab.href === pathname;
          return (
            <a key={tab.href} href={tab.href} aria-current={isActive ? "page" : undefined} className={isActive ? "active" : undefined}>
              {isActive && "▸ "}{tab.label}
            </a>
          );
        })}
      </nav>

      <div className="command-list">
        <p className="t-sm" style={{ color: "var(--ochre)", marginBottom: "var(--s4)" }}>
          SELECTIONNEZ UNE DESTINATION
        </p>
        {ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <a
              key={item.label}
              ref={(el) => { itemRefs.current[i] = el; }}
              href={item.href}
              download={item.download}
              tabIndex={isActive ? 0 : -1}
              onFocus={() => setActive(i)}
              onClick={(e) => { e.preventDefault(); activate(item); }}
              className={`command-item${isActive ? " active" : ""}`}
            >
              <span>{isActive && "▸ "}{item.label}</span>
              <span className="command-hint">{item.hint}</span>
            </a>
          );
        })}
      </div>

      <div className="command-help mono">
        ↑ ↓ pour naviguer · ENTRÉE pour valider · ESC pour fermer
      </div>
    </div>
  );
}