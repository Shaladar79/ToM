// systems/<your-system-id>/scripts/config/crafting-config.mjs
//
// Crafting subsystem configuration (DRAFT -> up to current lock)
// - Crafting skills list + governing sub-attributes (LOCKED)
// - Recipe Research skill (LOCKED)
// - Downtime flow (LOCKED): 1 activity per DT day (CP or RP), crafting must be consecutive (no pause)
// - Points per tier table (LOCKED): 1,1,2,2,3,3,4,5,6,7
// - Workstations/assistants may modify daily points, but still only CP OR RP per day (LOCKED)
//   Daily cap: basePoints * 2 (LOCKED)
// - Recipes: basic + advanced structure, scalable (LOCKED STRUCTURE)
// - Mana crafting: mana is paid per DT day, evenly divided across required DT days (LOCKED)
// - Batch crafting: allowed when recipeTier <= craftingSkillTier - 2 (LOCKED)
// - Recipe mastery: per-recipe, 10 tiers, craftsRequiredAtTier = tierIndex * 5 (LOCKED)
// - Critical Failure rules (LOCKED):
//   * Item always destroyed, not successful
//   * If recipe used any mana: explosion deals Vitality damage
//   * Damage per mana type: 1d6 per 25 mana of that type already invested; types stack
//
// This file is config + pure helpers only (no Foundry hooks).

export const CraftingConfig = {
  /* -------------------------------------------- */
  /* Tier system (canonical order, shared)         */
  /* -------------------------------------------- */
  tiers: [
    "normal",
    "initiate",
    "novice",
    "apprentice",
    "journeyman",
    "adept",
    "master",
    "grandmaster",
    "avatar",
    "ascendant"
  ],

  tierLabels: {
    normal: "Normal",
    initiate: "Initiate",
    novice: "Novice",
    apprentice: "Apprentice",
    journeyman: "Journeyman",
    adept: "Adept",
    master: "Master",
    grandmaster: "Grandmaster",
    avatar: "Avatar",
    ascendant: "Ascendant"
  },

  /* -------------------------------------------- */
  /* Downtime points per tier (LOCKED)             */
  /* -------------------------------------------- */
  pointsPerDowntimeDay: {
    // Order: 1,1,2,2,3,3,4,5,6,7
    normal: 1,
    initiate: 1,
    novice: 2,
    apprentice: 2,
    journeyman: 3,
    adept: 3,
    master: 4,
    grandmaster: 5,
    avatar: 6,
    ascendant: 7
  },

  dailyPointCapMultiplier: 2, // Max points/day = basePoints * 2 (LOCKED)

  downtime: {
    // Per DT day: choose exactly one activity (LOCKED)
    activities: ["craft", "research"],

    // Crafting cannot be paused and must be consecutive DT days (LOCKED)
    craftingRequiresConsecutiveDays: true,

    // Research may be paused (LOCKED by distinction)
    researchCanPause: true
  },

  /* -------------------------------------------- */
  /* Skills (crafting disciplines) (LOCKED)        */
  /* -------------------------------------------- */
  // Note: Crafting skills advance attributes at HALF the normal skill rate (LOCKED)
  craftingSkillAttrRateMod: 0.5,

  // Crafting skill list (LOCKED)
  craftingSkills: {
    smithing: {
      label: "Smithing",
      // Governing sub-attribute (LOCKED)
      governs: { attribute: "body", sub: "might" }
    },
    alchemy: {
      label: "Alchemy",
      governs: { attribute: "mind", sub: "insight" }
    },
    textiles: {
      label: "Textiles",
      governs: { attribute: "mind", sub: "insight" }
    },
    cooking: {
      label: "Cooking",
      governs: { attribute: "body", sub: "fortitude" }
    },
    jeweler: {
      label: "Jeweler",
      governs: { attribute: "mind", sub: "focus" }
    },
    engineering: {
      label: "Engineering",
      governs: { attribute: "mind", sub: "insight" }
    }
  },

  /* -------------------------------------------- */
  /* Recipe Research skill (LOCKED)                */
  /* -------------------------------------------- */
  recipeResearchSkill: {
    key: "recipeResearch",
    label: "Recipe Research",
    governs: { attribute: "mind", sub: "focus" }, // LOCKED
    attrRateMod: 0.5, // HALF advancement (LOCKED)
    // Physical source (scroll/book) halves RP cost (LOCKED)
    foundSourceHalvesRpcost: true
  },

  /* -------------------------------------------- */
  /* Recipe model (LOCKED STRUCTURE)               */
  /* -------------------------------------------- */
  recipeTypes: ["basic", "advanced"],

  recipeSchemaNotes: {
    // Structural intent for Foundry UI:
    // - Basic recipe renders as top-level node
    // - Advanced recipes render under parent basic recipe
    // - Advanced recipes must set `parent` to a basic recipe key
    // - Tier gating uses: characterTier, craftingSkillTier, recipeResearchTier
    //   (research tier gate applies to learning; crafting tier applies to crafting)
    supportsParentChildTree: true
  },

  /* -------------------------------------------- */
  /* Mana flow (LOCKED)                            */
  /* -------------------------------------------- */
  mana: {
    // For any recipe requiring mana, mana is paid per DT day:
    // dailyMana = totalMana / totalDays (LOCKED)
    payPerDay: true,

    // If using fractional mana, Foundry can store as decimals;
    // alternatively, rounding policy can be defined later.
    rounding: "none" // "none" | "floor" | "ceil" | "nearest" (OPEN later if needed)
  },

  /* -------------------------------------------- */
  /* Batch crafting (LOCKED)                       */
  /* -------------------------------------------- */
  batch: {
    // Allowed when recipeTier <= craftingSkillTier - 2 (LOCKED)
    minTierDelta: 2
    // (Batch size/cost formula was discussed but not fully locked in the final pass;
    // keep it out of config until you explicitly lock it.)
  },

  /* -------------------------------------------- */
  /* Recipe mastery (LOCKED)                       */
  /* -------------------------------------------- */
  mastery: {
    // Uses the same 10 tiers as characters (LOCKED)
    tiers: [
      "normal",
      "initiate",
      "novice",
      "apprentice",
      "journeyman",
      "adept",
      "master",
      "grandmaster",
      "avatar",
      "ascendant"
    ],

    // Entry requirement: Normal mastery requires 5 successful crafts (LOCKED)
    // Progression: craftsRequiredAtTier = tierIndex * 5 (LOCKED)
    craftsPerTierStep: 5,

    // Success criteria: success or partial success counts; failure does not (LOCKED)
    countPartialSuccessAsSuccess: true
  },

  /* -------------------------------------------- */
  /* Critical failure (LOCKED)                     */
  /* -------------------------------------------- */
  criticalFailure: {
    // Always: item destroyed, craft not successful (LOCKED)
    itemAlwaysDestroyed: true,

    // If any mana has been invested: explosion + Vitality damage (LOCKED)
    manaExplosion: {
      enabled: true,
      damagePool: "vitality", // LOCKED: Vitality replaces Life Force in this context
      // Dice per mana type: 1d6 per 25 mana invested of that type (LOCKED)
      dicePerMana: 1,
      manaPerDie: 25,
      // Multiple mana types stack (LOCKED)
      stackTypes: true
    }
  },

  /* -------------------------------------------- */
  /* Minimal starter recipes (INTENTIONALLY SMALL) */
  /* -------------------------------------------- */
  // Keep this list small; expand later.
  recipes: {
    dagger: {
      key: "dagger",
      name: "Dagger",
      type: "basic",
      parent: null,
      craftingSkill: "smithing",
      tier: "normal",
      research: { rpCost: 0, reducedBySource: true },
      crafting: {
        cpCost: 1,
        days: 1, // OPEN: If you later base days purely on cp/days, adjust here.
        materials: [{ key: "iron_ore", qty: 2 }],
        mana: null
      },
      effect: { description: "Deals 1 damage per success." }
    },

    fire_dagger: {
      key: "fire_dagger",
      name: "Fire Dagger",
      type: "advanced",
      parent: "dagger",
      craftingSkill: "smithing",
      tier: "apprentice",
      research: { rpCost: 3, reducedBySource: true },
      crafting: {
        cpCost: 2,
        days: 2,
        materials: [
          { key: "iron_ore", qty: 2 },
          { key: "flame_essence", qty: 2 }
        ],
        mana: { fire: 50 }
      },
      effect: { description: "Deals +2 fire damage per success (in addition to base weapon damage per success)." }
    }
  }
};

/* ============================================================
 * Pure helpers
 * ========================================================== */

/** Canonical tier index: normal=0 ... ascendant=9 */
export function tierIndex(tierKey) {
  return CraftingConfig.tiers.indexOf(String(tierKey ?? "").toLowerCase());
}

export function isValidTier(tierKey) {
  return tierIndex(tierKey) >= 0;
}

/** Base points per DT day for a tier (CP or RP use the same table). */
export function basePointsPerDayForTier(tierKey) {
  const key = String(tierKey ?? "").toLowerCase();
  return CraftingConfig.pointsPerDowntimeDay[key] ?? 0;
}

/**
 * Compute daily points after modifiers and cap.
 * activity is "craft" (CP) or "research" (RP) but does not change math.
 */
export function dailyPointsWithCap({ tierKey, bonus = 0 }) {
  const base = basePointsPerDayForTier(tierKey);
  const cap = base * CraftingConfig.dailyPointCapMultiplier;
  const total = base + (Number.isFinite(bonus) ? bonus : 0);
  return Math.max(0, Math.min(total, cap));
}

/** Tier gating check: actorTier, skillTier, and (optionally) researchTier must meet recipe tier. */
export function meetsRecipeTierGates({ recipeTier, actorTier, craftingSkillTier, recipeResearchTier = null }) {
  const r = tierIndex(recipeTier);
  if (r < 0) return false;
  if (tierIndex(actorTier) < r) return false;
  if (tierIndex(craftingSkillTier) < r) return false;
  if (recipeResearchTier != null && tierIndex(recipeResearchTier) < r) return false;
  return true;
}

/** Batch eligibility: recipeTier <= craftingSkillTier - 2 (LOCKED) */
export function canBatchCraft({ recipeTier, craftingSkillTier }) {
  const r = tierIndex(recipeTier);
  const s = tierIndex(craftingSkillTier);
  if (r < 0 || s < 0) return false;
  return s - r >= CraftingConfig.batch.minTierDelta;
}

/**
 * Mastery crafts required at a given mastery tier.
 * LOCKED: tierIndex starts at 1 for Normal mastery -> 5 crafts
 * We use (tierIndex+1) * 5 where tierIndex normal=0.
 */
export function masteryCraftsRequiredAtTier(masteryTierKey) {
  const idx = tierIndex(masteryTierKey);
  if (idx < 0) return Infinity;
  return (idx + 1) * CraftingConfig.mastery.craftsPerTierStep;
}

/**
 * Apply found-source RP reduction (LOCKED: halve total RP cost).
 * Returns integer if rpCost is integer; otherwise float.
 */
export function effectiveRpcost({ rpCost, hasFoundSource }) {
  const cost = Number(rpCost ?? 0);
  if (!Number.isFinite(cost) || cost <= 0) return 0;
  if (!hasFoundSource) return cost;
  return cost / 2;
}

/**
 * Mana per DT day for a recipe (LOCKED: totalMana / totalDays).
 * If multiple mana types, returns per-type daily mana.
 */
export function dailyManaCost({ mana, days }) {
  const d = Number(days ?? 0);
  if (!mana || typeof mana !== "object" || d <= 0) return null;
  const out = {};
  for (const [type, total] of Object.entries(mana)) {
    const t = Number(total ?? 0);
    if (!Number.isFinite(t) || t <= 0) continue;
    out[type] = t / d;
  }
  return Object.keys(out).length ? out : null;
}

/**
 * Critical failure explosion dice by mana type.
 * LOCKED: 1d6 per 25 mana invested of that type; types stack.
 * Returns { fire: 2, frost: 1 } meaning roll 2d6 fire + 1d6 frost.
 */
export function explosionDiceByManaInvested(manaInvestedByType) {
  const cfg = CraftingConfig.criticalFailure.manaExplosion;
  if (!cfg?.enabled) return {};
  const per = Number(cfg.manaPerDie ?? 25);
  const out = {};
  for (const [type, amt] of Object.entries(manaInvestedByType ?? {})) {
    const a = Number(amt ?? 0);
    if (!Number.isFinite(a) || a <= 0) continue;
    const dice = Math.floor(a / per);
    if (dice > 0) out[type] = dice;
  }
  return out;
}
