"use strict";

const fs = require("fs");
// const path = require("path");

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

const upgradeSequence = [4, 10, 10, 15, 15, 15];

const baseLevel = 1;
const baseUpgrade = 1;

const type = process.argv[3];
if (type == null) {
  return console.error("no type specified");
}
if (type !== "u" && type !== "l") {
  return console.error("incorrect type specified");
}

const value = parseInt(process.argv[4]);
if (isNaN(value) === true) {
  return console.error("no value specified");
}
if (typeof value !== "number") {
  return console.error("incorrect value specified");
}
if (value < 1 || (type === "l" && value > 7) || (type === "u" && value > 70)) {
  return console.error("out of bounds value specified");
}

let requiredLevels = 0;
let requiredUpgrades = 0;

if (type === "u") {
  let currentLevels = 0;
  let currentUpgrades = 0;

  for (let i = 0; i < upgradeSequence.length; i++) {
    currentUpgrades += upgradeSequence[i];
    
    if (value < (currentUpgrades + baseUpgrade + 1)) {
      break;
    }

    currentLevels++;
  }

  requiredLevels = currentLevels;
  requiredUpgrades = value - baseUpgrade;
}

if (type === "l") {
  requiredLevels = value - baseLevel;
  requiredUpgrades = upgradeSequence.slice(0, requiredLevels).reduce((a, c) => a + c, 0);
}

/*
const addReduceSlot = (a, c) => {
  if (a[c.property] == null) {
    a[c.property] = c.value;
  } else {
    a[c.property] += c.value;
  }

  return a;
};

const alteredStats = [
  card.tech_tree.slots.slice(0, requiredUpgrades).reduce(addReduceSlot, {}),
  card.tech_tree.levels.slice(0, requiredLevels).reduce((a, c) => [a, c.slots.reduce(addReduceSlot, {})].reduce(addReduceSlot), {})
].reduce(addReduceSlot, {});
*/

const addReduceSlot = (a, c) => a[c.property] == null ? { ...a, [c.property]: c.value } : { ...a, [c.property]: a[c.property] + c.value };
const alteredStats = card.tech_tree.slots.slice(0, requiredUpgrades).reduce(addReduceSlot, card.tech_tree.levels.slice(0, requiredLevels).reduce((a, c) => [ ...a, ...c.slots ], []).reduce(addReduceSlot, {}));

// stat merge
let alteredCard = { ...card };

if (alteredStats.power_unlock != null) {
  alteredCard.is_power_locked = false;
  delete alteredStats.power_unlock;
}

alteredCard = [alteredStats].reduce((a, c) => {
  for (let [k, v] of Object.entries(c)) {
    if (k.startsWith("stat_")) {
      if (a[k.slice(5)] != null) {
        a[k.slice(5)] += v;
      } else if (a[k.slice(9)] != null) { 
        a[k.slice(9)] += v;
      } else {
        return console.error("error applying upgrade stats 1");
      }
    } else if (k.startsWith("power_")) {
      const powerIndex = a.powers.findIndex(e => e.type === k)

      if (powerIndex != null) {
        a.powers[powerIndex] += v;
      } else {
        // if power duration is specified, assume
        //  that there is only one power
        if (k === "power_duration") {
          a.powers[0].duration += v;
        } else {
          return console.error("error applying upgrade stats 2");
        }
      }
      /*
      if (a.power_type === k) {
        a.power_amount += v;
      } else {
        if (a[k] != null) {
          a[k] += v;
        } else {
          return console.error("error applying upgrade stats 2");
        }
      }
      */
    } else {
      return console.error("error applying upgrade stats 3");
    }
  }

  return a;
}, alteredCard);

alteredCard.description = alteredCard.description.replace(/\{(.*?)\}/g, match => {
  let bracketless = match.slice(1, match.length - 1);

  if (bracketless === "power_hero_damage") {
    const powerIndex = alteredCard.powers.findIndex(e => e.type === "power_damage");

    if (powerIndex !== -1) {
      return alteredCard.powers[powerIndex].amount / 10;
    }
    // continue to check for power_hero_damage
  }

  if (alteredCard[bracketless] == null) {
    let mx = 0;
    if (bracketless.slice(-3) === "min") {
      mx = -1;
      bracketless = bracketless.slice(0, bracketless.length - 4);
    } else if (bracketless.slice(-3) === "max") {
      mx = 1;
      bracketless = bracketless.slice(0, bracketless.length - 4);
    }

    const powerIndex = alteredCard.powers.findIndex(e => e.type === bracketless);

    if (powerIndex !== -1) {
      return alteredCard.powers[powerIndex].amount + mx;
    } else {
      return "undefined"
    }

    /*
    if (bracketless === alteredCard.power_type) {
      return alteredCard.power_amount;
    } else {
      return "undefined";
    }
    */
  } else {
    return alteredCard[bracketless];
  }
});

// if power is locked, assume only one power present
if ((alteredCard.powers[0] || {}).locked === true) {
  alteredCard.description = "Power locked at this level/upgrade."
}

/*
if (alteredCard.is_power_locked === true) {
  alteredCard.description = "Power locked at this level/upgrade."
}
*/

console.log((card => {
  delete card.tech_tree;
  return card;
})(alteredCard));
