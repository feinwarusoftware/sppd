"use strict";

const { spawn } = require("child_process");

// Executes a shell command
const shellExec = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const thread =  spawn(cmd, args, { stdio: ["inherit", "pipe", "pipe"] });
    const stdout = [];
    const stderr = [];

    thread.stdout.on("data", data => {
      stdout.push(data.toString("utf8"));
    });

    thread.stderr.on("data", data => {
      stderr.push(data.toString("utf8"));
    });

    thread.on("close", () => {
      if (stderr.length > 0) {
        return reject(stderr.join(""));
      }
      resolve(stdout.join());
    });
  });
}

module.exports = shellExec;
