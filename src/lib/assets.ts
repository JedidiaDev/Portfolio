import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/* ==========================================================================
   Présence des fichiers de `public/`, vérifiée au build.

   Plusieurs vues renvoyaient vers des fichiers absents (cv.pdf, QR Binance) :
   un lien mort en production, invisible en relecture de code. On teste donc
   leur présence au moment du rendu statique et on masque ce qui n'existe pas.
   Dépose le fichier, relance le build, l'élément réapparaît.
   ========================================================================== */

const PUBLIC_DIR = path.join(process.cwd(), "public");

export function publicFileExists(relativePath: string): boolean {
  // Garde-fou : on ne sort jamais de public/, même si l'appelant se trompe.
  const target = path.resolve(PUBLIC_DIR, relativePath.replace(/^\/+/, ""));
  if (!target.startsWith(PUBLIC_DIR)) return false;
  return existsSync(target);
}

export const HAS_CV = publicFileExists("cv.pdf");
export const HAS_BINANCE_QR = publicFileExists("images/binance-pay-qr.png");
