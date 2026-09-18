import Link from "next/link";
import { QUEST_LOG } from "@/data/quest_log";
import SpriteSheet from "@/components/common/SpriteSheet";

export default function Parcours() {
  return (
    <section id="parcours" className="scr-section scr-full">
      <SpriteSheet />
      <div className="wrap">
        <h2 className="t-lg">QUEST LOG</h2>
        <p className="body section-lede">Le parcours, en bref.</p>
        <div className="quest">
          {QUEST_LOG.map((q, i) => (
            <div className={`qnode ${q.status}`} key={i}>
              <p className="yr">{q.year}</p>
              <h3>{q.title}</h3>
              <p>{q.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}