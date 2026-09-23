export type NavTab = { label: string; href: string };

/** Les cinq « stages » principaux — l'ordre fixe la numérotation du HUD. */
export const TABS: NavTab[] = [
  { label: "ACCUEIL",  href: "/" },
  { label: "PROFIL",   href: "/about" },
  { label: "PROJETS",  href: "/projects" },
  { label: "PARCOURS", href: "/parcours" },
  { label: "CONTACT",  href: "/contact" },
];

/** Destinations hors parcours numéroté (bonus stage / téléchargement). */
export const EXTRAS: NavTab[] = [
  { label: "SOUTIEN", href: "/soutien" },
];

/**
 * Vrai si `pathname` est l'onglet `href` ou une de ses sous-pages.
 * `/projects/afroza` garde ainsi PROJETS allumé dans la navigation.
 */
export function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Libellé central du HUD. L'accueil affiche la base plutôt qu'un numéro de
 * stage ; les pages hors parcours ont leur propre libellé.
 */
export function stageLabelFor(pathname: string): string {
  if (pathname === "/") return "YAOUNDE · CM";

  const extra = EXTRAS.find((t) => isActive(t.href, pathname));
  if (extra) return `BONUS / ${extra.label}`;

  const index = TABS.findIndex((t) => isActive(t.href, pathname));
  if (index < 0) return "HORS CARTE";

  const num = String(index + 1).padStart(2, "0");
  return `STAGE ${num} / ${TABS[index].label}`;
}
