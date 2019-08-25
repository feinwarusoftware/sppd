"use strict";

import { checkImages } from "./image_load";

// All the card assets
const images = [
  // Frame outlines
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/frame-outlines/common/adventure.png"
  },
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/frame-outlines/common/fantasy.png"
  },
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/frame-outlines/common/general.png"
  },
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/frame-outlines/common/mystical.png"
  },
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/frame-outlines/common/scifi.png"
  },
  {
    asset: "frame-outline",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/frame-outlines/common/superhero.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "adventure",
    source: "/card-sprites/frame-outlines/special/adventure.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "fantasy",
    source: "/card-sprites/frame-outlines/special/fantasy.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "general",
    source: "/card-sprites/frame-outlines/special/general.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "mystical",
    source: "/card-sprites/frame-outlines/special/mystical.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "scifi",
    source: "/card-sprites/frame-outlines/special/scifi.png"
  },
  {
    asset: "frame-outline",
    rarity: ["rare", "epic", "legendary"],
    theme: "superhero",
    source: "/card-sprites/frame-outlines/special/superhero.png"
  },

  // Frame overlays
  {
    asset: "frame-overlay",
    type: "character",
    source: "/card-sprites/frame-overlays/character.png"
  },
  {
    asset: "frame-overlay",
    type: ["spell", "trap"],
    source: "/card-sprites/frame-overlays/spell.png"
  },

  // Frame tops
  {
    asset: "frame-top",
    rarity: "rare",
    source: "/card-sprites/frame-tops/rare.png"
  },
  {
    asset: "frame-top",
    rarity: "epic",
    source: "/card-sprites/frame-tops/epic.png"
  },
  {
    asset: "frame-top",
    rarity: "legendary",
    source: "/card-sprites/frame-tops/legendary.png"
  },

  // Theme icons
  {
    asset: "theme-icon",
    theme: "adventure",
    source: "/card-sprites/theme-icons/adventure.png"
  },
  {
    asset: "theme-icon",
    theme: "fantasy",
    source: " /card-sprites/theme-icons/fantasy.png"
  },
  {
    asset: "theme-icon",
    theme: "general",
    source: "/card-sprites/theme-icons/general.png"
  },
  {
    asset: "theme-icon",
    theme: "mystical",
    source: "/card-sprites/theme-icons/mystical.png"
  },
  {
    asset: "theme-icon",
    theme: "scifi",
    source: "/card-sprites/theme-icons/scifi.png"
  },
  {
    asset: "theme-icon",
    theme: "superhero",
    source: "/card-sprites/theme-icons/superhero.png"
  },

  // Theme stones
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/theme-stones/common/adventure.png"
  },
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/theme-stones/common/fantasy.png"
  },
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/theme-stones/common/general.png"
  },
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/theme-stones/common/mystical.png"
  },
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/theme-stones/common/scifi.png"
  },
  {
    asset: "theme-stone",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/theme-stones/common/superhero.png"
  },
  {
    asset: "theme-stone",
    rarity: "rare",
    source: "/card-sprites/theme-stones/special/rare.png"
  },
  {
    asset: "theme-stone",
    rarity: "epic",
    source: "/card-sprites/theme-stones/special/epic.png"
  },
  {
    asset: "theme-stone",
    rarity: "legendary",
    source: "/card-sprites/theme-stones/special/legendary.png"
  },

  // Type icons
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/assasin/common/adventure.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/assasin/common/fantasy.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/assasin/common/general.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/assasin/common/mystical.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/assasin/common/scifi.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/assasin/common/superhero.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "rare",
    source: "/card-sprites/type-icons/assasin/special/rare.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "epic",
    source: "/card-sprites/type-icons/assasin/special/epic.png"
  },
  {
    asset: "type-icon",
    character_type: "assasin",
    rarity: "legendary",
    source: "/card-sprites/type-icons/assasin/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/melee/common/adventure.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/melee/common/fantasy.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/melee/common/general.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/melee/common/mystical.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/melee/common/scifi.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/melee/common/superhero.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "rare",
    source: "/card-sprites/type-icons/melee/special/rare.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "epic",
    source: "/card-sprites/type-icons/melee/special/epic.png"
  },
  {
    asset: "type-icon",
    character_type: "melee",
    rarity: "legendary",
    source: "/card-sprites/type-icons/melee/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/ranged/common/adventure.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/ranged/common/fantasy.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/ranged/common/general.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/ranged/common/mystical.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/ranged/common/scifi.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/ranged/common/superhero.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "rare",
    source: "/card-sprites/type-icons/ranged/special/rare.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "epic",
    source: "/card-sprites/type-icons/ranged/special/epic.png"
  },
  {
    asset: "type-icon",
    character_type: "ranged",
    rarity: "legendary",
    source: "/card-sprites/type-icons/ranged/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/tank/common/adventure.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/tank/common/fantasy.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/tank/common/general.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/tank/common/mystical.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/tank/common/scifi.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/tank/common/superhero.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "rare",
    source: "/card-sprites/type-icons/tank/special/rare.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "epic",
    source: "/card-sprites/type-icons/tank/special/epic.png"
  },
  {
    asset: "type-icon",
    character_type: "tank",
    rarity: "legendary",
    source: "/card-sprites/type-icons/tank/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/totem/common/adventure.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/totem/common/fantasy.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/totem/common/general.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/totem/common/mystical.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/totem/common/scifi.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/totem/common/superhero.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "rare",
    source: "/card-sprites/type-icons/totem/special/rare.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "epic",
    source: "/card-sprites/type-icons/totem/special/epic.png"
  },
  {
    asset: "type-icon",
    character_type: "totem",
    rarity: "legendary",
    source: "/card-sprites/type-icons/totem/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/spell/common/adventure.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/spell/common/fantasy.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/spell/common/general.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/spell/common/mystical.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/spell/common/scifi.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/spell/common/superhero.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "rare",
    source: "/card-sprites/type-icons/spell/special/rare.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "epic",
    source: "/card-sprites/type-icons/spell/special/epic.png"
  },
  {
    asset: "type-icon",
    type: "spell",
    rarity: "legendary",
    source: "/card-sprites/type-icons/spell/special/legendary.png"
  },
  //
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "adventure",
    source: "/card-sprites/type-icons/trap/common/adventure.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "fantasy",
    source: "/card-sprites/type-icons/trap/common/fantasy.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "general",
    source: "/card-sprites/type-icons/trap/common/general.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "mystical",
    source: "/card-sprites/type-icons/trap/common/mystical.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "scifi",
    source: "/card-sprites/type-icons/trap/common/scifi.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "common",
    theme: "superhero",
    source: "/card-sprites/type-icons/trap/common/superhero.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "rare",
    source: "/card-sprites/type-icons/trap/special/rare.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "epic",
    source: "/card-sprites/type-icons/trap/special/epic.png"
  },
  {
    asset: "type-icon",
    type: "trap",
    rarity: "legendary",
    source: "/card-sprites/type-icons/trap/special/legendary.png"
  }
];

// Goes through the card assets and returns the required ones based on the card
export const getRequiredImages = card => {
  return images.filter(e => {
    const { asset, source } = e;
  
    delete e.asset;
    delete e.source;
  
    const keep = Object.entries(e).reduce((p, c) => p && (c[1] instanceof Array ? c[1].includes(card[c[0]]) : c[1] === card[c[0]]), true);
  
    if (keep) {
      e.asset = asset;
      e.source = source;
    }
  
    return keep;
  });
}

// Loads all the required images for a given card
export const loadRequiredImages = card => {
  const requiredImages = [ ...getRequiredImages(card), { asset: "background", source: `/backgrounds/${card.image}.jpg` } ];

  return new Promise((resolve, reject) => {
    checkImages(requiredImages.map(e => e.source))
      .then(images => resolve(requiredImages.map(e => ({ ...e, image: images.find(f => f.src.slice(-e.source.length) === e.source) }))))
      .catch(reject);
  });
}
