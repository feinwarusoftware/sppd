"use strict";

const fs = require("fs");
// const path = require("path");

const isUpperCase = char => char === char.toUpperCase();

const snakeify = string => {
  let snakeString = "";

  for (let [i, char] of Array.from(string).entries()) {
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

let out = {};

out.name = card.Name[0];
out.description = card.Description.replace(/(?<=\{)(.*?)(?=\})/g, match => snakeify(match));
out.image = card.Image;
out.mana_cost = parseInt(card.ManaCost);
out.damage = parseInt(card.Damage);
out.health = parseInt(card.Health);
out.type = card.Type.toLowerCase();
out.character_type = card.Type !== "Spell" ? card.CharacterType.toLowerCase() : null;
out.rarity = parseInt(card.Rarity);
switch(card.Theme) {
  case "Fan": {
    out.theme = "fantasy";
  };
  case "Adv": {
    out.theme = "adventure";
  };
  case "Sci": {
    out.theme = "sci-fi";
  };
  case "Gen": {
    out.theme = "general";
  };
  case "Mys": {
    out.theme = "mystical";
  };
}

out.cast_area = snakeify(card.CastArea);

out.max_velocity = card.Type !== "Spell" && card.CharacterType !== "Totem" ? parseFloat(card.MaxVelocity) : null;
out.time_to_reach_max_velocity = card.Type !== "Spell" && card.CharacterType !== "Totem" ? parseFloat(card.TimeToReachMaxVelocity) : null;
out.agro_range_multiplier = card.Type !== "Spell" && card.CharacterType !== "Totem" ? parseFloat(card.AgroRangeMultiplier) : null;

out.can_attack = card.Type !== "Spell" && card.CharacterType !== "Totem" ? card.CanAttack : null;
out.attack_range = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.AttackRange) : null;
out.pre_attack_delay = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.PreAttackDelay) : null;
out.knockback = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.KnockbackImpulse) : null;
out.knockback_angle = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.KnockbackAngleDeg) : null;
out.time_between_attacks = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.CanAttack === true ? parseFloat(card.TimeInBetweenAttacks) : null;

// TODO: power stuff
for (let [k, v] of Object.entries(card)) {
  if (k.startsWith("Power") && k !== "PowerDuration" && v != null) {
    out.power_type = snakeify(k);
    out.power_amount = parseInt(v);
    break;
  }
}
if (out.power_type == null) {
  out.has_power = false;
  out.power_type = null;
  out.power_amount = null;
} else {
  out.has_power = true;
}

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

out.has_aoe = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No";
out.aoe_type = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? card.AOEAttackType : null;
out.aoe_damage_percentage = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOEDamagePercentage) : null;
out.aoe_knockback_percentage = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOEKnockbackPercentage) : null;
out.aoe_radius = card.Type !== "Spell" && card.CharacterType !== "Totem" && card.AOEAttackType !== "No" ? parseFloat(card.AOERadius) : null;

out.min_episode_completed = parseInt(card.Requirements.MinEpisodeCompleted);
out.min_pvp_rank = parseInt(card.Requirements.MinPlayerLevel);
out.min_player_level = parseInt(card.Requirements.MinPVPRank);

// tech tree
const transformSlot = slot => ({
  property: slot.property.startsWith("Power") ? `power_${snakeify(slot.property.slice(5, slot.property.length - 3))}` : slot.property.endsWith("Power") ? "power_unlock" : `stat_${snakeify(slot.property)}`,
  value: parseInt(slot.value)
})

out.tech_tree = {};
out.tech_tree.slots = card.TechTree2.Slots.map(transformSlot);
out.tech_tree.levels = card.TechTree2.Evolve.map(e => ({
  slots: e.Slots.map(transformSlot)
}));

// save modified
const ext = fp.split(".")[fp.split(".").length - 1];
const extLess = fp.split(".").slice(0, -1).join(".");

fs.writeFileSync(`${extLess}_conv.${ext}`, JSON.stringify(out));

console.log("successfully converted card");
