// systems/<your-system-id>/scripts/config/skills-config.mjs
//
// Skills + Ability progression configuration (LOCKED behavior)
//
// Notes:
// - Tier Modifiers (TM) are the % added to the governing sub-attribute on a SKILL rank-up.
// - Ability tier-ups also add to sub-attributes, but at a reduced rate via ABILITY_ATTR_MOD.
// - Skill rank caps per tier are enforced by SKILL_RANK_CAPS.
// - Skill rank-ups are gated by a uses counter using USES_PER_SKILL_RANK_UP.
//
// This file contains ONLY config + tiny pure helpers (no Foundry hooks).

export const SkillsConfig = {
  // Canonical tier order (used everywhere)
  TIERS: [
    "normal",
    "initiate",
    "novice",
    "apprentice",
    "journeyman",
    "adept",
    "master",
    "grandmaster",
    "avatar",
    "ascendant",
  ],

  // Display labels (optional convenience)
  TIER_LABELS: {
    normal: "Normal",
    initiate: "Initiate",
    novice: "Novice",
    apprentice: "Apprentice",
    journeyman: "Journeyman",
    adept: "Adept",
    master: "Master",
    grandmaster: "Grandmaster",
    avatar: "Avatar",
    ascendant: "Ascendant",
  },

  // Skill rank caps per tier (LOCKED)
  SKILL_RANK_CAPS: {
    normal: 3,
    initiate: 5,
    novice: 7,
    apprentice: 10,
    journeyman: 13,
    adept: 16,
    master: 20,
    grandmaster: 25,
    avatar: 30,
    ascendant: 40,
  },

  // Uses required to go from Rank R → R+1 (LOCKED)
  // Uses = 5 + (R * 5)
  USES_PER_SKILL_RANK_UP: {
    base: 5,
    perRank: 5,
  },

  // Tier Modifiers (TM) in % points awarded on SKILL rank-up (LOCKED)
  // Order: Normal -> Ascendant
  TIER_MODIFIERS_PERCENT: {
    normal: 2.0,
    initiate: 1.75,
    novice: 1.5,
    apprentice: 1.25,
    journeyman: 1.0,
    adept: 0.9,
    master: 0.8,
    grandmaster: 0.7,
    avatar: 0.6,
    ascendant: 0.5,
  },

  // Ability tier-up contributes to sub-attributes at a reduced rate (LOCKED behavior)
  // ΔSubAttr% (Ability Tier Up) = TM(tier) * ABILITY_ATTR_MOD
  ABILITY_ATTR_MOD: 0.5,

  // Ability starting tiers by mana category (LOCKED)
  ABILITY_START_TIERS: {
    base: "normal",
    hybrid: "apprentice",
    eldritch: "master",
  },

  // Track gains from roll outcomes (LOCKED)
  TRACK_GAIN: {
    success: 1,
    crit: 2,
    fail: 0,
  },
};

/* -----------------------------
 * Pure helper functions
 * ----------------------------- */

/**
 * Uses needed to increase a skill from Rank R -> R+1.
 */
export function usesToIncreaseSkillRank(currentRank) {
  const r = Math.max(0, Number(currentRank) || 0);
  return SkillsConfig.USES_PER_SKILL_RANK_UP.base + r * SkillsConfig.USES_PER_SKILL_RANK_UP.perRank;
}

/**
 * Max rank allowed at a given tier key.
 */
export function maxSkillRankForTier(tierKey) {
  return SkillsConfig.SKILL_RANK_CAPS[tierKey] ?? SkillsConfig.SKILL_RANK_CAPS.normal;
}

/**
 * Sub-attribute % gain on SKILL rank-up at a given tier.
 * Returns % points (e.g., 1.25 means +1.25%).
 */
export function subAttrGainOnSkillRankUp(tierKey) {
  return SkillsConfig.TIER_MODIFIERS_PERCENT[tierKey] ?? SkillsConfig.TIER_MODIFIERS_PERCENT.normal;
}

/**
 * Sub-attribute % gain on ABILITY tier-up at a given tier.
 * Returns % points.
 */
export function subAttrGainOnAbilityTierUp(tierKey) {
  const tm = SkillsConfig.TIER_MODIFIERS_PERCENT[tierKey] ?? SkillsConfig.TIER_MODIFIERS_PERCENT.normal;
  return tm * SkillsConfig.ABILITY_ATTR_MOD;
}

/**
 * Convenience: validate tier order comparisons.
 */
export function tierIndex(tierKey) {
  return SkillsConfig.TIERS.indexOf(tierKey);
}
