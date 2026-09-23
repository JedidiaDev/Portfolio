/* ==========================================================================
   Effets d'écran (scanlines) — préférence persistée.

   L'état vit sur `<html data-fx>` plutôt que dans du state React : le script
   inline du layout le pose pendant le parsing du HTML, donc avant le premier
   pixel affiché. Pas de flash d'écran, pas d'erreur d'hydratation.
   ========================================================================== */

export const FX_STORAGE_KEY = "ndop-fx";

/** Valeur rendue par le serveur — les effets font partie de la direction
    artistique, ils sont donc actifs par défaut. */
export const FX_DEFAULT = "on";

/**
 * Corrige `data-fx` avant le premier paint :
 *  - un choix explicite déjà enregistré gagne toujours ;
 *  - sinon, `prefers-reduced-motion` coupe les effets d'office.
 * Le try/catch couvre les navigateurs où `localStorage` lève (mode privé,
 * cookies bloqués) — l'attribut garde alors sa valeur par défaut.
 */
export const FX_INLINE_SCRIPT = `(function(){try{
var v=localStorage.getItem(${JSON.stringify(FX_STORAGE_KEY)});
if(!v&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)v="off";
if(v)document.documentElement.setAttribute("data-fx",v);
}catch(e){}})()`;
