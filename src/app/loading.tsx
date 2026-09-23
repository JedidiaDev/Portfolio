/* Affiché pendant le rendu d'un segment — reprend le vocabulaire de la
   borne plutôt qu'un spinner générique. */

export default function Loading() {
  return (
    <section className="scr-section scr-full state-section">
      <div className="wrap state-inner">
        <p className="t-md loading-label blink">NOW LOADING...</p>
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
