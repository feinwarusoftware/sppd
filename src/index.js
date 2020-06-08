"use strict";

const path = require("path");
const http = require("http");

const express = require("express");
const morgan = require("morgan");

const {
  NODE_ENV,
  WEBSERVER_PORT,
} = process.env;

const port = WEBSERVER_PORT || (() => { throw("port not specified"); })();;
const app = express();

const devMode = NODE_ENV === "dev";

// Webpack HMR
if (devMode) {
  const webpack = require("webpack");
  const webpackDevConfig = require("../ui/webpack.dev.js");
  const compiler = webpack(webpackDevConfig);
  
  app.use(require("webpack-dev-middleware")(compiler, {
    hot: true,
    noInfo: true,
    stats: false,
    publicPath: webpackDevConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}
//

app.use(morgan(devMode ? "dev" : "combined"));

app.use(express.static(path.join(__dirname, "..", "ui", "dist")));
app.use(express.static(path.join(__dirname, "..", "static")));

// app.use(express.json());

// app.use("/api/v1", api_routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "ui", "dist", "index.html"));
});

app.get("/:card", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "ui", "dist", "index.html"));
});

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
  res.locals.error = devMode ? err : {};

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
    console.error(`Port ${process.env.port} requires elevated privileges`);
    process.exit(-1);
    break;
  case "EADDRINUSE":
    console.error(`Port ${process.env.port} is already in use`);
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
