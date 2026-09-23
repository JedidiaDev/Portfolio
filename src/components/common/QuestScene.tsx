import React from "react";

/* ==========================================================================
   Scène de fond du Quest Log — un personnage pixel qui court un parcours.

   Purement décorative : aria-hidden, pointer-events:none, et posée derrière
   le contenu. Trois plans de décor défilent à des vitesses différentes
   (parallaxe), et le coureur — centré — saute les obstacles qui viennent à
   lui : le principe du runner d'arcade.

   Les obstacles forment leur propre couche, ancrée au centre et non au bord
   gauche. Elle ne se décale que d'un intervalle par cycle : au bout d'un
   cycle, chaque obstacle occupe la place du précédent, donc la boucle est
   invisible ET la phase ne dépend plus de la largeur de l'écran. C'est ce
   qui permet de centrer le coureur sans désaligner le saut.

   Tout est en CSS : ce composant reste un composant serveur, rien n'est
   envoyé au navigateur en JavaScript. Les animations se figent sous
   `prefers-reduced-motion` et quand les effets sont coupés (html[data-fx]).

   Échelle commune à toute la scène : 1 unité SVG = 4 px.
   ========================================================================== */

/** Un rectangle pixel, dans la même écriture que SpriteSheet. */
const px = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y}h${w}v${h}H${x}z`;

const join = (...rects: string[]) => rects.join("");

/* --------------------------------------------------------------------------
   Le coureur — vue de profil, tourné vers la droite. 16 × 16 unités,
   les pieds reposent sur y = 16.

   Le buste ne bouge pas : seuls les membres changent d'une image à l'autre.
   Quatre images pour la course, une pour le saut.
   -------------------------------------------------------------------------- */

const BODY = {
  cap: join(px(3, 1, 8, 2), px(3, 3, 2, 1)),
  face: px(5, 3, 6, 4),
  eye: px(9, 4, 1, 2),
  torso: px(4, 7, 6, 4),
  belt: px(4, 11, 6, 1),
};

type Limbs = { arm: string; legs: string; shoes: string };

const RUN_FRAMES: Limbs[] = [
  // 1 — foulée ouverte, bras en avant
  {
    arm: px(9, 7, 4, 2),
    legs: join(px(3, 12, 2, 3), px(9, 12, 2, 3)),
    shoes: join(px(2, 15, 3, 1), px(10, 15, 3, 1)),
  },
  // 2 — jambes rassemblées
  {
    arm: px(7, 7, 3, 2),
    legs: join(px(5, 12, 2, 4), px(8, 12, 2, 4)),
    shoes: join(px(4, 15, 3, 1), px(8, 15, 3, 1)),
  },
  // 3 — foulée inverse, bras en arrière
  {
    arm: px(2, 7, 4, 2),
    legs: join(px(4, 12, 2, 3), px(8, 12, 3, 3)),
    shoes: join(px(2, 15, 3, 1), px(9, 15, 4, 1)),
  },
  // 4 — jambes rassemblées, bras qui repart
  {
    arm: px(6, 7, 3, 2),
    legs: join(px(5, 12, 2, 4), px(8, 12, 2, 4)),
    shoes: join(px(5, 15, 3, 1), px(9, 15, 3, 1)),
  },
];

// Saut — jambes repliées, bras levé.
const JUMP_FRAME: Limbs = {
  arm: px(10, 5, 4, 2),
  legs: join(px(4, 12, 3, 2), px(8, 11, 3, 3)),
  shoes: join(px(3, 13, 3, 2), px(10, 13, 3, 2)),
};

function Limbs({ frame }: { frame: Limbs }) {
  return (
    <>
      <path className="s-leg" shapeRendering="crispEdges" d={frame.legs} />
      <path className="s-shoe" shapeRendering="crispEdges" d={frame.shoes} />
      <path className="s-skin" shapeRendering="crispEdges" d={frame.arm} />
    </>
  );
}

function Runner() {
  return (
    <svg className="runner-sprite" viewBox="0 0 16 16" aria-hidden="true">
      {/* Buste commun à toutes les images */}
      <g>
        <path className="s-cap" shapeRendering="crispEdges" d={BODY.cap} />
        <path className="s-skin" shapeRendering="crispEdges" d={BODY.face} />
        <path className="s-eye" shapeRendering="crispEdges" d={BODY.eye} />
        <path className="s-shirt" shapeRendering="crispEdges" d={BODY.torso} />
        <path className="s-belt" shapeRendering="crispEdges" d={BODY.belt} />
      </g>

      {/* Cycle de course — les quatre images se relaient par décalage de phase */}
      <g className="runner-walk">
        {RUN_FRAMES.map((frame, i) => (
          <g className={`rf rf${i + 1}`} key={i}>
            <Limbs frame={frame} />
          </g>
        ))}
      </g>

      {/* Image de saut — visible seulement pendant la phase aérienne */}
      <g className="runner-jump">
        <Limbs frame={JUMP_FRAME} />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Plan rapproché : le sol et les obstacles.

   Tuile de 80 × 24 unités (320 × 96 px), sol de y = 18 à 24. Pure texture :
   sa phase n'a aucune importance, elle défile juste à la même vitesse que
   les obstacles (26,7 px/s) pour paraître solidaire du sol.
   -------------------------------------------------------------------------- */

const GROUND_TILE = {
  body: px(0, 19, 80, 5),
  crust: px(0, 18, 80, 1),
  pebbles: join(px(22, 21, 2, 1), px(58, 22, 3, 1), px(70, 21, 2, 1)),
  tufts: join(px(28, 16, 1, 2), px(30, 17, 1, 1), px(66, 16, 1, 2)),
};

function GroundTile() {
  return (
    <svg
      className="tile tile-ground"
      viewBox="0 0 80 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="g-body" shapeRendering="crispEdges" d={GROUND_TILE.body} />
      <path className="g-crust" shapeRendering="crispEdges" d={GROUND_TILE.crust} />
      <path className="g-detail" shapeRendering="crispEdges" d={GROUND_TILE.pebbles} />
      <path className="g-tuft" shapeRendering="crispEdges" d={GROUND_TILE.tufts} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Plan intermédiaire : collines en silhouette, escalier de pixels.
   Tuile de 160 × 24 unités (640 × 96 px).
   -------------------------------------------------------------------------- */

const HILLS =
  "M0 24V20H10V16H20V12H34V8H48V12H62V16H74V20H86V24Z" +
  "M92 24V18H104V14H116V10H128V14H142V18H152V24Z";

function HillsTile() {
  return (
    <svg
      className="tile tile-hills"
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="h-body" shapeRendering="crispEdges" d={HILLS} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Plan lointain : nuages / étoiles, le plus lent.
   Tuile de 120 × 16 unités (480 × 64 px).
   -------------------------------------------------------------------------- */

const CLOUDS = join(
  px(8, 6, 14, 3), px(12, 4, 7, 2),
  px(46, 9, 10, 2), px(49, 7, 5, 2),
  px(84, 5, 16, 3), px(89, 3, 8, 2),
);

const STARS = join(
  px(30, 2, 1, 1), px(64, 3, 1, 1), px(72, 11, 1, 1), px(110, 6, 1, 1),
);

function CloudsTile() {
  return (
    <svg
      className="tile tile-clouds"
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="c-star" shapeRendering="crispEdges" d={STARS} />
      <path className="c-body" shapeRendering="crispEdges" d={CLOUDS} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Les obstacles — couche ancrée au centre.

   Deux silhouettes alternées, posées tous les OBSTACLE_GAP px de part et
   d'autre du coureur. La piste ne glisse que d'un intervalle par cycle :
   au bout du cycle l'obstacle n°2 occupe la place du n°1, l'image est donc
   identique et la boucle invisible — sans avoir à dupliquer une tuile ni à
   connaître la largeur de l'écran.
   -------------------------------------------------------------------------- */

/** Écart entre deux obstacles, en px. Doit rester égal à la distance
    parcourue en un cycle de saut (voir .obstacle-track dans globals.css). */
const OBSTACLE_GAP = 160;

/** Portée de part et d'autre du centre : couvre les écrans jusqu'à 3840 px
    de large sans laisser de trou. */
const OBSTACLE_REACH = 1920;

const OFFSETS = Array.from(
  { length: (OBSTACLE_REACH * 2) / OBSTACLE_GAP + 1 },
  (_, i) => -OBSTACLE_REACH + i * OBSTACLE_GAP,
);

// Deux profils, alternés, pour casser la répétition.
const OBSTACLE_SHAPES = [
  // borne basse
  join(px(1, 3, 6, 5), px(2, 2, 4, 1)),
  // pic
  join(px(1, 1, 6, 7), px(2, 0, 4, 1)),
];

function Obstacles() {
  return (
    <div className="quest-obstacles">
      <div className="obstacle-track">
        {OFFSETS.map((offset, i) => (
          <svg
            key={offset}
            className="obstacle"
            viewBox="0 0 8 8"
            aria-hidden="true"
            style={{ left: `${offset}px` }}
          >
            <path
              className="g-obstacle"
              shapeRendering="crispEdges"
              d={OBSTACLE_SHAPES[i % OBSTACLE_SHAPES.length]}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Assemblage.

   Chaque plan répète sa tuile puis glisse de -50 %, soit exactement la
   moitié de la piste : avec un nombre pair de tuiles, la translation vaut un
   nombre entier de tuiles et la boucle est invisible.

   Le nombre de tuiles n'est pas cosmétique : en fin de translation il ne
   reste que la moitié de la piste à gauche de sa position de départ, donc
   `tuiles / 2 × largeur` doit dépasser la largeur de l'écran, sinon le décor
   s'arrête en plein milieu de la page. Les compteurs ci-dessous couvrent
   jusqu'à 2560 px.
   -------------------------------------------------------------------------- */

function Layer({
  name,
  tile,
  repeat,
}: {
  name: string;
  tile: React.ReactNode;
  repeat: number;
}) {
  return (
    <div className={`quest-layer quest-${name}`}>
      <div className="quest-track">
        {Array.from({ length: repeat }, (_, i) => (
          <React.Fragment key={i}>{tile}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function QuestScene() {
  return (
    <div className="quest-scene" aria-hidden="true">
      {/* tuiles : nuages 480 px, collines 640 px, sol 320 px */}
      <Layer name="clouds" tile={<CloudsTile />} repeat={12} />
      <Layer name="hills" tile={<HillsTile />} repeat={8} />
      <Layer name="ground" tile={<GroundTile />} repeat={16} />
      <Obstacles />
      <div className="quest-runner">
        <Runner />
      </div>
    </div>
  );
}
