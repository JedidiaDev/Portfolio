"use client";

import { useId, useState } from "react";

/* ==========================================================================
   Sélecteur de montant + identité du donateur.
   `customer_name` et `customer_email` sont requis par l'API SasPay : sans
   eux la session de checkout est refusée, d'où les deux champs ici.
   La clé secrète vit uniquement dans /api/soutien, côté serveur.
   ========================================================================== */

const PRESETS = [
  { label: "1 PIÈCE", amount: 1000 },
  { label: "5 PIÈCES", amount: 5000 },
  { label: "10 PIÈCES", amount: 10000 },
];

// Plancher appliqué par SasPay — vérifié contre leur API.
const MIN_AMOUNT = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"amount" | "name" | "email", string>>;

export function SaspayDonationForm() {
  const uid = useId();
  const [amount, setAmount] = useState(1000);
  const [useCustom, setUseCustom] = useState(false);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState<string | null>(null);

  const finalAmount = useCustom ? Number(custom) : amount;

  function validate(): Errors {
    const next: Errors = {};
    if (!Number.isFinite(finalAmount) || finalAmount < MIN_AMOUNT) {
      next.amount = `MONTANT MINIMUM : ${MIN_AMOUNT} XAF`;
    } else if (!Number.isInteger(finalAmount)) {
      next.amount = "MONTANT EN XAF ENTIERS";
    }
    if (name.trim().length < 2) next.name = "INDIQUE UN NOM";
    if (!EMAIL_RE.test(email.trim())) next.email = "EMAIL INVALIDE — VÉRIFIE LE @";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailure(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/soutien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue.");

      // Redirection vers la page de paiement hébergée SasPay. On ne remet
      // pas `loading` à false : l'onglet part, garder le bouton désactivé
      // évite un double clic pendant la navigation.
      window.location.href = data.url;
    } catch (err) {
      setFailure(
        err instanceof Error ? err.message : "Une erreur est survenue.",
      );
      setLoading(false);
    }
  }

  return (
    <form className="coin-select" onSubmit={handleSubmit} noValidate>
      <fieldset className="coin-fieldset" disabled={loading}>
        <legend className="field-legend">CHOISIS TON MONTANT</legend>

        <div className="coin-row" role="group" aria-label="Montant du don">
          {PRESETS.map((p) => {
            const on = !useCustom && amount === p.amount;
            return (
              <button
                key={p.amount}
                type="button"
                aria-pressed={on}
                className={`coin-btn px${on ? " on" : ""}`}
                onClick={() => {
                  setUseCustom(false);
                  setAmount(p.amount);
                  setErrors((s) => ({ ...s, amount: undefined }));
                  setFailure(null);
                }}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use href="#i-coin" />
                </svg>
                <span>{p.label}</span>
                <span className="coin-amount">
                  {p.amount.toLocaleString("fr-FR")} XAF
                </span>
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={useCustom}
            className={`coin-btn px${useCustom ? " on" : ""}`}
            onClick={() => {
              setUseCustom(true);
              setErrors((s) => ({ ...s, amount: undefined }));
              setFailure(null);
            }}
          >
            <svg width="16" height="16" aria-hidden="true">
              <use href="#i-coin" />
            </svg>
            <span>MONTANT</span>
            <span className="coin-amount">LIBRE</span>
          </button>
        </div>

        {useCustom && (
          <div className={`field${errors.amount ? " error" : ""}`} style={{ marginTop: "var(--s2)" }}>
            <label htmlFor={`${uid}-amount`}>MONTANT (XAF)</label>
            <input
              id={`${uid}-amount`}
              type="number"
              inputMode="numeric"
              min={MIN_AMOUNT}
              step={100}
              value={custom}
              autoFocus
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? `${uid}-amount-err` : undefined}
              onChange={(e) => {
                setCustom(e.target.value);
                setErrors((s) => ({ ...s, amount: undefined }));
              }}
              placeholder="ex : 2500"
            />
          </div>
        )}
        {errors.amount && (
          <p className="field-error" id={`${uid}-amount-err`}>
            {errors.amount}
          </p>
        )}

        <div className="coin-identity">
          <div className={`field${errors.name ? " error" : ""}`}>
            <label htmlFor={`${uid}-name`}>TON NOM</label>
            <input
              id={`${uid}-name`}
              type="text"
              autoComplete="name"
              maxLength={80}
              value={name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((s) => ({ ...s, name: undefined }));
              }}
            />
            {errors.name && (
              <p className="field-error" id={`${uid}-name-err`}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={`field${errors.email ? " error" : ""}`}>
            <label htmlFor={`${uid}-email`}>TON EMAIL</label>
            <input
              id={`${uid}-email`}
              type="email"
              autoComplete="email"
              maxLength={120}
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={`${uid}-email-hint${errors.email ? ` ${uid}-email-err` : ""}`}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((s) => ({ ...s, email: undefined }));
              }}
            />
            {errors.email && (
              <p className="field-error" id={`${uid}-email-err`}>
                {errors.email}
              </p>
            )}
            <p className="field-hint" id={`${uid}-email-hint`}>
              Requis par SasPay pour t&apos;envoyer ton reçu.
            </p>
          </div>
        </div>

        <p className="form-feedback" role="status" aria-live="polite">
          {failure}
        </p>

        <button type="submit" className="btn gold full" style={{ marginTop: "var(--s2)" }}>
          {loading ? (
            <>
              <span className="spinner-px" aria-hidden="true" />
              REDIRECTION...
            </>
          ) : (
            <>
              INSÉRER {finalAmount > 0 && Number.isFinite(finalAmount)
                ? `${finalAmount.toLocaleString("fr-FR")} XAF`
                : "LA PIÈCE"}
            </>
          )}
        </button>

        <p className="field-hint" style={{ textAlign: "center" }}>
          Paiement sécurisé sur SasPay — tu quittes ce site.
        </p>
      </fieldset>
    </form>
  );
}
