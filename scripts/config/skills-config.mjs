// systems/<your-system-id>/scripts/config/skills-config.mjs
//
// Skills + Ability progression configuration (UPDATED + LOCKED)
//
// What is LOCKED here:
// - Tier order + labels
// - Skill rank caps per tier
// - Skill rank-up requirement curve: Uses(R) = 5 + (R * 5)
// - Roll-only progression
// - Track gains: success +1, crit +2, failure +0.2
// - Tier gating: if skill is at cap for current tier, it gains NO uses (no banking)
// - Sub-attribute % gain per skill rank-up uses the Tier Modifier table
// - Ability tier-up sub-attribute gain uses Tier Modifier * ABILITY_ATTR_MOD
// - Ability starting tiers by mana category
//
// This file is config + pure helpers only (no Foundry hooks).

export const SkillsConfig = {
  /* -------------------------------------------- */
  /* Tier system (canonical order)                 */
  /* -------------------------------------------- */

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

  /* -------------------------------------------- */
  /* Skill rank caps per tier (LOCKED)            */
  /* -------------------------------------------- */

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

  /* -------------------------------------------- */
  /* Skill rank-up curve (LOCKED)                 */
  /* Uses required to go Rank R -> R+1            */
  /* Uses(R) = 5 + (R * 5)                        */
  /* -------------------------------------------- */

  USES_PER_SKILL_RANK_UP: {
    base: 5,
    perRank: 5,
  },

  /* -------------------------------------------- */
  /* Tier modifiers (LOCKED)                      */
  /* These are % points added to the governing    */
  /* sub-attribute on SKILL rank-up at that tier. */
  /* -------------------------------------------- */

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

  /* -------------------------------------------- */
  /* Track gains from roll outcomes (LOCKED)      */
  /* Failure grants fractional progress: 0.2      */
  /* (5 fails = 1 success worth of progress)      */
  /* -------------------------------------------- */

  TRACK_GAIN: {
    success: 1.0,
    crit: 2.0,
    fail: 0.2,
  },

  /* -------------------------------------------- */
  /* Tier gating behavior (LOCKED)                */
  /* If a skill is at cap for the character tier, */
  /* it gains NO uses at all (no banking).        */
  /* -------------------------------------------- */

  TIER_GATING: {
    // When true: if rank >= cap, awarded uses are forced to 0.
    // This implements: "cannot advance toward next rank until tier allows it".
    hardStopAtCap: true,
  },

  /* -------------------------------------------- */
  /* Abilities (for shared progression math)      */
  /* -------------------------------------------- */

  // Ability tier-up contributes to sub-attributes at a reduced rate.
  // ΔSubAttr% (Ability Tier Up) = TM(tier) * ABILITY_ATTR_MOD
  ABILITY_ATTR_MOD: 0.5,

  // Ability starting tiers by mana category (LOCKED)
  ABILITY_START_TIERS: {
    base: "normal",
    hybrid: "apprentice",
    eldritch: "master",
  },
};

/* ============================================================
 * Pure helper functions (no Foundry dependencies)
 * ========================================================== */

/**
 * Returns the uses needed to increase a skill from Rank R -> R+1.
 */
export function usesToIncreaseSkillRank(currentRank) {
  const r = Math.max(0, Number(currentRank) || 0);
  return SkillsConfig.USES_PER_SKILL_RANK_UP.base + r * SkillsConfig.USES_PER_SKILL_RANK_UP.perRank;
}

/**
 * Returns the max skill rank allowed for a given tier.
 */
export function maxSkillRankForTier(tierKey) {
  return SkillsConfig.SKILL_RANK_CAPS[tierKey] ?? SkillsConfig.SKILL_RANK_CAPS.normal;
}

/**
 * Returns tier modifier (TM) in % points for the given tier.
 */
export function tierModifierPercent(tierKey) {
  return SkillsConfig.TIER_MODIFIERS_PERCENT[tierKey] ?? SkillsConfig.TIER_MODIFIERS_PERCENT.normal;
}

/**
 * Sub-attribute % gain on SKILL rank-up at a given tier.
 */
export function subAttrGainOnSkillRankUp(tierKey) {
  return tierModifierPercent(tierKey);
}

/**
 * Sub-attribute % gain on ABILITY tier-up at a given tier (reduced rate).
 */
export function subAttrGainOnAbilityTierUp(tierKey) {
  return tierModifierPercent(tierKey) * SkillsConfig.ABILITY_ATTR_MOD;
}

/**
 * Returns the numeric uses award for a given roll outcome.
 * Accepted outcomes: "success" | "crit" | "fail"
 */
export function usesAwardForOutcome(outcome) {
  if (outcome === "crit") return SkillsConfig.TRACK_GAIN.crit;
  if (outcome === "success") return SkillsConfig.TRACK_GAIN.success;
  return SkillsConfig.TRACK_GAIN.fail;
}

/**
 * Whether the skill is currently capped for the tier.
 */
export function isSkillCappedForTier(rank, tierKey) {
  const r = Math.max(0, Number(rank) || 0);
  const cap = maxSkillRankForTier(tierKey);
  return r >= cap;
}

/**
 * Apply a single roll outcome to a skill's uses/rank, respecting tier caps.
 *
 * LOCKED behavior:
 * - Roll-only progression
 * - Outcome awards: success +1, crit +2, fail +0.2
 * - If rank >= tier cap: award 0 uses (no banking)
 * - Rank-ups use Uses(R) = 5 + (R * 5)
 * - Overflow uses carry via subtraction
 *
 * @param {object} params
 * @param {number} params.rank - current skill rank
 * @param {number} params.uses - current uses toward next rank (may be fractional)
 * @param {string} params.outcome - "success" | "crit" | "fail"
 * @param {string} params.tierKey - character tier key (e.g. "normal")
 * @returns {{rank:number, uses:number, rankUps:number, capped:boolean}}
 */
export function applySkillUse({ rank, uses, outcome, tierKey }) {
  let r = Math.max(0, Number(rank) || 0);
  let u = Number(uses) || 0;

  const capped = isSkillCappedForTier(r, tierKey);

  // Hard stop at cap (no uses gained, no banking)
  if (capped && SkillsConfig.TIER_GATING.hardStopAtCap) {
    return { rank: r, uses: u, rankUps: 0, capped: true };
  }

  // Award uses for this roll
  const award = usesAwardForOutcome(outcome);
  u += award;

  // Resolve rank-ups (carry overflow)
  let rankUps = 0;
  while (true) {
    const capNow = maxSkillRankForTier(tierKey);
    if (r >= capNow) break; // cannot increase further this tier

    const required = usesToIncreaseSkillRank(r);
    if (u < required) break;

    u -= required;
    r += 1;
    rankUps += 1;
  }

  return { rank: r, uses: u, rankUps, capped: isSkillCappedForTier(r, tierKey) };
}

/**
 * Compare tier order (useful for gating rules elsewhere).
 */
export function tierIndex(tierKey) {
  return SkillsConfig.TIERS.indexOf(tierKey);
}

