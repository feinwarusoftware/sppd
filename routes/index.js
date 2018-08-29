/* some text goes here */

"use strict";

const express = require("express");
const router = express.Router();

const cards = require("../static/cards.json");

router.get("/", (req, res) => {

    return res.render("index");
});

router.get("/:card", (req, res) => {

    const card = cards.find(e => {
        return e.Image === req.params.card;
    });

    if (card === undefined) {

        return res.render("404");
    }

    return res.render("card", { card });
});

module.exports = router;
