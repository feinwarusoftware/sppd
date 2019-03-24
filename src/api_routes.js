"use strict";

const router = require("express").Router();

const CardModel = require("./card_model");

const cardPageLimit = 12;

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

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
    res.setHeader("Access-Control-Allow-Origin", "*");

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    
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

    //
    
    const search = {
        ...( name == null ? {} : { name: { $regex: name, $options: "i" } } ),
        ...( theme == null ? {} : { theme } ),
        ...( rarity == null ? {} : { rarity } )
    };

    CardModel
        .count()

        .then(total => {
            CardModel
                .count(search)
                
                .then(matched => {
                    CardModel
                        .find(search)
                        .collation({ locale: "en" })
                        .sort(sort == null ? {} : { [sort]: order })
                        .skip(page * limit)
                        .limit(limit)
                        .select({ __v: 0, tech_tree: 0 })
                
                        .then(cards => {
                            res.json({
                                code: 200,
                                success: true,
                                data: {
                                    total,
                                    matched,
                                    cards
                                },
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
                })
                .catch(error => {
                    res.json({
                        code: 500,
                        success: false,
                        data: null,
                        error
                    });
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

router.post("/cards", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const card = new CardModel(req.body);

    card
        .save()

        .then(() => {
            res.json({
                code: 200,
                success: true,
                data: null,
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
    res.setHeader("Access-Control-Allow-Origin", "*");
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

router.patch("/cards/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    CardModel
        .updateOne({ _id: req.params.id }, req.body)

        .then(() => {
            res.json({
                code: 200,
                success: true,
                data: null,
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

router.delete("/cards/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    CardModel
        .deleteOne({ _id: req.params.id })

        .then(() => {
            res.json({
                code: 200,
                success: true,
                data: null,
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
