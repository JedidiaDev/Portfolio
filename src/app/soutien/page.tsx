import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SaspayDonationForm } from "@/components/common/SaspayDonationForm";
import { HAS_BINANCE_QR } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Insert coin",
  description:
    "Soutenir le travail de Jedidia Kamdem Souop : mobile money (Orange, MTN) ou carte bancaire via SasPay, ou crypto via Binance Pay.",
  alternates: { canonical: "/soutien" },
};

const BINANCE_ID = "User-c6f3e801";

export default function Soutien() {
  return (
    <section id="soutien" className="scr-section scr-top">
      <div className="wrap">
        <Link href="/" className="back-link">
          <span className="glyph">←</span> MENU
        </Link>

        <h1 className="t-lg">INSERT COIN</h1>
        <p className="body section-lede">
          Ce site, mes projets personnels et mes participations aux hackathons
          prennent du temps en dehors de mon travail chez Afroza Editor. Si
          quelque chose ici t&apos;a été utile ou t&apos;a simplement plu, tu
          peux m&apos;aider à continuer.
        </p>

        <div className="support-grid">
          {/* Option principale — mobile money / carte, via SasPay.
              La clé API vit uniquement dans src/lib/saspay.ts, côté serveur
              (variable d'env SASPAY_API_KEY) — jamais dans le navigateur. */}
          <div className="support-primary px-thick">
            <span className="support-tag">RECOMMANDÉ</span>
            <div className="icon-row">
              <svg width="22" height="22" style={{ color: "var(--ochre)" }} aria-hidden="true">
                <use href="#i-coin" />
              </svg>
              <h2 className="t-md">MOBILE MONEY &amp; CARTE</h2>
            </div>
            <p className="body">
              Orange Money, MTN Mobile Money ou carte bancaire, via SasPay.
              Choisis un montant, tu es redirigé vers leur page de paiement
              sécurisée.
            </p>
            <SaspayDonationForm />
          </div>

          {/* Option secondaire — crypto, pour ceux qui préfèrent cette voie */}
          <div className="support-primary px">
            <div className="icon-row">
              <svg width="22" height="22" style={{ color: "var(--ochre)" }} aria-hidden="true">
                <use href="#i-key" />
              </svg>
              <h2 className="t-md">CRYPTO — BINANCE PAY</h2>
            </div>
            <p className="body">
              Don en crypto, sans frais, si tu préfères cette voie. Ouvre
              l&apos;app Binance, puis Pay → Envoyer.
            </p>

            {/* Le QR n'est rendu que si le fichier existe : dépose
                public/images/binance-pay-qr.png et il réapparaît. */}
            {HAS_BINANCE_QR && (
              <div className="qr-slot">
                <Image
                  src="/images/binance-pay-qr.png"
                  alt="QR code Binance Pay de Jedidia Kamdem Souop"
                  width={220}
                  height={220}
                />
              </div>
            )}

            <p className="field-hint">IDENTIFIANT BINANCE PAY</p>
            <div className="id-slot">{BINANCE_ID}</div>
          </div>
        </div>

        <p className="t-xs support-note">
          Le compteur est encore à 0 — tu peux être le premier.
        </p>
      </div>
    </section>
  );
}
