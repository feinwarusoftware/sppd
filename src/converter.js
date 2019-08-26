"use strict";

// const fs = require("fs");
// const path = require("path");

const isUpperCase = char => char === char.toUpperCase();

const snakeify = string => {
  let preString = "";

  for (let [i, char] of Array.from(string).entries()) {
    if (string[i - 1] != null && isUpperCase(string[i - 1]) && isUpperCase(char) && string[i + 1] != null && isUpperCase(string[i + 1])) {
      preString += string[i].toLowerCase();
    } else {
      preString += string[i];
    }
  }

  let snakeString = "";

  for (let [i, char] of Array.from(preString).entries()) {
    const lowerChar = char.toLowerCase();

    if (i === 0) {
      snakeString += lowerChar;
      continue;
    }

    if (isUpperCase(char)) {
      snakeString += `_${lowerChar}`;
      continue;
    }

    snakeString += char;
  }

  return snakeString;
}

/*
const fp = process.argv[2];
if (fp == null) {
  return console.error("fp required");
}

let card;
try {
  card = JSON.parse(fs.readFileSync(fp))
} catch(error) {
  return console.error(`failed to read json input: ${error}`);
}
*/

const convert = card => {
  let out = {};

  out.name = card.Name[0];
  out.aliases = card.Name.slice(1);

  out.description = card.Description.replace(/(?<=\{)(.*?)(?=\})/g, match => snakeify(match));
  if (out.description.includes("power_poison_amount")) {
    out.description = out.description.replace("power_poison_amount", "power_poison");
  }
  if (out.description.includes("power_max_health_boost")) {
    out.description = out.description.replace("power_max_health_boost", "power_max_hp_gain");
  }
  if (out.description.includes("power_target_amount")) {
    out.description = out.description.replace("power_target_amount", "power_target");
  }

  out.image = card.Image;
  out.mana_cost = parseInt(card.ManaCost);
  out.damage = parseInt(card.Damage);
  out.health = parseInt(card.Health);
  
  //
  out.type = card.Type.toLowerCase();
  if (card.Name[0] === "Snake" || card.Name[0] === "Auto-Vacuum" || card.Name[0] === "Little Choirboy" || card.Name[0] === "Indian Brave" || card.Name[0] === "A Cock") {
    out.type = "spawn";
  }
  //

  out.character_type = card.Type !== "Spell" && card.Type !== "Trap" ? card.CharacterType.toLowerCase() : null;

  out.rarity = parseInt(card.Rarity);
  switch(card.Theme) {
    case "Fan": {
      out.theme = "fantasy";
      break;
    };
    case "Adv": {
      out.theme = "adventure";
      break;
    };
    case "Sci": {
      out.theme = "sci-fi";
      break;
    };
    case "Gen": {
      out.theme = "general";
      break;
    };
    case "Mys": {
      out.theme = "mystical";
      break;
    };
    case "Sup": {
      out.theme = "superhero";
      break;
    }
  }
  out.health_loss = card.CharacterType === "Totem" ? card.HealthLoss : null;

  out.cast_area = snakeify(card.CastArea);

  out.max_velocity = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? parseFloat(card.MaxVelocity) : null;
  out.time_to_reach_max_velocity = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? parseFloat(card.TimeToReachMaxVelocity) : null;
  out.agro_range_multiplier = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? parseFloat(card.AgroRangeMultiplier) : null;

  out.can_attack = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? card.CanAttack : null;
  out.attack_range = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.AttackRange) : null;
  out.pre_attack_delay = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.PreAttackDelay) : null;
  out.knockback = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.KnockbackImpulse) : null;
  out.knockback_angle = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.KnockbackAngleDeg) : null;
  out.time_between_attacks = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.TimeInBetweenAttacks) : null;

  // YAYFIXED: power stuff
  out.powers = [];

  // cock magic
  if (card.Name[0] === "Cock Magic") {
    out.powers.push({
      type: "power_target",
      amount: 1,
      duration: null,
      radius: null,
      is_charged: false,
      charged_regen: null,
      locked: false
    });
  }

  for (let [k, v] of Object.entries(card)) {
    if (k.startsWith("Power") && k !== "PowerDuration" && v != null) {
      let duration, radius, is_charged, charged_regen;

      const chargedPowerRegen = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? parseFloat(card.ChargedPowerRegen) : null;
      if (chargedPowerRegen == null || chargedPowerRegen === 0) {
        is_charged = false;
        charged_regen = null;
        radius = null;
      } else {
        is_charged = true;
        charged_regen = chargedPowerRegen;
        radius = card.ChargedPowerRadius === "Global" ? -1 : parseFloat(card.ChargedPowerRadius);
      }

      duration = card.PowerDuration == null ? null : card.PowerDuration === "Infinite" ? -1 : parseFloat(card.PowerDuration);

      if (k === "PowerPoisonAmount") {
        // out.power_type = "power_poison";
        out.powers.push({
          type: "power_poison",
          amount: parseInt(v),
          duration,
          radius,
          is_charged,
          charged_regen,
          locked: false
        });
      } else {
        // out.power_type = snakeify(k);
        out.powers.push({
          type: snakeify(k),
          amount: parseInt(v),
          duration,
          radius,
          is_charged,
          charged_regen,
          locked: false
        });
      }
    }
  }
  if (out.powers.length === 0 && card.PowerDuration != null) {
    let duration, radius, is_charged, charged_regen;

    const chargedPowerRegen = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" ? parseFloat(card.ChargedPowerRegen) : null;
    if (chargedPowerRegen == null || chargedPowerRegen === 0) {
      is_charged = false;
      charged_regen = null;
      radius = null;
    } else {
      is_charged = true;
      charged_regen = chargedPowerRegen;
      radius = card.ChargedPowerRadius === "Global" ? -1 : parseFloat(card.ChargedPowerRadius);
    }

    duration = card.PowerDuration == null ? null : card.PowerDuration === "Infinite" ? -1 : parseFloat(card.PowerDuration);
    
    out.powers.push({
      type: null,
      amount: null,
      duration,
      radius,
      is_charged,
      charged_regen,
      locked: false
    });
  }
  /*
  if (out.power_type == null) {
    out.has_power = false;
    out.power_type = null;
    out.power_amount = null;
  } else {
    out.has_power = true;
  }
  */

  /*
  out.charged_power_regen = card.Type !== "Spell" && card.CharacterType !== "Totem" ? parseFloat(card.ChargedPowerRegen) : null;
  if (out.charged_power_regen == null) {
    out.is_power_charged = false;
    out.charged_power_radius = null;
  } else {
    out.is_power_charged = true;
    out.charged_power_radius = card.ChargedPowerRadius === "Global" ? 0 : parseFloat(card.ChargedPowerRadius);
  }

  if (out.power_type == null && out.charged_power_regen == null) {
    out.power_duration = null;
  } else {
    out.power_duration = parseFloat(card.PowerDuration);
  }
  */
  //

  out.has_aoe = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No";
  out.aoe_type = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? snakeify(card.AOEAttackType) : null;
  out.aoe_damage_percentage = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOEDamagePercentage) : null;
  out.aoe_knockback_percentage = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOEKnockbackPercentage) : null;
  out.aoe_radius = card.Type !== "Spell" && card.Type !== "Trap" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOERadius) : null;

  out.min_episode_completed = parseInt(card.Requirements.MinEpisodeCompleted);
  out.min_pvp_rank = parseInt(card.Requirements.MinPlayerLevel);
  out.min_player_level = parseInt(card.Requirements.MinPVPRank);
  out.min_pvp_arena = parseInt(card.Requirements.MinPVPArena);

  // tech tree
  const transformSlot = slot => {
    if (slot.property == null) {
      slot.property = slot.id;
    }

    return {
      property: slot.property.startsWith("Power") ? slot.property === "PowerPoisonAmountAbs" ? `power_poison` : `power_${snakeify(slot.property.slice(5, slot.property.length - 3))}` : slot.property.endsWith("Power") ? "power_unlock" : slot.property === "SP200" ? "power_unlock" : slot.property === "ChargedPowerRegenRate" ? "stat_charged_power_regen" : `stat_${snakeify(slot.property)}`,
      value: parseInt(slot.value)
    };
  }

  out.tech_tree = {};
  out.tech_tree.slots = card.TechTree2.Slots.map(transformSlot);
  out.tech_tree.levels = card.TechTree2.Evolve.map(e => ({
    slots: e.Slots.map(transformSlot)
  }));

  // no need to leep through level slots as
  // * leep is the new loop boiis!
  // currently there are no power unlocks on level up
  for (let slot of out.tech_tree.slots) {
    if (slot.property === "power_unlock") {
      out.powers.map(e => ({ ...e, locked: true }));
      break;
    }
  }

  //
  if (card.Name[0] === "Snake" || card.Name[0] === "A Cock") {
    out.tech_tree.slots = [];
  }
  //

  // new
  out.character_tags = card.CharacterTags.map(e => e.replace(/\ /g, "_").map(f => f.toLowerCase()))

  return out;
}

/*
// save modified
const ext = fp.split(".")[fp.split(".").length - 1];
const extLess = fp.split(".").slice(0, -1).join(".");

fs.writeFileSync(`${extLess}_conv.${ext}`, JSON.stringify(out));

console.log("successfully converted card");
*/

module.exports = convert;
