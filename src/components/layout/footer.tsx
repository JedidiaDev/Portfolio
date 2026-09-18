"use client";


export default function Footer({
  fxOn,
  onToggleFx,
}: {
  fxOn: boolean;
  onToggleFx: () => void;
}) {
  return (
    <footer className="site-footer">
      <div className="wrap" style={{ paddingTop: 48, paddingBottom: 16 }}>
        <h2 className="t-sm" style={{ color: "var(--ochre)" }}>
          PLAYER STATUS
        </h2>
        <table className="status-table">
          <tbody>
            <tr>
              <th>STACK PRINCIPALE</th>
              <td>SPRING BOOT · LARAVEL · REACT / NEXT.JS</td>
            </tr>
            <tr>
              <th>RÔLE ACTUEL</th>
              <td>CTO @ AFROZA EDITOR</td>
            </tr>
            <tr>
              <th>BASE</th>
              <td>YAOUNDÉ, CAMEROUN</td>
            </tr>
            <tr>
              <th>FORMATION</th>
              <td>LICENCE SÉCURITÉ INFORMATIQUE — UNIV. YAOUNDÉ I</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="foot-bar">
        <span className="t-xs">© 2026 JEDIDIA KAMDEM SOUOP</span>
        <button type="button" className="fx-toggle" onClick={onToggleFx}>
          {fxOn ? "DÉSACTIVER LES EFFETS" : "ACTIVER LES EFFETS"}
        </button>
      </div>
    </footer>
  );
}