import * as utils from "./utils";

//Remove Underscores
// power_hero_heal
test("Replaces underscores with spaces and capitalises the first letter of each word", () => {
  expect(utils.removeUnderscores("power_hero_heal")).toBe("Power Hero Heal");
});

// power - only cap
test("Capitalises the first letter of the word", () => {
  expect(utils.removeUnderscores("power")).toBe("Power");
});

// Power Hero Heal - no change
test("No change", () => {
  expect(utils.removeUnderscores("Power Hero Heal")).toBe("Power Hero Heal");
});
