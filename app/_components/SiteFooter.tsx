import Link from "next/link";

export default function SiteFooter() {
  return (
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
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/impressum"
            className="hover:text-foreground transition"
          >
            Impressum
          </Link>
          <span className="text-foreground-muted/40">·</span>
          <Link
            href="/datenschutz"
            className="hover:text-foreground transition"
          >
            Datenschutz
          </Link>
          <span className="text-foreground-muted/40">·</span>
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
        </nav>
      </div>
    </footer>
  );
}
