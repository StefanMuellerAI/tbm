# TBM-Rechner

Webrechner für das **Tokenbudget-Modell (TBM)** von Stefan Müller, veröffentlicht in **iX 6/2026**.

Das TBM schätzt die Kosten von Vibe-Coding-Projekten, indem es Projektparameter (Komplexität, Integrationen, Qualität, Legacy-Anteil, Modellqualität) in ein Tokenbudget übersetzt.

## Formel

```
Tokenbudget = T₀ × (M × F(I) × Q × Δ × L)^B × K × Rework(p)
F(I)        = 1 + 0,10 × I
Rework(p)   = 10^(4 × (1 − p))
```

## Tech-Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript + [Tailwind CSS v4](https://tailwindcss.com/)
- [@vercel/analytics](https://vercel.com/docs/analytics) für Besucherzählung
- [@vercel/speed-insights](https://vercel.com/docs/speed-insights) für Performance-Metriken

## Entwicklung

```bash
npm install
npm run dev
```

App läuft auf [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed via [Vercel](https://vercel.com). Analytics & Speed Insights sind direkt in der App eingebunden – nach dem ersten Deployment sind die Zahlen im Vercel-Dashboard sichtbar.

## Lizenz

© 2026 Stefan Müller · [stefanai.de](https://stefanai.de)
