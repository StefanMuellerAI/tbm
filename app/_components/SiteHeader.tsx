import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet grid place-items-center text-white font-extrabold shadow-lg shadow-accent-pink/30 transition group-hover:scale-105">
            T
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-foreground">TBM-Rechner</div>
            <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
              Tokenbudget-Modell
            </div>
          </div>
        </Link>
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
  );
}
