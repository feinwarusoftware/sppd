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

function removeUnderscores(string) {
  string = string.replace(/_/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  return string;
  

}

export { colours, removeUnderscores };
