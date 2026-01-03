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
// - Advanced skills unlock at Apprentice tier
// - Full skill + lore list (Body/Mind/Soul + Lore base + Advanced Monster Lore)
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

    // Advanced skills unlock at this tier (LOCKED)
    advancedUnlockTier: "apprentice",
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

  /* -------------------------------------------- */
  /* Skills + Lore Catalog (LOCKED LIST)          */
  /* -------------------------------------------- */

  // Each entry:
  // - label: UI label
  // - attribute: "body" | "mind" | "soul"
  // - subAttribute: e.g. "might"
  // - kind: "base" | "lore" | "lore-advanced"
  // - advanced: true/false (requires Apprentice tier to learn/progress)
  skills: {
    /* =======================
     * BODY → MIGHT (LOCKED)
     * ======================= */
    athletics: { label: "Athletics", attribute: "body", subAttribute: "might", kind: "base", advanced: false },
    combat_medium_melee: { label: "Combat: Medium Melee", attribute: "body", subAttribute: "might", kind: "base", advanced: false },
    combat_heavy_melee: { label: "Combat: Heavy Melee", attribute: "body", subAttribute: "might", kind: "base", advanced: false },
    combat_grappling: { label: "Combat: Grappling", attribute: "body", subAttribute: "might", kind: "base", advanced: false },
    force: { label: "Force", attribute: "body", subAttribute: "might", kind: "base", advanced: false },

    /* =======================
     * BODY → AGILITY (LOCKED)
     * ======================= */
    acrobatics: { label: "Acrobatics", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    stealth: { label: "Stealth", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    sleight: { label: "Sleight of Hand", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    combat_light_melee: { label: "Combat: Light Melee", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    combat_unarmed: { label: "Combat: Unarmed", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    combat_ranged: { label: "Combat: Ranged", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },
    combat_throwing: { label: "Combat: Throwing", attribute: "body", subAttribute: "agility", kind: "base", advanced: false },

    /* =========================
     * BODY → FORTITUDE (LOCKED)
     * ========================= */
    endurance: { label: "Endurance", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },
    resistance_toxins: { label: "Resistance: Toxins", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },
    resistance_sickness: { label: "Resistance: Sickness", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },
    resistance_environmental: { label: "Resistance: Environmental", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },
    survival: { label: "Survival", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },
    pain_tolerance: { label: "Pain Tolerance", attribute: "body", subAttribute: "fortitude", kind: "base", advanced: false },

    /* ======================
     * MIND → FOCUS (LOCKED)
     * ====================== */
    channeling: { label: "Channeling", attribute: "mind", subAttribute: "focus", kind: "base", advanced: false },
    concentration: { label: "Concentration", attribute: "mind", subAttribute: "focus", kind: "base", advanced: false },
    ritual_control: { label: "Ritual Control", attribute: "mind", subAttribute: "focus", kind: "base", advanced: false },
    precision_casting: { label: "Precision Casting", attribute: "mind", subAttribute: "focus", kind: "base", advanced: false },

    /* =======================
     * MIND → INSIGHT (LOCKED)
     * ======================= */
    perception: { label: "Perception", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },
    investigation: { label: "Investigation", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },
    tactics: { label: "Tactics", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },
    medicine: { label: "Medicine", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },
    arcane_analysis: { label: "Arcane Analysis", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },
    use_magic_device: { label: "Use Magic Device", attribute: "mind", subAttribute: "insight", kind: "base", advanced: false },

    /* =========================
     * MIND → WILLPOWER (LOCKED)
     * ========================= */
    discipline: { label: "Discipline", attribute: "mind", subAttribute: "willpower", kind: "base", advanced: false },
    clarity: { label: "Clarity", attribute: "mind", subAttribute: "willpower", kind: "base", advanced: false },
    integrity: { label: "Integrity", attribute: "mind", subAttribute: "willpower", kind: "base", advanced: false },

    /* =======================
     * SOUL → PRESENCE (LOCKED)
     * ======================= */
    command: { label: "Command", attribute: "soul", subAttribute: "presence", kind: "base", advanced: false },
    persuasion: { label: "Persuasion", attribute: "soul", subAttribute: "presence", kind: "base", advanced: false },
    performance: { label: "Performance", attribute: "soul", subAttribute: "presence", kind: "base", advanced: false },
    intimidation: { label: "Intimidation", attribute: "soul", subAttribute: "presence", kind: "base", advanced: false },

    /* ===========================
     * SOUL → MANIPULATION (LOCKED)
     * =========================== */
    deception: { label: "Deception", attribute: "soul", subAttribute: "manipulation", kind: "base", advanced: false },
    guile: { label: "Guile", attribute: "soul", subAttribute: "manipulation", kind: "base", advanced: false },
    intrigue: { label: "Intrigue", attribute: "soul", subAttribute: "manipulation", kind: "base", advanced: false },
    coercion: { label: "Coercion", attribute: "soul", subAttribute: "manipulation", kind: "base", advanced: false },
    subterfuge: { label: "Subterfuge", attribute: "soul", subAttribute: "manipulation", kind: "base", advanced: false },

    /* ======================
     * SOUL → RESOLVE (LOCKED)
     * ====================== */
    conviction: { label: "Conviction", attribute: "soul", subAttribute: "resolve", kind: "base", advanced: false },
    resistance_corruption: { label: "Resistance: Corruption", attribute: "soul", subAttribute: "resolve", kind: "base", advanced: false },
    sanctity: { label: "Sanctity", attribute: "soul", subAttribute: "resolve", kind: "base", advanced: false },
    meditation: { label: "Meditation", attribute: "soul", subAttribute: "resolve", kind: "base", advanced: false },
    aura_control: { label: "Aura Control", attribute: "soul", subAttribute: "resolve", kind: "base", advanced: false },

    /* ======================
     * INSIGHT → LORE (LOCKED)
     * ====================== */

    // Base Lore Skills (rollable)
    lore_monsters: { label: "Lore: Monsters", attribute: "mind", subAttribute: "insight", kind: "lore", advanced: false },
    lore_magic: { label: "Lore: Magic", attribute: "mind", subAttribute: "insight", kind: "lore", advanced: false },
    lore_religion: { label: "Lore: Religion", attribute: "mind", subAttribute: "insight", kind: "lore", advanced: false },
    lore_history: { label: "Lore: History", attribute: "mind", subAttribute: "insight", kind: "lore", advanced: false },
    lore_legends: { label: "Lore: Legends", attribute: "mind", subAttribute: "insight", kind: "lore", advanced: false },

    // Advanced Monster Lore Skills (independent; unlock at Apprentice)
    lore_dragons: { label: "Lore: Dragons", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_horrors: { label: "Lore: Horrors", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_undead: { label: "Lore: Undead", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_titans: { label: "Lore: Titans", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_fae: { label: "Lore: Fae", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_infernal: { label: "Lore: Infernal", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_celestial: { label: "Lore: Celestial", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
    lore_legendary: { label: "Lore: Legendary", attribute: "mind", subAttribute: "insight", kind: "lore-advanced", advanced: true },
  },

  /* -------------------------------------------- */
  /* Optional: UI groupings for sheet rendering    */
  /* -------------------------------------------- */

  groups: {
    body: {
      might: ["athletics", "combat_medium_melee", "combat_heavy_melee", "combat_grappling", "force"],
      agility: ["acrobatics", "stealth", "sleight", "combat_light_melee", "combat_unarmed", "combat_ranged", "combat_throwing"],
      fortitude: ["endurance", "resistance_toxins", "resistance_sickness", "resistance_environmental", "survival", "pain_tolerance"],
    },
    mind: {
      focus: ["channeling", "concentration", "ritual_control", "precision_casting"],
      insight: ["perception", "investigation", "tactics", "medicine", "arcane_analysis", "use_magic_device"],
      willpower: ["discipline", "clarity", "integrity"],
    },
    soul: {
      presence: ["command", "persuasion", "performance", "intimidation"],
      manipulation: ["deception", "guile", "intrigue", "coercion", "subterfuge"],
      resolve: ["conviction", "resistance_corruption", "sanctity", "meditation", "aura_control"],
    },
    lore: {
      base: ["lore_monsters", "lore_magic", "lore_religion", "lore_history", "lore_legends"],
      advanced_monster: [
        "lore_dragons",
        "lore_horrors",
        "lore_undead",
        "lore_titans",
        "lore_fae",
        "lore_infernal",
        "lore_celestial",
        "lore_legendary",
      ],
    },
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
 * Compare tier order (useful for gating rules elsewhere).
 */
export function tierIndex(tierKey) {
  return SkillsConfig.TIERS.indexOf(tierKey);
}

/**
 * Whether a given skill key is marked as advanced.
 */
export function isAdvancedSkill(skillKey) {
  return Boolean(SkillsConfig.skills?.[skillKey]?.advanced);
}

/**
 * Whether the current tier can learn/progress advanced skills.
 */
export function canUseOrProgressAdvancedSkills(tierKey) {
  return tierIndex(tierKey) >= tierIndex(SkillsConfig.TIER_GATING.advancedUnlockTier);
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
 * @param {string} [params.skillKey] - optional: used to enforce advanced-skill gating
 * @returns {{rank:number, uses:number, rankUps:number, capped:boolean, advancedBlocked?:boolean}}
 */
export function applySkillUse({ rank, uses, outcome, tierKey, skillKey } = {}) {
  let r = Math.max(0, Number(rank) || 0);
  let u = Number(uses) || 0;

  // Optional: enforce advanced-skill gating
  if (skillKey && isAdvancedSkill(skillKey) && !canUseOrProgressAdvancedSkills(tierKey)) {
    return { rank: r, uses: u, rankUps: 0, capped: isSkillCappedForTier(r, tierKey), advancedBlocked: true };
  }

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
