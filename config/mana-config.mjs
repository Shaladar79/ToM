// config/mana-config.mjs
// Central source of truth for the mana system:
// - Types (Force/Base/Hybrid/Eldritch)
// - Combination maps
// - Calculation rules (locked)

// ------------------------------
// Type identifiers
// ------------------------------
export const ManaTier = Object.freeze({
  FORCE: "force",
  BASE: "base",
  HYBRID: "hybrid",
  ELDRITCH: "eldritch"
});

// ------------------------------
// Base mana types (locked)
// ------------------------------
export const BaseMana = Object.freeze({
  ENHANCEMENT: "enhancement",
  WIND: "wind",
  EARTH: "earth",
  ASTRAL: "astral",
  LIGHT: "light",
  WATER: "water",
  FIRE: "fire",
  SHADOW: "shadow",
  NATURE: "nature"
});

// Display names (player-facing)
export const ManaLabels = Object.freeze({
  // tiers
  [ManaTier.FORCE]: "Force",
  [ManaTier.BASE]: "Base",
  [ManaTier.HYBRID]: "Hybrid",
  [ManaTier.ELDRITCH]: "Eldritch",

  // base
  [BaseMana.ENHANCEMENT]: "Enhancement",
  [BaseMana.WIND]: "Wind",
  [BaseMana.EARTH]: "Earth",
  [BaseMana.ASTRAL]: "Astral",
  [BaseMana.LIGHT]: "Light",
  [BaseMana.WATER]: "Water",
  [BaseMana.FIRE]: "Fire",
  [BaseMana.SHADOW]: "Shadow",
  [BaseMana.NATURE]: "Nature"
});

// ------------------------------
// Attribute → Base mana mapping (locked)
// ------------------------------
// This is the mapping you chose:
// Might = Enhancement, Agility = Wind, Fortitude = Earth
// Focus = Astral, Insight = Light, Willpower = Water
// Presence = Fire, Manipulation = Shadow, Resolve = Nature
export const SubAttributeToBaseMana = Object.freeze({
  // Body
  might: BaseMana.ENHANCEMENT,
  agility: BaseMana.WIND,
  fortitude: BaseMana.EARTH,

  // Mind
  focus: BaseMana.ASTRAL,
  insight: BaseMana.LIGHT,
  willpower: BaseMana.WATER,

  // Soul
  presence: BaseMana.FIRE,
  manipulation: BaseMana.SHADOW,
  resolve: BaseMana.NATURE
});

// ------------------------------
// Hybrid mana types (locked)
// ------------------------------
export const HybridMana = Object.freeze({
  // Enhancement hybrids
  METAL: "metal",
  GALE: "gale",
  RADIANCE: "radiance",
  VOID: "void",
  INFERNO: "inferno",
  ARCANE: "arcane",
  DELUGE: "deluge",
  WILD: "wild",

  // Other hybrids
  SAND: "sand",
  GLASS: "glass",
  ICE: "ice",
  LIGHTNING: "lightning",
  TEMPEST: "tempest",

  CRYSTAL: "crystal",
  MUD: "mud",
  OBSIDIAN: "obsidian",
  GROWTH: "growth",

  LIFE: "life",
  DEATH: "death",
  DREAM: "dream",
  IGNITION: "ignition",
  PULSE: "pulse",

  RENEWAL: "renewal",
  RETRIBUTION: "retribution",
  JUDGEMENT: "judgement",
  HARMONY: "harmony",

  STEAM: "steam",
  POISON: "poison",
  REGROWTH: "regrowth",

  RUIN: "ruin",
  SURGE: "surge",
  BLIGHT: "blight"
});

export const HybridLabels = Object.freeze({
  [HybridMana.METAL]: "Metal",
  [HybridMana.GALE]: "Gale",
  [HybridMana.RADIANCE]: "Radiance",
  [HybridMana.VOID]: "Void",
  [HybridMana.INFERNO]: "Inferno",
  [HybridMana.ARCANE]: "Arcane",
  [HybridMana.DELUGE]: "Deluge",
  [HybridMana.WILD]: "Wild",

  [HybridMana.SAND]: "Sand",
  [HybridMana.GLASS]: "Glass",
  [HybridMana.ICE]: "Ice",
  [HybridMana.LIGHTNING]: "Lightning",
  [HybridMana.TEMPEST]: "Tempest",

  [HybridMana.CRYSTAL]: "Crystal",
  [HybridMana.MUD]: "Mud",
  [HybridMana.OBSIDIAN]: "Obsidian",
  [HybridMana.GROWTH]: "Growth",

  [HybridMana.LIFE]: "Life",
  [HybridMana.DEATH]: "Death",
  [HybridMana.DREAM]: "Dream",
  [HybridMana.IGNITION]: "Ignition",
  [HybridMana.PULSE]: "Pulse",

  [HybridMana.RENEWAL]: "Renewal",
  [HybridMana.RETRIBUTION]: "Retribution",
  [HybridMana.JUDGEMENT]: "Judgement",
  [HybridMana.HARMONY]: "Harmony",

  [HybridMana.STEAM]: "Steam",
  [HybridMana.POISON]: "Poison",
  [HybridMana.REGROWTH]: "Regrowth",

  [HybridMana.RUIN]: "Ruin",
  [HybridMana.SURGE]: "Surge",
  [HybridMana.BLIGHT]: "Blight"
});

// ------------------------------
// Eldritch mana types (locked)
// ------------------------------
export const EldritchMana = Object.freeze({
  // Crystal-derived
  RESONANCE: "resonance",
  OVERCHARGE: "overcharge",
  NULL: "null",

  // Mud-derived
  INERTIA: "inertia",
  QUAGMIRE: "quagmire",

  // Obsidian-derived
  DISJUNCTION: "disjunction",
  SEVERANCE: "severance",

  // Growth-derived
  OVERGROWTH: "overgrowth",

  // Steam-derived
  SUSPENSION: "suspension",

  // Poison-derived
  ENTROPY: "entropy",
  EXPOSURE: "exposure",
  CATALYST: "catalyst",
  CORROSION: "corrosion",
  NECROSIS: "necrosis",

  // Ignition-derived
  MANDATE: "mandate",
  RECURSION: "recursion",
  CASCADE: "cascade",

  // Retribution-derived
  REPRISAL: "reprisal",

  // Judgement-derived
  DECREE: "decree",
  SENTENCE: "sentence",
  INJUNCTION: "injunction",
  PRECEDENT: "precedent",
  SANCTION: "sanction",

  // Ruin-derived
  CATASTROPHE: "catastrophe",
  DEVASTATION: "devastation",
  SCOUR: "scour",

  // Blight-derived
  STERILITY: "sterility"
});

export const EldritchLabels = Object.freeze({
  [EldritchMana.RESONANCE]: "Resonance",
  [EldritchMana.OVERCHARGE]: "Overcharge",
  [EldritchMana.NULL]: "Null",

  [EldritchMana.INERTIA]: "Inertia",
  [EldritchMana.QUAGMIRE]: "Quagmire",

  [EldritchMana.DISJUNCTION]: "Disjunction",
  [EldritchMana.SEVERANCE]: "Severance",

  [EldritchMana.OVERGROWTH]: "Overgrowth",

  [EldritchMana.SUSPENSION]: "Suspension",

  [EldritchMana.ENTROPY]: "Entropy",
  [EldritchMana.EXPOSURE]: "Exposure",
  [EldritchMana.CATALYST]: "Catalyst",
  [EldritchMana.CORROSION]: "Corrosion",
  [EldritchMana.NECROSIS]: "Necrosis",

  [EldritchMana.MANDATE]: "Mandate",
  [EldritchMana.RECURSION]: "Recursion",
  [EldritchMana.CASCADE]: "Cascade",

  [EldritchMana.REPRISAL]: "Reprisal",

  [EldritchMana.DECREE]: "Decree",
  [EldritchMana.SENTENCE]: "Sentence",
  [EldritchMana.INJUNCTION]: "Injunction",
  [EldritchMana.PRECEDENT]: "Precedent",
  [EldritchMana.SANCTION]: "Sanction",

  [EldritchMana.CATASTROPHE]: "Catastrophe",
  [EldritchMana.DEVASTATION]: "Devastation",
  [EldritchMana.SCOUR]: "Scour",

  [EldritchMana.STERILITY]: "Sterility"
});

// ------------------------------
// Combination maps (locked)
// ------------------------------

// Helper to make order-independent keys for pair combinations.
function pairKey(a, b) {
  return [String(a), String(b)].sort().join("|");
}

/**
 * Base + Base -> Hybrid
 * Keys are order-independent.
 */
export const HybridCombos = Object.freeze({
  // Enhancement + X
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.EARTH)]: HybridMana.METAL,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.WIND)]: HybridMana.GALE,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.LIGHT)]: HybridMana.RADIANCE,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.SHADOW)]: HybridMana.VOID,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.FIRE)]: HybridMana.INFERNO,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.ASTRAL)]: HybridMana.ARCANE,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.WATER)]: HybridMana.DELUGE,
  [pairKey(BaseMana.ENHANCEMENT, BaseMana.NATURE)]: HybridMana.WILD,

  // Wind + X (excluding Enhancement already covered)
  [pairKey(BaseMana.WIND, BaseMana.EARTH)]: HybridMana.SAND,
  [pairKey(BaseMana.WIND, BaseMana.ASTRAL)]: HybridMana.GLASS,
  [pairKey(BaseMana.WIND, BaseMana.WATER)]: HybridMana.ICE,
  [pairKey(BaseMana.WIND, BaseMana.FIRE)]: HybridMana.LIGHTNING,
  [pairKey(BaseMana.WIND, BaseMana.NATURE)]: HybridMana.TEMPEST,

  // Earth + X
  [pairKey(BaseMana.EARTH, BaseMana.ASTRAL)]: HybridMana.CRYSTAL,
  [pairKey(BaseMana.EARTH, BaseMana.WATER)]: HybridMana.MUD,
  [pairKey(BaseMana.EARTH, BaseMana.SHADOW)]: HybridMana.OBSIDIAN,
  [pairKey(BaseMana.EARTH, BaseMana.NATURE)]: HybridMana.GROWTH,

  // Astral + X
  [pairKey(BaseMana.ASTRAL, BaseMana.LIGHT)]: HybridMana.LIFE,
  [pairKey(BaseMana.ASTRAL, BaseMana.SHADOW)]: HybridMana.DEATH,
  [pairKey(BaseMana.ASTRAL, BaseMana.WATER)]: HybridMana.DREAM,
  [pairKey(BaseMana.ASTRAL, BaseMana.FIRE)]: HybridMana.IGNITION,
  [pairKey(BaseMana.ASTRAL, BaseMana.NATURE)]: HybridMana.PULSE,

  // Light + X
  [pairKey(BaseMana.LIGHT, BaseMana.WATER)]: HybridMana.RENEWAL,
  [pairKey(BaseMana.LIGHT, BaseMana.FIRE)]: HybridMana.RETRIBUTION,
  [pairKey(BaseMana.LIGHT, BaseMana.SHADOW)]: HybridMana.JUDGEMENT,
  [pairKey(BaseMana.LIGHT, BaseMana.NATURE)]: HybridMana.HARMONY,

  // Water + X
  [pairKey(BaseMana.WATER, BaseMana.FIRE)]: HybridMana.STEAM,
  [pairKey(BaseMana.WATER, BaseMana.SHADOW)]: HybridMana.POISON,
  [pairKey(BaseMana.WATER, BaseMana.NATURE)]: HybridMana.REGROWTH,

  // Fire + X
  [pairKey(BaseMana.FIRE, BaseMana.SHADOW)]: HybridMana.RUIN,
  [pairKey(BaseMana.FIRE, BaseMana.NATURE)]: HybridMana.SURGE,

  // Shadow + Nature
  [pairKey(BaseMana.SHADOW, BaseMana.NATURE)]: HybridMana.BLIGHT
});

/**
 * Hybrid + Base -> Eldritch
 * Keys are order-independent by encoding as "hybrid|base".
 * (We keep it directional only in terms of type; the key itself is normalized.)
 */
export const EldritchCombos = Object.freeze({
  // Crystal + X
  [pairKey(HybridMana.CRYSTAL, BaseMana.WATER)]: EldritchMana.RESONANCE,
  [pairKey(HybridMana.CRYSTAL, BaseMana.FIRE)]: EldritchMana.OVERCHARGE,
  [pairKey(HybridMana.CRYSTAL, BaseMana.SHADOW)]: EldritchMana.NULL,

  // Mud + X
  [pairKey(HybridMana.MUD, BaseMana.ASTRAL)]: EldritchMana.INERTIA,
  [pairKey(HybridMana.MUD, BaseMana.NATURE)]: EldritchMana.QUAGMIRE,

  // Obsidian + X
  [pairKey(HybridMana.OBSIDIAN, BaseMana.ASTRAL)]: EldritchMana.DISJUNCTION,
  [pairKey(HybridMana.OBSIDIAN, BaseMana.NATURE)]: EldritchMana.SEVERANCE,

  // Growth + X
  [pairKey(HybridMana.GROWTH, BaseMana.WATER)]: EldritchMana.OVERGROWTH,

  // Steam + Astral
  [pairKey(HybridMana.STEAM, BaseMana.ASTRAL)]: EldritchMana.SUSPENSION,

  // Poison + X
  [pairKey(HybridMana.POISON, BaseMana.ASTRAL)]: EldritchMana.ENTROPY,
  [pairKey(HybridMana.POISON, BaseMana.LIGHT)]: EldritchMana.EXPOSURE,
  [pairKey(HybridMana.POISON, BaseMana.FIRE)]: EldritchMana.CATALYST,
  [pairKey(HybridMana.POISON, BaseMana.EARTH)]: EldritchMana.CORROSION,
  [pairKey(HybridMana.POISON, BaseMana.NATURE)]: EldritchMana.NECROSIS,

  // Ignition + X
  [pairKey(HybridMana.IGNITION, BaseMana.LIGHT)]: EldritchMana.MANDATE,
  [pairKey(HybridMana.IGNITION, BaseMana.WATER)]: EldritchMana.RECURSION,
  [pairKey(HybridMana.IGNITION, BaseMana.WIND)]: EldritchMana.CASCADE,

  // Retribution + Astral
  [pairKey(HybridMana.RETRIBUTION, BaseMana.ASTRAL)]: EldritchMana.REPRISAL,

  // Judgement + X
  [pairKey(HybridMana.JUDGEMENT, BaseMana.ASTRAL)]: EldritchMana.DECREE,
  [pairKey(HybridMana.JUDGEMENT, BaseMana.FIRE)]: EldritchMana.SENTENCE,
  [pairKey(HybridMana.JUDGEMENT, BaseMana.WATER)]: EldritchMana.INJUNCTION,
  [pairKey(HybridMana.JUDGEMENT, BaseMana.WIND)]: EldritchMana.PRECEDENT,
  [pairKey(HybridMana.JUDGEMENT, BaseMana.EARTH)]: EldritchMana.SANCTION,

  // Ruin + X
  [pairKey(HybridMana.RUIN, BaseMana.ASTRAL)]: EldritchMana.CATASTROPHE,
  [pairKey(HybridMana.RUIN, BaseMana.LIGHT)]: EldritchMana.DEVASTATION,
  [pairKey(HybridMana.RUIN, BaseMana.WATER)]: EldritchMana.SCOUR,

  // Blight + Astral
  [pairKey(HybridMana.BLIGHT, BaseMana.ASTRAL)]: EldritchMana.STERILITY
});

// ------------------------------
// Locked value rules + helpers
// ------------------------------
export const ManaRules = Object.freeze({
  // Pool scaling
  baseEmpowerManaBonusPerLevel: 0.20,     // +20% base mana per empower
  hybridSpecManaBonusPerLevel: 0.20,      // +20% hybrid mana per specialization level

  // Effectiveness scaling
  baseEmpowerEffectBonusPerLevel: 0.25,   // +25% effectiveness per empower
  hybridSpecEffectBonusPerLevel: 0.50,    // +50% effectiveness per specialization level

  // Core formulas (documented)
  formulas: Object.freeze({
    baseMana: "floor(subAttributePercent / 5) * 10",
    forceMana: "floor(sum(unblockedBaseMana) / count(unblockedBaseManaTypes))",
    hybridMana: "floor((baseManaA + baseManaB) / 2)",
    eldritchMana: "floor((hybridMana + addedBaseMana) / 2)"
  })
});

/**
 * Calculate raw base mana from a sub-attribute percent.
 * Locked: floor(%/5)*10
 */
export function calcBaseManaFromPercent(percent) {
  const p = Number(percent) || 0;
  return Math.floor(p / 5) * 10;
}

/**
 * Apply empower mana bonus to a base mana pool.
 * Locked: +20% per empower level (additive).
 */
export function applyBaseEmpowerMana(baseManaValue, empowerLevels = 0) {
  const v = Number(baseManaValue) || 0;
  const e = Math.max(0, Number(empowerLevels) || 0);
  return Math.floor(v * (1 + ManaRules.baseEmpowerManaBonusPerLevel * e));
}

/**
 * Calculate Force mana from a map of base mana values and a set of blocked types.
 * Locked: average of ALL unblocked base mana values.
 */
export function calcForceMana(baseManaMap, blockedBaseSet = new Set()) {
  const entries = Object.values(BaseMana)
    .filter((k) => !blockedBaseSet.has(k))
    .map((k) => Number(baseManaMap?.[k]) || 0);

  if (entries.length === 0) return 0;

  const sum = entries.reduce((a, b) => a + b, 0);
  return Math.floor(sum / entries.length);
}

/**
 * Resolve a hybrid mana type from two base mana types.
 * Returns null if no such hybrid exists.
 */
export function resolveHybrid(baseA, baseB) {
  return HybridCombos[pairKey(baseA, baseB)] ?? null;
}

/**
 * Calculate hybrid mana from two (already modified) base mana values.
 * Locked: floor((A+B)/2), then +20% per specialization level if this hybrid is specialized.
 */
export function calcHybridMana(modBaseA, modBaseB, specLevels = 0) {
  const a = Number(modBaseA) || 0;
  const b = Number(modBaseB) || 0;
  const baseHybrid = Math.floor((a + b) / 2);

  const s = Math.max(0, Number(specLevels) || 0);
  return Math.floor(baseHybrid * (1 + ManaRules.hybridSpecManaBonusPerLevel * s));
}

/**
 * Resolve an eldritch mana type from a hybrid + added base mana.
 * Returns null if no such eldritch exists.
 */
export function resolveEldritch(hybridKey, addedBaseKey) {
  return EldritchCombos[pairKey(hybridKey, addedBaseKey)] ?? null;
}

/**
 * Calculate eldritch mana from a (modified) hybrid mana value and (modified) added base mana value.
 * Locked: floor((Hybrid + AddedBase)/2)
 */
export function calcEldritchMana(modHybridMana, modAddedBaseMana) {
  const h = Number(modHybridMana) || 0;
  const b = Number(modAddedBaseMana) || 0;
  return Math.floor((h + b) / 2);
}

/**
 * Effectiveness multipliers (not applied here; you’ll apply them per ability).
 * - Base empower: +25% per empower level
 * - Hybrid specialization: +50% per spec level (eldritch abilities derived from that hybrid only)
 */
export function calcEffectivenessBonus({ empowerLevels = 0, specLevels = 0 } = {}) {
  const e = Math.max(0, Number(empowerLevels) || 0);
  const s = Math.max(0, Number(specLevels) || 0);

  const total =
    ManaRules.baseEmpowerEffectBonusPerLevel * e +
    ManaRules.hybridSpecEffectBonusPerLevel * s;

  return total; // e.g., 0.75 = +75%
}
