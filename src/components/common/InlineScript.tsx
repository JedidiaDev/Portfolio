/**
 * Script exécuté pendant le parsing du HTML, avant le premier rendu visuel.
 *
 * `type="text/plain"` côté client : un script inséré par le DOM ne s'exécute
 * pas de toute façon, et cela évite l'avertissement React en développement.
 * `suppressHydrationWarning` couvre la différence de `type` entre les deux.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
