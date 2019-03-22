"use strict";

/*
// /^[a-z0-9]+$/i
const isFirstAlphanumeric = (string, index) => {
    let alphanumeric = true;

    for (let i = 0; i < index; i++) {
        if (/^[a-z0-9]+$/i.test(string[i]) === true) {

            alphanumeric = false;
        }
    }

    return alphanumeric;
}

// /^[a-z0-9]+$/i
const isAlphanumeric = letter => {
    const alphanumeric = /^[a-z0-9]+$/i.test(letter);

    return alphanumeric;
}

// converts all camelcase in a string to snake case.
const snakeCaseify = camelString => {
    const camelWords = camelString.split(" ");
    const snakeWords = [];

    camelWords.forEach(word => {
        let snakeWord = "";

        Array.from(word).forEach((letter, i) => {
            const lowerLetter = letter.toLowerCase();

            if (letter !== lowerLetter) {
                // is uppercase
                if (i !== 0 && isAlphanumeric(letter) && !isFirstAlphanumeric(word, i)) {
                    snakeWord += "_";
                }

                snakeWord += lowerLetter;

                return;
            }

            snakeWord += letter;
        });

        snakeWords.push(snakeWord);
    });

    const snakeString = snakeWords.join(" ");

    return snakeString;
}
*/

const snakeCaseify = card => {
    const stats = { ...card };

    for (let stat in stats) {

        let snakeWord = "";

        Array.from(stat).forEach((letter, i) => {
            const lowerLetter = letter.toLowerCase();

            if (letter !== lowerLetter) {
                // is uppercase
                if (i !== 0) {
                    snakeWord += "_";
                }

                snakeWord += lowerLetter;

                return;
            }

            snakeWord += letter;
        });

        if (stats[stat] instanceof Array) {
            stats[snakeWord] = stats[stat].map(e => snakeCaseify(e));
        }
        else if (stats[stat] instanceof Object) {
            stats[snakeWord] = snakeCaseify(stats[stat]);
        } else {
            stats[snakeWord] = stats[stat];
        }

        delete stats[stat];
    }

    return stats;
}

// transforms power_type & power_amount to new format
// intended to be called with an object with snake_case field names
const transformCard = card => {
    // deep copy
    const stats = { ...card }; 

    for (let stat in stats) {
        if (stat.startsWith("power") && stats[stat] !== null) {
            stats.power_type = stat.slice(6);
            stats.power_amount = stats[stat];
        }
    }

    if (stats.power_type == null) {
        stats.power_type = "none";
        stats.power_amount = 0;
    }

    return stats;
}

// renames PVP to pvp, HP to hp, and AOE to aoe, for snakeCaseify
const cleanCard = card => {
    // deep copy
    const stats = { ...card };

    let string = JSON.stringify(stats);
    string = string.split("PVP").join("pvp");
    string = string.split("HP").join("hp");
    string = string.split("AOE").join("aoe");

    return JSON.parse(string);
}

const prepCardForImport = card => {
    const stats = { ...card };

    const cleaned = cleanCard(stats);
    const snakeString = snakeCaseify(cleaned);
    const transformed = transformCard(snakeString);

    return transformed;
}

const card = JSON.parse(`{
    "Id": 10,
    "Visible": true,
    "CanAttack": true,
    "Name": ["Pocahontas Randy", "Indian Randy", "Poca"],
    "Description": "Charged:  Calls an Indian kid to the battle.",
    "Image": "RandyAdvCard",
    "ManaCost": 5,
    "Damage": "40",
    "Health": "400",
    "HealthLoss": "0",
    "Type": "Character",
    "Targeting": {
      "AssetId": "SpellSpellRet",
      "Radius": 0.0
    },
    "CharacterType": "Melee",
    "Ingame": "RandyAdvCharPF",
    "AttackRange": 0.8,
    "TimeToReachMaxVelocity": 0.1,
    "MaxVelocity": 0.495,
    "TimeInBetweenAttacks": 0.5,
    "PowerDuration": null,
    "PowerHeal": null,
    "PowerHeroHeal": null,
    "PowerMaxHPGain": null,
    "PowerMaxHPLoss": null,
    "PowerSummonLevel": 1,
    "PowerDamage": null,
    "PowerHeroDamage": null,
    "PowerPoisonAmount": null,
    "PowerHeroPoison": null,
    "PowerAttackBoost": null,
    "PowerAttackDecrease": null,
    "AgroRangeMultiplier": 2.5,
    "KnockbackImpulse": "30.0000",
    "KnockbackAngleDeg": 45.0,
    "ChargedPowerRegen": 0.07000002,
    "ChargedPowerRadius": 2.0,
    "ChargedPowerReticle": "",
    "Rarity": 2,
    "Theme": "Adv",
    "TechTree2": {
      "Slots": [
        {
          "x": 0,
          "property": "MaxHealth",
          "value": 12.0
        },
        {
          "x": 1,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 2,
          "property": "MaxHealth",
          "value": 15.0
        },
        {
          "x": 3,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 4,
          "property": "MaxHealth",
          "value": 11.0
        },
        {
          "x": 5,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 6,
          "property": "MaxHealth",
          "value": 14.0
        },
        {
          "x": 7,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 8,
          "property": "MaxHealth",
          "value": 17.0
        },
        {
          "x": 9,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 10,
          "property": "MaxHealth",
          "value": 21.0
        },
        {
          "x": 11,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 12,
          "property": "MaxHealth",
          "value": 25.0
        },
        {
          "x": 13,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 14,
          "property": "MaxHealth",
          "value": 11.0
        },
        {
          "x": 15,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 16,
          "property": "MaxHealth",
          "value": 14.0
        },
        {
          "x": 17,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 18,
          "property": "MaxHealth",
          "value": 17.0
        },
        {
          "x": 19,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 20,
          "property": "MaxHealth",
          "value": 21.0
        },
        {
          "x": 21,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 22,
          "property": "MaxHealth",
          "value": 25.0
        },
        {
          "x": 23,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 24,
          "property": "MaxHealth",
          "value": 8.0
        },
        {
          "x": 25,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 26,
          "property": "MaxHealth",
          "value": 9.0
        },
        {
          "x": 27,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 28,
          "property": "MaxHealth",
          "value": 11.0
        },
        {
          "x": 29,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 30,
          "property": "MaxHealth",
          "value": 14.0
        },
        {
          "x": 31,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 32,
          "property": "MaxHealth",
          "value": 16.0
        },
        {
          "x": 33,
          "property": "Damage",
          "value": 2.0
        },
        {
          "x": 34,
          "property": "MaxHealth",
          "value": 20.0
        },
        {
          "x": 35,
          "property": "Damage",
          "value": 3.0
        },
        {
          "x": 36,
          "property": "MaxHealth",
          "value": 24.0
        },
        {
          "x": 37,
          "property": "Damage",
          "value": 3.0
        },
        {
          "x": 38,
          "property": "MaxHealth",
          "value": 29.0
        },
        {
          "x": 39,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 40,
          "property": "MaxHealth",
          "value": 5.0
        },
        {
          "x": 41,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 42,
          "property": "MaxHealth",
          "value": 6.0
        },
        {
          "x": 43,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 44,
          "property": "MaxHealth",
          "value": 7.0
        },
        {
          "x": 45,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 46,
          "property": "MaxHealth",
          "value": 8.0
        },
        {
          "x": 47,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 48,
          "property": "MaxHealth",
          "value": 9.0
        },
        {
          "x": 49,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 50,
          "property": "MaxHealth",
          "value": 12.0
        },
        {
          "x": 51,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 52,
          "property": "MaxHealth",
          "value": 15.0
        },
        {
          "x": 53,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 54,
          "property": "MaxHealth",
          "value": 3.0
        },
        {
          "x": 55,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 56,
          "property": "MaxHealth",
          "value": 3.0
        },
        {
          "x": 57,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 58,
          "property": "MaxHealth",
          "value": 4.0
        },
        {
          "x": 59,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 60,
          "property": "MaxHealth",
          "value": 5.0
        },
        {
          "x": 61,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 62,
          "property": "MaxHealth",
          "value": 5.0
        },
        {
          "x": 63,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 64,
          "property": "MaxHealth",
          "value": 7.0
        },
        {
          "x": 65,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 66,
          "property": "MaxHealth",
          "value": 8.0
        },
        {
          "x": 67,
          "property": "Damage",
          "value": 1.0
        },
        {
          "x": 68,
          "property": "MaxHealth",
          "value": 10.0
        }
      ],
      "Evolve": [
        {
          "StarLevel": 0,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 73.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 7.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        },
        {
          "StarLevel": 1,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 220.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 22.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        },
        {
          "StarLevel": 2,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 147.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 15.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        },
        {
          "StarLevel": 3,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 73.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 7.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        },
        {
          "StarLevel": 4,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 73.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 7.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        },
        {
          "StarLevel": 5,
          "Slots": [
            {
              "x": 0,
              "property": "MaxHealth",
              "value": 73.0
            },
            {
              "x": 0,
              "property": "Damage",
              "value": 7.0
            },
            {
              "x": 0,
              "property": "PowerSummonLevelAbs",
              "value": 1.0
            }
          ]
        }
      ]
    },
    "Requirements": {
      "MinEpisodeCompleted": 0,
      "MinPlayerLevel": 0,
      "MinPVPRank": 15
    },
    "AOEAttackType": "No",
    "AOEDamagePercentage": 0.0,
    "AOERadius": 0.0,
    "AOEKnockbackPercentage": 0.0,
    "TargetingType": "Ground",
    "PreAttackDelay": 0.0,
    "CastArea": "OwnSide",
    "ChildUnitLimit": 5
  }`);

require("fs").writeFileSync("./snake_string.json", JSON.stringify(prepCardForImport(card)));
