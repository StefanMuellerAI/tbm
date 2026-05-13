"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_FACTORS,
  CategoryKey,
  DELTA_FACTORS,
  DeltaKey,
  DEFAULT_INPUT,
  ESCALATION_FACTORS,
  EscalationKey,
  LEGACY_FACTORS,
  LegacyKey,
  MODEL_PRESETS,
  ModelPreset,
  QUALITY_FACTORS,
  QualityKey,
  TbmInput,
  calculateTbm,
} from "@/lib/tbm";

const numberFormatDe = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
});

const numberFormatDeDecimal = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
});

const currencyFormatUsd = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currencyFormatEur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000_000) {
    return `${numberFormatDeDecimal.format(tokens / 1_000_000_000)} Mrd.`;
  }
  if (tokens >= 1_000_000) {
    return `${numberFormatDeDecimal.format(tokens / 1_000_000)} Mio.`;
  }
  if (tokens >= 1_000) {
    return `${numberFormatDe.format(tokens / 1_000)}k`;
  }
  return numberFormatDe.format(tokens);
}

const RECOMMENDATION_STYLES = {
  good: {
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
    dot: "bg-emerald-400",
  },
  caution: {
    badge: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
    dot: "bg-amber-300",
  },
  boundary: {
    badge: "bg-orange-500/15 text-orange-200 ring-orange-400/30",
    dot: "bg-orange-400",
  },
  abort: {
    badge: "bg-rose-500/15 text-rose-200 ring-rose-400/30",
    dot: "bg-rose-400",
  },
} as const;

export default function Calculator() {
  const [modelId, setModelId] = useState<ModelPreset["id"]>("opus");
  const [input, setInput] = useState<TbmInput>(DEFAULT_INPUT);

  const result = useMemo(() => calculateTbm(input), [input]);

  const handleModelChange = (id: string) => {
    setModelId(id);
    const preset = MODEL_PRESETS.find((m) => m.id === id);
    if (!preset || preset.id === "custom") return;
    setInput((prev) => ({
      ...prev,
      p: preset.p,
      pricePerMTok: preset.pricePerMTok,
    }));
  };

  const recStyle = RECOMMENDATION_STYLES[result.recommendation.level];

  return (
    <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
      {/* PARAMETER */}
      <section className="lg:col-span-3 rounded-3xl bg-card text-card-foreground p-6 sm:p-8 card-glow">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent-pink" />
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-accent-magenta">
            Projekt-Parameter
          </h2>
        </div>

        {/* Grundlagen */}
        <GroupHeading number="01">Grundlagen</GroupHeading>
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <NumberField
            label="T₀ – Basistoken"
            hint="Standard: 60.000 (Bugfix 30k · komplex 120k)"
            value={input.T0}
            min={1_000}
            max={500_000}
            step={1_000}
            onChange={(v) => setInput({ ...input, T0: v })}
          />
          <NumberField
            label="M – Projektgröße"
            hint="Mini 5 · Service 60 · Komponente 120"
            value={input.M}
            min={1}
            max={500}
            step={1}
            onChange={(v) => setInput({ ...input, M: v })}
          />
        </div>

        {/* Komplexität */}
        <GroupHeading number="02">Komplexität</GroupHeading>
        <div className="grid sm:grid-cols-2 gap-5 mb-2">
          <SliderField
            label={`I – Integrationen: ${input.I}`}
            hint={`Aufschlag F(I) = ${(1 + 0.1 * input.I).toFixed(2)}× (+${(input.I * 10)}%)`}
            value={input.I}
            min={0}
            max={20}
            step={1}
            onChange={(v) => setInput({ ...input, I: v })}
          />
          <SelectField<QualityKey>
            label="Q – Qualität"
            value={input.Q}
            options={Object.entries(QUALITY_FACTORS).map(([key, { value, label }]) => ({
              value: key as QualityKey,
              label: `${label} (${value.toFixed(1)}×)`,
            }))}
            onChange={(v) => setInput({ ...input, Q: v })}
          />
          <SelectField<DeltaKey>
            label="Δ – Änderungsdynamik"
            value={input.delta}
            options={Object.entries(DELTA_FACTORS).map(([key, { value, label }]) => ({
              value: key as DeltaKey,
              label: `${label} (${value.toFixed(1)}×)`,
            }))}
            onChange={(v) => setInput({ ...input, delta: v })}
          />
          <SelectField<LegacyKey>
            label="L – Legacy-Anteil"
            value={input.L}
            options={Object.entries(LEGACY_FACTORS).map(([key, { value, label }]) => ({
              value: key as LegacyKey,
              label: `${label} (${value.toFixed(1)}×)`,
            }))}
            onChange={(v) => setInput({ ...input, L: v })}
          />
        </div>
        <div className="mt-1 mb-8 rounded-xl bg-card-foreground/[0.03] px-4 py-3 text-sm text-card-foreground/70">
          <span className="font-semibold text-card-foreground">
            Komplexitätsindex C ={" "}
            <span className="text-accent-magenta">
              {numberFormatDeDecimal.format(result.C)}
            </span>
          </span>{" "}
          · M × F(I) × Q × Δ × L
        </div>

        {/* Kontext */}
        <GroupHeading number="03">Kontext</GroupHeading>
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <SelectField<EscalationKey>
            label="B – Eskalationsexponent"
            value={input.B}
            options={Object.entries(ESCALATION_FACTORS).map(([key, { value, label }]) => ({
              value: key as EscalationKey,
              label: `${label} (${value.toFixed(2)})`,
            }))}
            onChange={(v) => setInput({ ...input, B: v })}
          />
          <SelectField<CategoryKey>
            label="K – Kategorie"
            value={input.K}
            options={Object.entries(CATEGORY_FACTORS).map(([key, { value, label }]) => ({
              value: key as CategoryKey,
              label: `${label} (${value.toFixed(1)}×)`,
            }))}
            onChange={(v) => setInput({ ...input, K: v })}
          />
        </div>

        {/* Modell */}
        <GroupHeading number="04">Modell &amp; Preis</GroupHeading>
        <div className="mb-4">
          <label className="block text-sm font-medium text-card-foreground/80 mb-2">
            KI-Modell
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {MODEL_PRESETS.map((preset) => {
              const active = modelId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleModelChange(preset.id)}
                  className={[
                    "text-left rounded-xl px-4 py-3 ring-1 transition-all",
                    active
                      ? "bg-gradient-to-r from-accent-pink to-accent-violet text-white ring-transparent shadow-lg shadow-accent-pink/30"
                      : "bg-card-foreground/[0.03] ring-card-foreground/10 hover:ring-accent-magenta/40 hover:bg-card-foreground/[0.06]",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold leading-tight">
                    {preset.label}
                  </div>
                  <div
                    className={[
                      "text-xs mt-1",
                      active ? "text-white/90" : "text-card-foreground/60",
                    ].join(" ")}
                  >
                    p={preset.p.toFixed(2)} · ${preset.pricePerMTok}/MTok · {preset.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-4">
          <SliderField
            label={`p – Modellqualität: ${input.p.toFixed(2)}`}
            hint={`SWE-bench Verified · Rework ${result.rework < 10 ? result.rework.toFixed(1) : numberFormatDe.format(Math.round(result.rework))}×`}
            value={input.p}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) =>
              setInput((prev) => {
                setModelId("custom");
                return { ...prev, p: v };
              })
            }
          />
          <NumberField
            label="Preis $/Mio. Token"
            hint="Output-Preis (konservativ)"
            value={input.pricePerMTok}
            min={0}
            max={100}
            step={0.1}
            onChange={(v) =>
              setInput((prev) => {
                setModelId("custom");
                return { ...prev, pricePerMTok: v };
              })
            }
          />
          <NumberField
            label="USD → EUR Kurs"
            hint="Aktueller Wechselkurs"
            value={input.usdToEur}
            min={0.5}
            max={1.5}
            step={0.01}
            onChange={(v) => setInput({ ...input, usdToEur: v })}
          />
        </div>
      </section>

      {/* ERGEBNIS */}
      <section className="lg:col-span-2 flex flex-col gap-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#0d0d3e] via-[#1a0f4a] to-[#3d0a3a] p-6 sm:p-8 ring-1 ring-white/10 card-glow">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent-yellow" />
            <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-accent-yellow">
              Tokenbudget
            </h2>
          </div>

          <div className="mt-4">
            <div className="text-sm text-foreground-muted">Erwartetes Tokenbudget</div>
            <div className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gradient-pink leading-none mt-2">
              {formatTokens(result.tokens)}
            </div>
            <div className="text-xs text-foreground-muted mt-2">
              ≈ {numberFormatDe.format(result.tokens)} Tokens (Output)
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
                Kosten USD
              </div>
              <div className="text-2xl font-bold text-white mt-1">
                {currencyFormatUsd.format(result.costUsd)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
                Kosten EUR
              </div>
              <div className="text-2xl font-bold text-white mt-1">
                {currencyFormatEur.format(result.costEur)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
                Komplexität C
              </div>
              <div className="text-xl font-bold text-white mt-1">
                {numberFormatDeDecimal.format(result.C)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-foreground-muted">
                Rework-Faktor
              </div>
              <div className="text-xl font-bold text-white mt-1">
                {result.rework < 10
                  ? `${result.rework.toFixed(1)}×`
                  : `${numberFormatDe.format(Math.round(result.rework))}×`}
              </div>
            </div>
          </div>
        </div>

        <div
          className={[
            "rounded-3xl p-6 sm:p-7 ring-1 backdrop-blur-sm",
            "bg-white/[0.03]",
            recStyle.badge.replace("bg-", "ring-").replace("/15", "/30"),
          ].join(" ")}
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-2 w-2 rounded-full ${recStyle.dot} animate-pulse`}
            />
            <div
              className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${recStyle.badge}`}
            >
              Empfehlung
            </div>
          </div>
          <div className="mt-3 text-xl font-bold text-foreground leading-snug">
            {result.recommendation.label}
          </div>
          <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
            {result.recommendation.description}
          </p>
        </div>
      </section>
    </div>
  );
}

function GroupHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-2 mb-3">
      <span className="font-mono text-[11px] text-card-foreground/40">{number}</span>
      <h3 className="text-base font-bold text-card-foreground">{children}</h3>
    </div>
  );
}

function NumberField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-card-foreground/80 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl bg-card-foreground/[0.04] ring-1 ring-card-foreground/10 focus:ring-2 focus:ring-accent-magenta focus:bg-card-foreground/[0.06] px-4 py-2.5 text-card-foreground font-semibold tabular-nums outline-none transition"
      />
      {hint ? (
        <div className="mt-1.5 text-xs text-card-foreground/55">{hint}</div>
      ) : null}
    </div>
  );
}

function SliderField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-card-foreground/80 mb-3">
        {label}
      </label>
      <input
        type="range"
        className="tbm-slider w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint ? (
        <div className="mt-2 text-xs text-card-foreground/55">{hint}</div>
      ) : null}
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-card-foreground/80 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="appearance-none w-full rounded-xl bg-card-foreground/[0.04] ring-1 ring-card-foreground/10 focus:ring-2 focus:ring-accent-magenta focus:bg-card-foreground/[0.06] px-4 py-2.5 pr-10 text-card-foreground font-semibold outline-none transition cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-card-foreground/50"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
