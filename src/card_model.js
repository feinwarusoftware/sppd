"use strict";

const mongoose = require("mongoose");

const powerTypes = [
    "none",
    "heal",
    "hero_heal",
    "max_hp_gain",
    "max_hp_loss",
    "summon_level",
    "damage",
    "poison_amount",
    "hero_poison",
    "attack_boost",
    "attack_decrease"
];

const cardTechTreeSlotSchema = new mongoose.Schema({
    property: {
        default: "none",
        type: String,
        enum: powerTypes
    },
    value: {
        default: 0,
        type: Number
    }
}, {
    _id: false
});

const cardTechTreeEvolveSchema = new mongoose.Schema({
    slots: [ cardTechTreeSlotSchema ]
}, {
    _id: false
});

const cardTechTreeSchema = new mongoose.Schema({
    slots: [ cardTechTreeSlotSchema ],
    evolve: [ cardTechTreeEvolveSchema ]
}, {
    _id: false
});

const cardRequirementsSchema = new mongoose.Schema({
    min_episode_completed: {
        default: 0,
        type: Number
    },
    min_player_level: {
        default: 0,
        type: Number
    },
    min_pvp_rank: {
        default: 0,
        type: Number
    }
}, {
    _id: false
});

const cardSchema = new mongoose.Schema({
    // _id

    // basic info
    visible: {
        default: true,
        type: Boolean
    },
    can_attack: {
        default: true,
        type: Boolean
    },

    // basic visible
    name: {
        required: true,
        type: String
    },
    aliases: [ String ],
    description: {
        default: null,
        type: String  
    },
    image: {
        default: null,
        type: String
    },

    // basic stats
    mana_cost: {
        default: 0,
        type: Number
    },
    damage: {
        default: 0,
        type: Number
    },
    health: {
        default: 0,
        type: Number
    },
    health_loss: {
        default: 0,
        type: Number
    },
    type: {
        default: "character",
        type: String,
        enum: ["character", "spell"]
    },
    character_type: {
        default: "melee",
        type: String,
        enum: ["ranged", "assasin", "melee", "tank", "totem"]
    },
    rarity: {
        default: "common",
        type: String,
        enum: ["common", "rare", "epic", "legendary"]
    },
    theme: {
        default: "fantasy",
        type: String,
        enum: ["adventure", "mystical", "sci-fi", "fantasy", "general"]
    },

    // adv stats
    attack_range: {
        default: 0,
        type: Number
    },
    time_to_reach_max_velocity: {
        default: 0,
        type: Number
    },
    max_velocity: {
        default: 0,
        type: Number
    },
    time_in_between_attacks: {
        default: 0,
        type: Number
    },
    aoe_attack_type: {
        default: false
    },
    aoe_damage_percentage: {
        default: 0,
        type: Number
    },
    aoe_radius: {
        default: 0,
        type: Number
    },
    aoe_knockback_percentage: {
        default: 0,
        type: Number
    },
    targeting_type: {
        default: "ground",
        type: String,
        enum: ["ground", "both"]
    },
    pre_attack_delay: {
        default: 0,
        type: Number
    },
    cast_area: {
        default: "ownside",
        type: String,
        enum: ["ownside", "anywhere"]
    },
    child_unit_limit: {
        default: 0,
        type: Number
    },
    agro_range_multiplier: {
        default: 0,
        type: Number
    },
    knockback_impulse: {
        default: 0,
        type: Number
    },
    knockback_angle_degrees: {
        default: 0,
        type: Number
    },
    requirements: cardRequirementsSchema,

    // power stats
    power_type: {
        default: "none",
        type: String,
        enum: powerTypes
    },
    power_duration: {
        default: 0,
        type: Number
    },
    power_amount: {
        default: 0,
        type: Number
    },
    charged_power_regen: {
        default: 0,
        type: Number
    },
    charged_power_radius: {
        default: 0,
        type: Number
    },
    
    // tech tree
    tech_tree: cardTechTreeSchema
});

module.exports = mongoose.model("Card", cardSchema);
