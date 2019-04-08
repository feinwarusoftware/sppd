"use strict";

const isUpperCase = char => char === char.toUpperCase();
const isLowerCase = char => char === char.toLowerCase();

const isAlphanumeric = char => /^[a-z0-9]+$/i.test(char);

const snakeify = to_snakeify => {
  let target;
  if (typeof to_snakeify === "string") {
    let snake_string = "";

    for (let [i, letter] of Array.from(to_snakeify).entries()) {
      if (i === 0) {
        snake_string += letter.toLowerCase();
        continue;
      }
      if (isUpperCase(letter)) {
        snake_string += `_${letter.toLowerCase()}`;
        continue;
      }
      snake_string += letter;
    }

    return snake_string;
  } else {
    if (target instanceof Array) {
      target = [ ...to_snakeify ];
    } else {
      target = { ...to_snakeify };
    }
  }

  for (let prop in target) {
    const old = target[prop];
    delete target[prop];

    if (old instanceof Array) {
      target[snakeify(prop)] = old.map(e => e instanceof Object ? snakeify(e) : e);
    } else if (old instanceof Object) {
      target[snakeify(prop)] = snakeify(old);
    } else {
      target[snakeify(prop)] = old;
    }
  }

  return target;
}

// transforms power_type & power_amount to new format
// intended to be called with an object with snake_case field names
const transformCard = card => {
  // deep copy
  let stats = { ...card };

  for (let stat in stats) {
    if (stat === "name") {
      stats.aliases = stats[stat];
      stats.name = stats.name[0];
    }

    if (stat.startsWith("power") && stats[stat] !== null) {
      stats.power_type = stat.slice(6);
      stats.power_amount = stats[stat];
    }
    if (stat.startsWith("power")) {
      if (stat !== "power_duration") {
        delete stats[stat];
      }
    }
  }

  if (stats.power_type == null) {
    stats.power_type = "none";
    stats.power_amount = 0;
  }

  stats.tech_tree = stats.tech_tree_2;
  delete stats.tech_tree_2;

  return stats;
}

const card = JSON.parse(`

{
  "Id": 29,
  "Visible": true,
  "CanAttack": true,
  "Name": ["Stan the Great", "StG", "Savagekiller115"],
  "Description": "Charged:  Reduces {PowerAttackDecrease} attack of all enemies for {PowerDuration} seconds.",
  "Image": "StanFanCard",
  "ManaCost": 3,
  "damage": "30",
  "Health": "136",
  "HealthLoss": "0",
  "Type": "character",
  "Targeting": {
    "AssetId": "TargetSpellRet",
    "Radius": 0.0
  },
  "CharacterType": "melee",
  "Ingame": "StanFanCharPF",
  "AttackRange": 0.7,
  "TimeToReachMaxVelocity": 0.1,
  "MaxVelocity": 0.675,
  "TimeInBetweenAttacks": 0.5,
  "PowerDuration": 5,
  "PowerHeal": null,
  "PowerHeroHeal": null,
  "PowerMaxHpGain": null,
  "PowerMaxHpLoss": null,
  "PowerSummonLevel": null,
  "PowerDamage": null,
  "PowerHeroDamage": null,
  "PowerPoisonAmount": null,
  "PowerHeroPoison": null,
  "PowerAttackBoost": null,
  "PowerAttackDecrease": 21,
  "AgroRangeMultiplier": 2.86,
  "KnockbackImpulse": "30.0000",
  "KnockbackAngleDeg": 45.0,
  "ChargedPowerRegen": 0.07000002,
  "ChargedPowerRadius": "melee",
  "ChargedPowerReticle": "",
  "Rarity": "common",
  "Theme": "fantasy",
  "TechTree2": {
    "Slots": [
      {
        "x": 0,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 1,
        "property": "damage",
        "value": 3.0
      },
      {
        "x": 2,
        "property": "max_hp_health",
        "value": 7.0
      },
      {
        "x": 3,
        "property": "PowerAttackDecreaseAbs",
        "value": 5.0
      },
      {
        "x": 4,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 5,
        "property": "max_hp_health",
        "value": 5.0
      },
      {
        "x": 6,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 7,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 8,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 9,
        "property": "max_hp_health",
        "value": 8.0
      },
      {
        "x": 10,
        "property": "PowerAttackDecreaseAbs",
        "value": 11.0
      },
      {
        "x": 11,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 12,
        "property": "max_hp_health",
        "value": 10.0
      },
      {
        "x": 13,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 14,
        "property": "max_hp_health",
        "value": 4.0
      },
      {
        "x": 15,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 16,
        "property": "max_hp_health",
        "value": 4.0
      },
      {
        "x": 17,
        "property": "PowerAttackDecreaseAbs",
        "value": 11.0
      },
      {
        "x": 18,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 19,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 20,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 21,
        "property": "max_hp_health",
        "value": 7.0
      },
      {
        "x": 22,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 23,
        "property": "max_hp_health",
        "value": 8.0
      },
      {
        "x": 24,
        "property": "PowerAttackDecreaseAbs",
        "value": 3.0
      },
      {
        "x": 25,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 26,
        "property": "max_hp_health",
        "value": 4.0
      },
      {
        "x": 27,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 28,
        "property": "max_hp_health",
        "value": 5.0
      },
      {
        "x": 29,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 30,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 31,
        "property": "PowerAttackDecreaseAbs",
        "value": 5.0
      },
      {
        "x": 32,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 33,
        "property": "max_hp_health",
        "value": 8.0
      },
      {
        "x": 34,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 35,
        "property": "max_hp_health",
        "value": 10.0
      },
      {
        "x": 36,
        "property": "damage",
        "value": 3.0
      },
      {
        "x": 37,
        "property": "max_hp_health",
        "value": 12.0
      },
      {
        "x": 38,
        "property": "PowerAttackDecreaseAbs",
        "value": 10.0
      },
      {
        "x": 39,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 40,
        "property": "max_hp_health",
        "value": 4.0
      },
      {
        "x": 41,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 42,
        "property": "max_hp_health",
        "value": 5.0
      },
      {
        "x": 43,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 44,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 45,
        "property": "PowerAttackDecreaseAbs",
        "value": 6.0
      },
      {
        "x": 46,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 47,
        "property": "max_hp_health",
        "value": 8.0
      },
      {
        "x": 48,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 49,
        "property": "max_hp_health",
        "value": 10.0
      },
      {
        "x": 50,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 51,
        "property": "max_hp_health",
        "value": 12.0
      },
      {
        "x": 52,
        "property": "PowerAttackDecreaseAbs",
        "value": 12.0
      },
      {
        "x": 53,
        "property": "damage",
        "value": 3.0
      },
      {
        "x": 54,
        "property": "max_hp_health",
        "value": 3.0
      },
      {
        "x": 55,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 56,
        "property": "max_hp_health",
        "value": 4.0
      },
      {
        "x": 57,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 58,
        "property": "max_hp_health",
        "value": 5.0
      },
      {
        "x": 59,
        "property": "PowerAttackDecreaseAbs",
        "value": 6.0
      },
      {
        "x": 60,
        "property": "damage",
        "value": 1.0
      },
      {
        "x": 61,
        "property": "max_hp_health",
        "value": 6.0
      },
      {
        "x": 62,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 63,
        "property": "max_hp_health",
        "value": 7.0
      },
      {
        "x": 64,
        "property": "damage",
        "value": 2.0
      },
      {
        "x": 65,
        "property": "max_hp_health",
        "value": 9.0
      },
      {
        "x": 66,
        "property": "PowerAttackDecreaseAbs",
        "value": 12.0
      },
      {
        "x": 67,
        "property": "damage",
        "value": 3.0
      },
      {
        "x": 68,
        "property": "max_hp_health",
        "value": 12.0
      }
    ],
    "Evolve": [
      {
        "StarLevel": 0,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 19.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 4.0
          }
        ]
      },
      {
        "StarLevel": 1,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 29.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 6.0
          }
        ]
      },
      {
        "StarLevel": 2,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 39.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 9.0
          }
        ]
      },
      {
        "StarLevel": 3,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 48.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 11.0
          }
        ]
      },
      {
        "StarLevel": 4,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 78.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 17.0
          }
        ]
      },
      {
        "StarLevel": 5,
        "Slots": [
          {
            "x": 0,
            "property": "max_hp_health",
            "value": 97.0
          },
          {
            "x": 0,
            "property": "damage",
            "value": 21.0
          }
        ]
      }
    ]
  },
  "Requirements": {
    "MinEpisodeCompleted": 3,
    "MinPlayerLevel": 0,
    "MinPvpRank": 20
  },
  "AoeAttackType": false,
  "AoeDamagePercentage": 0.0,
  "AoeRadius": 0.0,
  "AoeKnockbackPercentage": 0.0,
  "TargetingType": "Ground",
  "PreAttackDelay": 0.0,
  "CastArea": "ownside",
  "ChildUnitLimit": 0
}

`);

require("fs").writeFileSync("./snake_string.json", JSON.stringify(transformCard(snakeify(card))));
