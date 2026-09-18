import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, type Project } from "@/data/projects";

// Dérivé de Project["status"] plutôt qu'importé séparément : fonctionne
// même si data/projects.ts n'exporte pas son propre type ProjectStatus.
type ProjectStatus = Project["status"];

// Libellé long du badge d'en-tête — distinct du libellé court utilisé dans
// la grille (statusLabel : "LIVE", "48H"...). Correspond au texte exact de
// la maquette pour "live" ("EN PRODUCTION").
const STATUS_BADGE: Record<ProjectStatus, string> = {
  live: "EN PRODUCTION",
  mvp: "MVP",
  rnd: "EN R&D",
  wip: "EN COURS",
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <section className="scr-section scr-full scr-top">
      <div className="wrap">
        <Link href="/projects" className="back-link">
          ← STAGE SELECT
        </Link>

        <div className="detail px-thick">
          <div className="dh">
            <span className="t">
              {project.no} — {project.title}
            </span>
            <span className={`status-badge ${project.status}`}>
              ● {STATUS_BADGE[project.status]}
            </span>
          </div>
          <div className="db">
            <div className="dblock">
              <h4>CONTEXTE</h4>
              <p>{project.context}</p>
            </div>
            <div className="dblock">
              <h4>MON RÔLE</h4>
              <p>{project.role}</p>
            </div>
            <div className="dblock" style={{ gridColumn: "1 / -1" }}>
              <h4>ARCHITECTURE</h4>
              <pre className="archi">{project.architecture}</pre>
            </div>
            <div className="dblock">
              <h4>RÉSULTAT</h4>
              <p>{project.result}</p>
            </div>
            <div className="dblock detail-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="btn sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  VOIR LE SITE
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  className="btn sm ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  CODE
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}