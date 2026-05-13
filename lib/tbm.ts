/**
 * Tokenbudget-Modell (TBM) – Berechnungslogik
 *
 * Formel:
 *   Tokenbudget = T0 × (M × F(I) × Q × Δ × L)^B × K_level × Rework(p)
 *   F(I)        = 1 + 0,10 × I
 *   Rework(p)   = 10^(4 × (1 − p))
 *
 * Modell entwickelt von Stefan Müller, veröffentlicht in iX 6/2026.
 */

export type QualityKey = "prototype" | "production" | "regulated";
export type DeltaKey = "stable" | "medium" | "volatile";
export type LegacyKey = "greenfield" | "mixed" | "brownfield";
export type CategoryKey = "hobby" | "training" | "professional" | "industrial";
export type EscalationKey = "good_ci" | "realistic" | "weak_qa";

export const QUALITY_FACTORS: Record<QualityKey, { value: number; label: string }> = {
  prototype: { value: 1.0, label: "Prototyp" },
  production: { value: 1.3, label: "Produktion" },
  regulated: { value: 1.8, label: "Reguliert" },
};

export const DELTA_FACTORS: Record<DeltaKey, { value: number; label: string }> = {
  stable: { value: 1.0, label: "Stabil" },
  medium: { value: 1.2, label: "Mittel" },
  volatile: { value: 1.5, label: "Volatil" },
};

export const LEGACY_FACTORS: Record<LegacyKey, { value: number; label: string }> = {
  greenfield: { value: 1.0, label: "Greenfield" },
  mixed: { value: 1.2, label: "Gemischt" },
  brownfield: { value: 1.4, label: "Brownfield" },
};

export const CATEGORY_FACTORS: Record<CategoryKey, { value: number; label: string }> = {
  hobby: { value: 0.8, label: "Hobby" },
  training: { value: 1.0, label: "Ausbildung" },
  professional: { value: 1.4, label: "Professionell" },
  industrial: { value: 2.0, label: "Industrietauglich" },
};

export const ESCALATION_FACTORS: Record<
  EscalationKey,
  { value: number; label: string }
> = {
  good_ci: { value: 1.05, label: "Gute CI/CD" },
  realistic: { value: 1.10, label: "Realistisch" },
  weak_qa: { value: 1.20, label: "Schwache QA" },
};

export type ModelPreset = {
  id: string;
  label: string;
  p: number;
  pricePerMTok: number;
  hint: string;
};

export const MODEL_PRESETS: ModelPreset[] = [
  {
    id: "opus",
    label: "Claude Opus 4.6 (proprietär top)",
    p: 0.80,
    pricePerMTok: 25,
    hint: "Rework ≈ 6×",
  },
  {
    id: "gpt",
    label: "GPT-5.3 Codex (proprietär top)",
    p: 0.80,
    pricePerMTok: 14,
    hint: "Rework ≈ 6×",
  },
  {
    id: "proprietary_mid",
    label: "Proprietär mittel",
    p: 0.75,
    pricePerMTok: 14,
    hint: "Rework ≈ 10×",
  },
  {
    id: "oss_strong",
    label: "Open Source stark",
    p: 0.60,
    pricePerMTok: 2,
    hint: "Rework ≈ 40×",
  },
  {
    id: "oss_mid",
    label: "Open Source mittel",
    p: 0.45,
    pricePerMTok: 0.5,
    hint: "Rework ≈ 200×",
  },
  {
    id: "oss_weak",
    label: "Open Source schwach",
    p: 0.20,
    pricePerMTok: 0.1,
    hint: "Rework ≈ 1.600×",
  },
  {
    id: "custom",
    label: "Eigene Werte",
    p: 0.80,
    pricePerMTok: 25,
    hint: "Frei konfigurierbar",
  },
];

export type TbmInput = {
  T0: number;
  M: number;
  I: number;
  Q: QualityKey;
  delta: DeltaKey;
  L: LegacyKey;
  B: EscalationKey;
  K: CategoryKey;
  p: number;
  pricePerMTok: number;
  usdToEur: number;
};

export type TbmResult = {
  fI: number;
  C: number;
  rework: number;
  tokens: number;
  tokensMillion: number;
  costUsd: number;
  costEur: number;
  recommendation: {
    level: "good" | "caution" | "boundary" | "abort";
    label: string;
    description: string;
  };
};

export function reworkFactor(p: number): number {
  const clamped = Math.max(0, Math.min(1, p));
  return Math.pow(10, 4 * (1 - clamped));
}

export function complexity(input: Pick<TbmInput, "M" | "I" | "Q" | "delta" | "L">): number {
  const fI = 1 + 0.10 * input.I;
  return (
    input.M *
    fI *
    QUALITY_FACTORS[input.Q].value *
    DELTA_FACTORS[input.delta].value *
    LEGACY_FACTORS[input.L].value
  );
}

export function recommendationFor(p: number): TbmResult["recommendation"] {
  if (p >= 0.75) {
    return {
      level: "good",
      label: "Produktiver Einsatz empfohlen",
      description:
        "Modellqualität auf Top-Niveau. Rework bleibt überschaubar, Vibe Coding rechnet sich in vielen Szenarien.",
    };
  }
  if (p >= 0.55) {
    return {
      level: "caution",
      label: "Einsatz möglich – erhöhte Aufmerksamkeit",
      description:
        "Rework steigt deutlich. Strenge Reviews, automatisierte Qualitäts-Gates und enger Scope sind Pflicht.",
    };
  }
  if (p >= 0.45) {
    return {
      level: "boundary",
      label: "Grenzbereich – Modellwechsel prüfen",
      description:
        "Bei diesem Rework-Faktor ist klassische Entwicklung in den meisten Szenarien wirtschaftlich überlegen.",
    };
  }
  return {
    level: "abort",
    label: "Nicht wirtschaftlich – Abbruch empfohlen",
    description:
      "Fehlerkaskaden destabilisieren den Kontext und treiben das Tokenbudget exponentiell.",
  };
}

export function calculateTbm(input: TbmInput): TbmResult {
  const fI = 1 + 0.10 * input.I;
  const C = complexity(input);
  const rework = reworkFactor(input.p);
  const B = ESCALATION_FACTORS[input.B].value;
  const K = CATEGORY_FACTORS[input.K].value;

  const tokens = input.T0 * Math.pow(C, B) * K * rework;
  const tokensMillion = tokens / 1_000_000;
  const costUsd = tokensMillion * input.pricePerMTok;
  const costEur = costUsd * input.usdToEur;

  return {
    fI,
    C,
    rework,
    tokens,
    tokensMillion,
    costUsd,
    costEur,
    recommendation: recommendationFor(input.p),
  };
}

export const DEFAULT_INPUT: TbmInput = {
  T0: 60_000,
  M: 60,
  I: 6,
  Q: "production",
  delta: "medium",
  L: "mixed",
  B: "realistic",
  K: "professional",
  p: 0.80,
  pricePerMTok: 25,
  usdToEur: 0.92,
};
