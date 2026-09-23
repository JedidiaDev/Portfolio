"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandMenu from "../common/CommandMenu";
import { isActive, stageLabelFor, TABS } from "@/lib/nav";

export default function Header({ hasCv }: { hasCv: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Rendre le focus au déclencheur : sans ça, la tabulation repartirait du
    // début du document après la fermeture.
    triggerRef.current?.focus();
  }, []);

  // Raccourci d'ouverture — ⌘K / Ctrl+K, la convention des palettes de
  // commandes. Ignoré pendant la saisie dans un champ.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      setMenuOpen((open) => !open);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Une navigation depuis le menu doit le refermer. Ajusté pendant le rendu
  // plutôt que dans un effet : React relance le rendu immédiatement, sans
  // passer par un affichage intermédiaire menu-ouvert-sur-la-nouvelle-page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="hud">
        <Link href="/" className="l">
          ANONYM
        </Link>

        {/* Navigation permanente sur grand écran — le menu plein écran reste
            la porte d'entrée en dessous, et au clavier partout. */}
        <nav className="hud-nav" aria-label="Navigation principale">
          {TABS.map((tab) => {
            const current = isActive(tab.href, pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={current ? "active" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <span className="m">{stageLabelFor(pathname)}</span>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="r hud-trigger"
        >
          <span className="hearts" aria-hidden="true">
            <svg width="12" height="12"><use href="#i-heart" /></svg>
            <svg width="12" height="12"><use href="#i-heart" /></svg>
            <svg width="12" height="12"><use href="#i-heart" /></svg>
          </span>
          <span className="hud-trigger-label">MENU</span>
          <kbd className="hud-kbd" aria-hidden="true">⌘K</kbd>
        </button>
      </header>

      {menuOpen && <CommandMenu onClose={closeMenu} hasCv={hasCv} />}
    </>
  );
}
