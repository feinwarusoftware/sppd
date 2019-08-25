const colours = {
  rare: "#BB4600",
  epic: "#C1C1C1",
  legendary: "#E9B845",
  adventure: "#4f80ba",
  fantasy: "#d34f5f",
  general: "#857468",
  mystical: "#4b9b38",
  "sci-fi": "#db571d",
  sup: "#fd6cf8",
  superhero: "#fd6cf8"
};

export { colours };

// TODO: test
// Converts a map to an object
export const mapToObject = map => {
  const obj = {};
  map.forEach((v, k) => { obj[k] = v; });

  return obj;
}

// TODO: test
// Reverse of Object.entries()
export const objectFromEntries = entries => {
  return mapToObject(new Map(entries));
}

// TODO: test
// Converts card.rarity from the database format to the one used in code
export const cardRarityFromDb = dbRarity => {
  switch (dbRarity) {
    case 0: {
      return "common";
    }
    case 1: {
      return "rare";
    }
    case 2: {
      return "epic";
    }
    case 3: {
      return "legendary";
    }
  }

  return null;
}

// TODO: test
// Converts card.rarity from the format used in code to the one used by the database
export const cardRarityToDb = rarity => {
  switch (dbRarity) {
    case "common": {
      return 0;
    }
    case "rare": {
      return 1;
    }
    case "epic": {
      return 2;
    }
    case "legendary": {
      return 3;
    }
  }

  return null;
}

// TODO: test
// Converts card.theme from the database format to the one used in code
export const cardThemeFromDb = dbTheme => {
  if (dbTheme === "sci-fi") {
    return "scifi";
  }

  return dbTheme;
}

// TODO: test
// Converts card.theme from the format used in code to the one used by the database
export const cardThemeToDb = theme => {
  if (theme === "scifi") {
    return "sci-fi";
  }

  return theme;
}
