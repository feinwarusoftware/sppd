"use strict";

const router = require("express").Router();

const CardModel = require("./card_model");
const UpdateModel = require("./update_model");

const cardPageLimit = 12;
const updatePageLimit = 12;

const resForbidden = {
    code: 403,
    success: false,
    data: null,
    error: "You are forbidden from accessing this route."
};

const apiToken = process.env.API_TOKEN || (() => { throw("api token not specified"); })();

const allowCors = res => {
    res.setHeader("Access-Control-Allow-Origin", "*");
};

const validateToken = token => {
    return apiToken === token;
}

router.get("/", (req, res) => {
    allowCors(res);

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
    allowCors(res);

    // returns md docs

    // TODO: make this not suck
    res.json({
        code: 200,
        success: true,
        data: {
            key: {
                "*": "requires token"
            },
            routes: [
                "GET /",
                "GET /docs",
                "GET /cards",
                "*POST /cards",
                "GET /cards/:id",
                "*PUT /cards/:id",
                "*DELETE /cards/:id",
                "GET /updates",
                "*POST /updates",
                "GET /updates/:id",
                "*PUT /updates/:id",
                "*DELETE /updates/:id",
            ]
        },
        error: null
    });
});

router.get("/cards", (req, res) => {
    allowCors(res);
    
    // name
    // theme
    // rarity
    // sort (name | theme | rarity | energy | damage | health)
    // order (1 | -1)

    const name = req.query.name;
    const theme = req.query.theme;
    const rarity = req.query.rarity;
    const type = req.query.type;
    const character_type = req.query.character_type;

    //

    const sort = req.query.sort;
    const order = req.query.order || 1;

    const page = req.query.page || 0;
    const limit = Math.min(req.query.limit || cardPageLimit, cardPageLimit);

    //
    
    const search = {
        ...( name == null ? {} : { name: { $regex: name, $options: "i" } } ),
        ...( theme == null ? {} : { theme } ),
        ...( rarity == null ? {} : { rarity } ),
        ...( type == null ? {} : { type } ),
        ...( character_type == null ? {} : { character_type } )
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
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

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


router.get("/cards/list", (req, res) => {
    allowCors(res);

    CardModel
        .find({}, "_id name aliases image updated_at")

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
    allowCors(res);

    CardModel
        .findById(req.params.id)
        .select({ __v: 0 })

        .then(card => {
            if (card == null) {
                return res.json({
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

// temp
router.get("/cards/image/:image", (req, res) => {
    allowCors(res);

    CardModel
        .findOne({ image: req.params.image })
        .select({ __v: 0 })

        .then(card => {
            if (card == null) {
                return res.json({
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
//

router.patch("/cards/:id", (req, res) => {
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

    CardModel
        .updateOne({ _id: req.params.id }, { ...req.body, updated_at: Date.now() }, { runValidators: true })

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
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

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

router.get("/updates", (req, res) => {
    allowCors(res);

    const title = req.query.title;
    
    const sort = req.query.sort;
    const order = req.query.order || 1;

    const search = {
        ...( title == null ? {} : { title: { $regex: title, $options: "i" } } ),
    };

    const page = req.query.page || 0;
    const limit = Math.min(req.query.limit || updatePageLimit, updatePageLimit);

    UpdateModel
        .count()

        .then(total => {
            if (total === 0) {
                return res.json({
                    code: 200,
                    success: true,
                    data: [],
                    error: null
                });
            }

            UpdateModel
                .count(search)

                .then(matched => {
                    if (matched === 0) {
                        return res.json({
                            code: 200,
                            success: true,
                            data: [],
                            error: null
                        });
                    }

                    UpdateModel
                        .find(search)
                        .collation({ locale: "en" })
                        .sort(sort == null ? {} : { [sort]: order })
                        .skip(page * limit)
                        .limit(limit)
                        .select({ __v: 0 })
        
                        .then(updates => {
                            return res.json({
                                code: 200,
                                success: true,
                                data: {
                                    total,
                                    matched,
                                    updates
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

router.post("/updates", (req, res) => {
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

    const update = new UpdateModel(req.body);

    update
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

router.get("/updates/:id", (req, res) => {
    allowCors(res);

    UpdateModel
        .findById(req.params.id)
        .select({ __v: 0 })

        .then(update => {
            if (update == null) {
                return res.json({
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

router.patch("/updates/:id", (req, res) => {
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

    UpdateModel
        .updateOne({ _id: req.params.id }, req.body, { runValidators: true })

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

router.delete("/updates/:id", (req, res) => {
    allowCors(res);

    if (!validateToken(req.headers["xxx-access-token"])) {
        return res.json(resForbidden);
    }

    UpdateModel
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
