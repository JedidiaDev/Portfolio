import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, type Project } from "@/data/projects";

// Dérivé de Project["status"] plutôt qu'importé séparément : fonctionne
// même si data/projects.ts n'exporte pas son propre type ProjectStatus.
type ProjectStatus = Project["status"];

// Libellé long du badge d'en-tête — distinct du libellé court utilisé dans
// la grille (statusLabel : "LIVE", "48H"...).
const STATUS_BADGE: Record<ProjectStatus, string> = {
  live: "EN PRODUCTION",
  mvp: "MVP",
  rnd: "EN R&D",
  wip: "EN COURS",
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: project.title,
    description: project.desc,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: { title: project.title, description: project.desc },
  };
}

export default async function ProjectDetail({
  params,
}: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const index = PROJECTS.findIndex((p) => p.id === id);
  if (index < 0) notFound();

  const project = PROJECTS[index];
  // Parcours circulaire : depuis le dernier stage on revient au premier,
  // plutôt que de tomber sur un bouton mort.
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <section className="scr-section scr-top">
      <div className="wrap">
        <Link href="/projects" className="back-link">
          <span className="glyph">←</span> STAGE SELECT
        </Link>

        <article className="detail px-thick">
          <div className="dh">
            <h1 className="t">
              {project.no} — {project.title}
            </h1>
            <span className={`status-badge ${project.status}`}>
              <span className="glyph" aria-hidden="true">● </span>
              {STATUS_BADGE[project.status]}
            </span>
          </div>

          <div className="db">
            <div className="dblock">
              <h2>CONTEXTE</h2>
              <p>{project.context}</p>
            </div>
            <div className="dblock">
              <h2>MON RÔLE</h2>
              <p>{project.role}</p>
            </div>
            <div className="dblock dblock-wide">
              <h2>ARCHITECTURE</h2>
              {/* tabIndex : un bloc qui défile horizontalement doit pouvoir
                  être atteint et défilé au clavier. */}
              <pre className="archi" tabIndex={0} role="img" aria-label={`Schéma d'architecture de ${project.title}`}>
                {project.architecture}
              </pre>
            </div>
            <div className="dblock">
              <h2>RÉSULTAT</h2>
              <p>{project.result}</p>
            </div>
            <div className="dblock detail-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="btn sm"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  VOIR LE SITE
                  <span className="ext-mark" aria-hidden="true">↗</span>
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  className="btn sm ghost"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  CODE
                  <span className="ext-mark" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </article>

        {/* Passer au stage suivant sans repasser par la grille. */}
        <nav className="stage-pager" aria-label="Autres projets">
          <Link href={`/projects/${previous.id}`} className="pager-link">
            <span className="pager-dir">
              <span className="glyph">◂</span> PRÉCÉDENT
            </span>
            <span className="pager-title">{previous.title}</span>
          </Link>
          <Link href={`/projects/${next.id}`} className="pager-link right">
            <span className="pager-dir">
              SUIVANT <span className="glyph">▸</span>
            </span>
            <span className="pager-title">{next.title}</span>
          </Link>
        </nav>
      </div>
    </section>
  );
}
