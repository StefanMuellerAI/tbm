import Calculator from "./_components/Calculator";

export default function Home() {
  return (
    <main className="bg-hero-gradient min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet grid place-items-center text-white font-extrabold shadow-lg shadow-accent-pink/30">
              T
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-foreground">TBM-Rechner</div>
              <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
                Tokenbudget-Modell
              </div>
            </div>
          </div>
          <a
            href="https://stefanai.de"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent-blue hover:bg-accent-blue/90 transition px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-blue/30"
          >
            stefanai.de
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13L13 7" />
              <path d="M8 7h5v5" />
            </svg>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-xs font-medium text-foreground-muted">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-pink animate-pulse" />
          iX 6/2026 · Stefan Müller
        </div>
        <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] uppercase">
          Wie teuer wird Ihr{" "}
          <span className="text-gradient-pink">Vibe-Coding-</span>
          Projekt?
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-foreground-muted leading-relaxed">
          Das Tokenbudget-Modell (TBM) übersetzt Projektparameter wie Komplexität,
          Integrationen und Legacy-Anteil in eine belastbare Kostenobergrenze für
          KI-generierten Code. Die Formel macht den oft unterschätzten Einfluss der
          Modellqualität sichtbar.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm font-mono text-foreground-muted overflow-x-auto">
          <span className="text-accent-pink">Tokenbudget</span>
          <span>=</span>
          <span>T₀</span>
          <span>×</span>
          <span>(M × F(I) × Q × Δ × L)</span>
          <sup className="text-accent-violet">B</sup>
          <span>×</span>
          <span>K</span>
          <span>×</span>
          <span className="text-accent-yellow">Rework(p)</span>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 max-w-7xl mx-auto w-full">
        <Calculator />
      </section>

      {/* Info section */}
      <section className="px-6 sm:px-10 lg:px-16 pb-20 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard
            title="Modellqualität dominiert"
            accent="from-accent-pink to-accent-violet"
          >
            Schwächere Modelle produzieren nicht einfach mehr fehlerhaften Code –
            sie erzeugen Kaskaden. Rework wächst logarithmisch und kippt jenseits
            von p ≈ 0,50 die Wirtschaftlichkeit.
          </InfoCard>
          <InfoCard
            title="Feedback-Loops zählen"
            accent="from-accent-blue to-accent-cyan"
          >
            Schnelle CI/CD, gute Tests und klare Schnittstellen senken den
            Eskalationsfaktor B. Maschinen sind exzellente flexible Generalisten –
            solange Iterationen nicht eskalieren.
          </InfoCard>
          <InfoCard
            title="Hybrid in regulierten Welten"
            accent="from-accent-yellow to-accent-pink"
          >
            Mit Open-Source-Pflicht steigen Tokenbudgets drastisch. Lokale Modelle
            für unkritische Module, manuelle Entwicklung für sicherheitsrelevante
            Komponenten – oft die wirtschaftlich überlegene Strategie.
          </InfoCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 px-6 sm:px-10 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
          <div>
            TBM-Rechner ·{" "}
            <a
              href="https://stefanai.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent-pink transition"
            >
              StefanAI Solutions
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/StefanMuellerAI/tbm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition"
            >
              GitHub
            </a>
            <span className="text-foreground-muted/40">·</span>
            <span>Modell aus iX 6/2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-6 hover:ring-white/20 transition">
      <div
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${accent} text-white text-sm font-bold mb-4`}
      >
        ✦
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{children}</p>
    </div>
  );
}
