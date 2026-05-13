import Link from "next/link";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function LegalShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-hero-gradient min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-8 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-xs font-medium text-foreground-muted">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-pink animate-pulse" />
          {eyebrow}
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] uppercase text-foreground">
          {title}
        </h1>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 16l-5-6 5-6" />
            </svg>
            Zurück zum Rechner
          </Link>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 pb-20 max-w-4xl mx-auto w-full">
        <article className="rounded-3xl bg-card text-card-foreground p-6 sm:p-10 card-glow legal-prose">
          {children}
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
