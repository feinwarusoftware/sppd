"use strict";

const router = require("express").Router();

const CardModel = require("./card_model");

const cardPageLimit = 12;

router.get("/", (req, res) => {
    // returns basic api info

    // TODO: add more info
    res.json({
        code: 200,
        success: true,
        data: {
            version: "1"
        },
        error: null
    });
});

router.get("/docs", (req, res) => {
    // returns md docs

    // TODO: make this not suck
    res.json({
        code: 200,
        success: true,
        data: {
            routes: [
                "GET /",
                "GET /docs",
                "GET /cards",
                "GET /cards/:id"
            ]
        },
        error: null
    });
});

router.get("/cards", (req, res) => {
    // name
    // theme
    // rarity
    // sort (name | theme | rarity | energy | damage | health)
    // order (1 | -1)

    const name = req.query.name;
    const theme = req.query.theme;
    const rarity = req.query.rarity;

    const sort = req.query.sort;
    const order = req.query.order || 1;

    const page = req.query.page || 0;
    const limit = Math.min(req.query.limit || cardPageLimit, cardPageLimit);

    CardModel
        .find({
            ...( name == null ? {} : { name: `/${name}/i` } ),
            ...( theme == null ? {} : { theme } ),
            ...( rarity == null ? {} : { rarity } )
        })
        .sort(sort == null ? {} : { [sort]: order })
        .skip(page * limit)
        .limit(limit)
        .select({ __v: 0 })

        .then(cards => {
            res.json({
                code: 200,
                success: true,
                data: cards,
                error: null
            });
        })
        .catch(error => {
            res.json({
                code: 500,
                success: false,
                data: null,
                error
            });
        });
});

router.get("/cards/:id", (req, res) => {
    // id = mongo_id

    CardModel
        .findById(req.params.id)
        .select({ __v: 0 })

        .then(card => {
            if (card == null) {
                return req.json({
                    code: 404,
                    success: true,
                    data: null,
                    error: null
                });
            }

            res.json({
                code: 200,
                success: true,
                data: card,
                error: null
            });
        })
        .catch(error => {
            res.json({
                code: 500,
                success: false,
                data: null,
                error
            });
        });
});

module.exports = router;
