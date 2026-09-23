"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isActive, stageLabelFor, TABS } from "@/lib/nav";
import { PROJECTS } from "@/data/projects";

const PROJECT_COUNT = PROJECTS.length;

type MenuItem = {
  label: string;
  hint: string;
  href: string;
  download?: boolean;
  external?: boolean;
};

const BASE_ITEMS: MenuItem[] = [
  { label: "PLAYER CARD",  hint: "qui je suis",         href: "/about" },
  { label: "STAGE SELECT", hint: `${PROJECT_COUNT} projets`, href: "/projects" },
  { label: "QUEST LOG",    hint: "parcours",            href: "/parcours" },
  { label: "CONTINUE?",    hint: "me contacter",        href: "/contact" },
  { label: "INSERT COIN",  hint: "soutenir le travail", href: "/soutien" },
];

const CV_ITEM: MenuItem = {
  label: "CV.PDF",
  hint: "télécharger",
  href: "/cv.pdf",
  download: true,
};

export default function CommandMenu({
  onClose,
  hasCv,
}: {
  onClose: () => void;
  hasCv: boolean;
}) {
  // Le CV n'apparaît que si public/cv.pdf existe — proposer un
  // téléchargement qui renvoie une 404 est pire que ne rien proposer.
  const ITEMS = hasCv ? [...BASE_ITEMS, CV_ITEM] : BASE_ITEMS;
  const router = useRouter();
  const pathname = usePathname();
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Le menu s'ouvre sur la destination courante plutôt que systématiquement
  // sur la première : le repère visuel correspond alors à où l'on est.
  // Calculé au premier rendu — rien à recorriger ensuite.
  const [active, setActive] = useState(() => {
    const here = ITEMS.findIndex(
      (i) => !i.download && isActive(i.href, pathname),
    );
    return here >= 0 ? here : 0;
  });

  // Empêche la page en dessous de défiler tant que la modale est ouverte.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Déplace le focus avec la sélection — y compris au montage.
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
      case "Escape":
        e.preventDefault();
        onClose();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % ITEMS.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(ITEMS.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        activate(ITEMS[active]);
        break;
      case "Tab": {
        // Piège à focus : une boîte de dialogue modale ne doit pas laisser
        // la tabulation filer vers la page qu'elle recouvre.
        e.preventDefault();
        if (document.activeElement === closeRef.current) {
          itemRefs.current[active]?.focus();
        } else {
          closeRef.current?.focus();
        }
        break;
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      onKeyDown={onKeyDown}
      className="command-overlay"
    >
      <div className="hud">
        <span className="l" style={{ color: "var(--raffia-dim)" }}>
          ANONYM
        </span>
        <span className="m">{stageLabelFor(pathname)} / MENU</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="r hud-trigger"
        >
          <span className="hud-trigger-label">FERMER</span>
          <kbd className="hud-kbd" aria-hidden="true">ESC</kbd>
        </button>
      </div>

      <nav className="hud-nav command-tabs" aria-label="Sections">
        {TABS.map((tab) => {
          const current = isActive(tab.href, pathname);
          return (
            <a
              key={tab.href}
              href={tab.href}
              aria-current={current ? "page" : undefined}
              className={current ? "active" : undefined}
              tabIndex={-1}
            >
              {tab.label}
            </a>
          );
        })}
      </nav>

      <div className="command-list">
        <p className="t-sm command-title">SÉLECTIONNEZ UNE DESTINATION</p>
        {ITEMS.map((item, i) => {
          const focused = i === active;
          const current = !item.download && isActive(item.href, pathname);
          return (
            <a
              key={item.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={item.href}
              download={item.download}
              aria-current={current ? "page" : undefined}
              tabIndex={focused ? 0 : -1}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onClick={(e) => {
                e.preventDefault();
                activate(item);
              }}
              className={`command-item${focused ? " active" : ""}`}
            >
              <span className="command-caret" aria-hidden="true">
                {focused ? "▸" : ""}
              </span>
              <span className="command-label">{item.label}</span>
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
