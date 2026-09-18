"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CommandMenu from "../common/CommandMenu";
import { stageLabelFor } from "@/lib/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <header className="hud">
        <a href="/" className="l">ANONYM</a>
        <span className="m">{stageLabelFor(pathname)}</span>
        <button
          ref={triggerRef}
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="r"
          style={{ background: "none", border: 0, padding: 0, margin: 0, cursor: "pointer", font: "inherit" }}
        >
          <svg width="12" height="12" aria-hidden="true"><use href="#i-heart" /></svg>
          <svg width="12" height="12" aria-hidden="true"><use href="#i-heart" /></svg>
          <svg width="12" height="12" aria-hidden="true"><use href="#i-heart" /></svg>
          3 CREDITS
        </button>
      </header>
      {menuOpen && <CommandMenu onClose={closeMenu} />}
    </>
  );
}