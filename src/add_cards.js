"use strict";

const fs = require("fs");
// const path = require("path");

const fetch = require("node-fetch");

const convert = require("./converter");

const fp = process.argv[2];
if (fp == null) {
  return console.error("fp required");
}

let cards;
try {
  cards = JSON.parse(fs.readFileSync(fp))
} catch(error) {
  return console.error(`failed to read json input: ${error}`);
}

(async () => {
  let ids;
  try {
    ids = await fetch("http://dragon.feinwaru.com/api/v1/cards/list", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  } catch(error) {
    return console.error(`failed to get card id from the api: ${error}`);
  }

  for (let [i, card] of cards.entries()) {
    let converted;
    try {
      converted = convert(card);
    } catch(error) {
      return console.error(`failed to convert card to new format: ${error}`); 
    }

    if (converted.name !== "Sharpshooter Shelly") {
      continue;
    }

    let res;
    try {
      res = await fetch("http://dragon.feinwaru.com/api/v1/cards", {
      /*res = await fetch(`http://dragon.feinwaru.com/api/v1/cards/${ids.data.find(e => e.name === converted.name)._id}`, {*/
        method: "post",
        body: JSON.stringify(converted),
        headers: {
          "Content-Type": "application/json",
          "xxx-access-token": "rawrxd"
        }
      }).then(res => res.json())
    } catch(error) {
      return console.error(`failed to add cards to the api: ${error}`);
    }

    if (res.success === false) {
      return console.error(`failed to add cards to the api: ${JSON.stringify(res)}`); 
    }
    
    console.log(`${i}. ${converted.name}`);
  }
})();
