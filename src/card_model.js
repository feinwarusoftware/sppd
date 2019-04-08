"use strict";

const mongoose = require("mongoose");

const defValidEnum = list => ({
    default: list[0],
    type: String,
    enum: list
});

const defValidString = {
    default: "",
    type: String
};

const defValidNumber = {
    default: 0,
    type: Number
};

const defValidBool = {
    default: false,
    type: Boolean
};

const typeTypes = [
    "character",
    "spell",
    "spawn"
];

const characterTypeTypes = [
    "assassin",
    "melee",
    "tank",
    "ranged",
    "totem",

    null
];

const themeTypes = [
    "adventure",
    "mystical",
    "sci-fi",
    "fantasy",
    "general"
];

const castAreaTypes = [
    "own_side",
    "anywhere"
];

const powerTypes = [
    "power_heal",
    "power_hero_heal",
    "power_max_hp_gain",
    "power_max_hp_loss",
    "power_summon_level",
    "power_damage",
    "power_hero_damage",
    "power_poison",
    "power_hero_poison",
    "power_attack_boost",
    "power_attack_decrease",

    // spell target count
    "power_target",

    null
];

const aoeTypes = [
    "on_target",
    "on_unit",

    null
];

const upgradeTypes = [
    // unlocks a locked power
    "power_unlock",

    // increase power stats
    ...powerTypes,

    "power_duration",
    "power_range",

    // increases the units passive stats
    "stat_max_health",
    "stat_damage",
    "stat_charged_power_regen"
];

const slotSchema = new mongoose.Schema({
    property: defValidEnum(upgradeTypes),
    value: defValidNumber
}, {
    _id: false
});

const levelSchema = new mongoose.Schema({
    slots: [ slotSchema ]
}, {
    _id: false
});

const techTreeSchema = new mongoose.Schema({
    slots: [ slotSchema ],
    levels: [ levelSchema ]
}, {
    _id: false
});

const powerSchema = new mongoose.Schema({
    type: defValidEnum(powerTypes),
    amount: defValidNumber,

    duration: defValidNumber,

    is_charged: defValidBool,
    charged_regen: defValidNumber,
    
    radius: defValidNumber,
    locked: defValidBool
}, {
    _id: false
});

const cardSchema = new mongoose.Schema({
    // _id

    name: {
        required: true,
        type: String
    },
    aliases: [ String ],
    description: defValidString,
    image: defValidString,
    mana_cost: defValidNumber,
    damage: defValidNumber,
    health: defValidNumber,
    type: defValidEnum(typeTypes),
    character_type: defValidEnum(characterTypeTypes),
    rarity: defValidNumber,
    theme: defValidEnum(themeTypes),
    health_loss: defValidNumber,

    cast_area: defValidEnum(castAreaTypes),

    max_velocity: defValidNumber,
    time_to_reach_max_velocity: defValidNumber,
    agro_range_multiplier: defValidNumber,

    can_attack: defValidBool,
    attack_range: defValidNumber,
    pre_attack_delay: defValidNumber,
    knockback: defValidNumber,
    knockback_angle: defValidNumber,
    time_between_attacks: defValidNumber,

    /*
    has_power: defValidBool,
    power_type: defValidEnum(powerTypes),
    power_amount: defValidNumber,
    power_duration: defValidNumber,
    is_power_charged: defValidBool,
    charged_power_regen: defValidNumber,
    charged_power_radius: defValidNumber,
    is_power_locked: defValidBool,
    */

    powers: [ powerSchema ],

    has_aoe: defValidBool,
    aoe_type: defValidEnum(aoeTypes),
    aoe_damage_percentage: defValidNumber,
    aoe_knockback_percentage: defValidNumber,
    aoe_radius: defValidNumber,

    min_episode_completed: defValidNumber,
    min_pvp_rank: defValidNumber,
    min_player_level: defValidNumber,

    tech_tree: techTreeSchema
});

module.exports = mongoose.model("Card", cardSchema);
