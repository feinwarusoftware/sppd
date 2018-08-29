/* some text goes here */

"use strict";

const path = require("path");
const http = require("http");

const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");

const routes = require("./routes");
const config = require("./config.json");

const app = express();

// change
app.use(morgan(config.env === "dev" ? "dev" : "combined"));

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);

app.use(express.static(path.join(__dirname, "static")));

app.use(routes);

app.use((req, res, next) => {

    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// check
app.use((err, req, res, next) => {

    if (err.status === 404) {
        return res.render("404");
    }

    res.locals.message = err.message;
    res.locals.error = config.env === "dev" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

const server = http.createServer(app);

server.on("error", err => {

    if (err.syscall !== "listen") {
        throw(`Could not start http server: ${err}`);
    }

    switch(err.code) {
        case "EACCES":
            throw(`Port ${config.port} requires elevated privileges`);
        case "EADDRINUSE":
            throw(`Port ${config.port} is already in use`);
        default:
            throw(`Could not start http server: ${err}`);
    }
});

server.on("listening", () => {
    console.log(`Magic happens on port ${config.port}`);
});

server.listen(config.port);
