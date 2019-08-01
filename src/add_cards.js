"use strict";

const fs = require("fs");
// const path = require("path");

const fetch = require("node-fetch");

const convert = require("./converter");

const host = process.env.HOST;

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
    ids = await fetch(`https://sppd.feinwaru.com/api/v1/cards/list`, {
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

    /*
    try {
      const search = await fetch(`${host}/api/v1/cards?name=${converted.name}`).then(res => res.json());
      if (search.data.cards.reduce((p, c) => p || c.name.toLowerCase() === converted.name, false)) {
        // patch
        let res;
        try {
            res = await fetch(`${host}/api/v1/cards/${ids.data.find(e => e.name === converted.name)._id}`, {
            method: "patch",
            body: JSON.stringify(converted),
            headers: {
              "Content-Type": "application/json",
              "xxx-access-token": process.env.ACCESS_TOKEN
            }
          }).then(res => res.json())
        } catch(error) {
          return console.error(`failed to patcj cards in the api: ${error}`);
        }

        if (res.success === false) {
          return console.error(`failed to patch cards in the api: ${JSON.stringify(res)}`); 
        }

        console.log(`${i}. patched: ${converted.name}`);
      } else {
        // post
        let res;
        try {
          res = await fetch(`${host}/api/v1/cards`, {
          //res = await fetch(`https://sppd.feinwaru.com/api/v1/cards/${ids.data.find(e => e.name === converted.name)._id}`, {
            method: "post",
            body: JSON.stringify(converted),
            headers: {
              "Content-Type": "application/json",
              "xxx-access-token": process.env.ACCESS_TOKEN
            }
          }).then(res => res.json())
        } catch(error) {
          return console.error(`failed to add cards to the api: ${error}`);
        }

        if (res.success === false) {
          return console.error(`failed to add cards to the api: ${JSON.stringify(res)}`); 
        }

        console.log(`${i}. posted: ${converted.name}`);
      }
    } catch(error) {
      console.error("error searching for converted card");
      process.exit(-1);
    }
    */
    
    let res;
    try {
      //res = await fetch("https://sppd.feinwaru.com/api/v1/cards", {
      res = await fetch(`https://sppd.feinwaru.com/api/v1/cards/${ids.data.find(e => e.name === converted.name)._id}`, {
        method: "patch",
        body: JSON.stringify(converted),
        headers: {
          "Content-Type": "application/json",
          "xxx-access-token": "1fuck2red3lynx"
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
