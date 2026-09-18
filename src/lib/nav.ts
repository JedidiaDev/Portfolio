export type NavTab = { label: string; href: string };

export const TABS: NavTab[] = [
  { label: "ACCUEIL",  href: "/" },
  { label: "PROFIL",   href: "/about" },
  { label: "PROJETS",  href: "/projects" },
  { label: "PARCOURS", href: "/parcours" },
  { label: "CONTACT",  href: "/contact" },
];

export function stageLabelFor(pathname: string): string {
  const index = TABS.findIndex((t) => t.href === pathname);
  const tab = TABS[index] ?? TABS[0];
  const num = String(Math.max(index, 0) + 1).padStart(2, "0");
  return index <= 0 ? "YAOUNDE · CM" : `STAGE ${num} / ${tab.label}`;
}