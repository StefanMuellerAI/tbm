import type { Metadata } from "next";
import LegalShell from "../_components/LegalShell";

export const metadata: Metadata = {
  title: "Impressum – TBM-Rechner",
  description: "Impressum und Anbieterkennzeichnung des TBM-Rechners.",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalShell eyebrow="Rechtliche Hinweise" title="Impressum">
      <p>
        Stefan Müller
        <br />
        StefanAI – Research &amp; Development
        <br />
        Graeffstr. 22
        <br />
        50823 Köln
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 0221/5702984
        <br />
        E-Mail:{" "}
        <a href="mailto:info@stefanai.de">info@stefanai.de</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        DE347707954
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Stefan Müller
        <br />
        Graeffstr. 22
        <br />
        50823 Köln
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
        (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Hinweis zu diesem Webrechner</h2>
      <p>
        Der TBM-Rechner ist ein kostenloses Tool zur Schätzung von Tokenbudgets
        nach dem in iX 6/2026 veröffentlichten Tokenbudget-Modell. Die Berechnung
        ist eine Heuristik und stellt keine verbindliche Kostenzusage dar.
      </p>
    </LegalShell>
  );
}
