"use strict";

const path = require("path");
const http = require("http");

const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");

const api_routes = require("./api_routes");

const port = 80;
const env = "dev"; // dev | prod
const app = express();

// connect to mongo
mongoose.connect(`mongodb://localhost/sppd`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error);
db.on("open", () => console.log("db conn"))

app.use(morgan(env === "dev" ? "dev" : "combined"));

//app.use(express.static(path.join(__dirname, "..", "ui", "src", "static")));
app.use(express.static(path.join(__dirname, "..", "ui", "dist")));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "ui", "template.html"));
});

app.use(api_routes);

app.use((req, res, next) => {

  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {

  if (err.status === 404) {
    return res.json({ error: "404" });
  }

  res.locals.message = err.message;
  res.locals.error = env === "dev" ? err : {};

  res.status(err.status || 500);
  res.json({ error: "error" });
});

const server = http.createServer(app);

server.on("error", err => {

  if (err.syscall !== "listen") {
    console.error(`Could not start http server: ${err}`);
    process.exit(-1);
  }

  switch(err.code) {
  case "EACCES":
    console.error(`Port ${config.port} requires elevated privileges`);
    process.exit(-1);
    break;
  case "EADDRINUSE":
    console.error(`Port ${config.port} is already in use`);
    process.exit(-1);
    break;
  default:
    console.error(`Could not start http server: ${err}`);
    process.exit(-1);
  }
});

server.on("listening", () => {
  console.log(`Magic happens on port ${port}`);
});

server.listen(port);
