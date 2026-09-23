"use client";

import { useLayoutEffect, useState } from "react";
import { FX_DEFAULT, FX_STORAGE_KEY } from "@/lib/fx";

/**
 * Bouton d'activation des effets d'écran.
 *
 * L'initialiseur paresseux lit l'attribut que le script inline du layout a
 * déjà posé : React part donc de la même valeur que le DOM, sans rien à
 * corriger après coup.
 */
export default function FxToggle({ className = "" }: { className?: string }) {
  const [fx, setFx] = useState<string>(() => {
    if (typeof document === "undefined") return FX_DEFAULT;
    return document.documentElement.getAttribute("data-fx") ?? FX_DEFAULT;
  });

  // Seule synchronisation nécessaire : refléter l'état React sur <html>.
  // Elle couvre aussi le remontage du Strict Mode en développement, qui
  // remet <html> aux seuls attributs venant du JSX et efface celui du script.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-fx", fx);
  }, [fx]);

  function toggle() {
    const next = fx === "on" ? "off" : "on";
    setFx(next);
    try {
      localStorage.setItem(FX_STORAGE_KEY, next);
    } catch {
      /* Choix non persisté (mode privé, stockage bloqué), mais appliqué
         pour cette visite. */
    }
  }

  const on = fx === "on";

  return (
    <button
      type="button"
      className={`fx-toggle ${className}`}
      onClick={toggle}
      aria-pressed={on}
    >
      <span className={`fx-led${on ? " on" : ""}`} aria-hidden="true" />
      {on ? "EFFETS : ON" : "EFFETS : OFF"}
    </button>
  );
}
