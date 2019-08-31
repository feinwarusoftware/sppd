"use strict";

const fs = require("fs");

const shellExec = require("./shell-exec");

// Gets project contributors from git
const getGitAuthors = () => {
  return shellExec("git", ["shortlog", "-se"]);
}

// Generates an authors file in the project root based on git contributors
const generateAuthorsFile = async () => {
  const authorsFile = await getGitAuthors();
  const authorsList = authorsFile.replace(/.+\t/g, "").split("\n").slice(0, -1).map(e => {
    const userAndEmail = e.split("<");

    return [userAndEmail[0].trim(), "<" + userAndEmail[1]];
  });
  const cleanedAuthorsList = authorsList.filter(e => e[0] === "Unknown" ? false : true);
  const cleanedAuthorsFile = cleanedAuthorsList.map(e => e.join(" ")).join("\n");

  try {
    fs.unlinkSync("AUTHORS");
  } catch(error) {
    if (error.code !== "ENOENT") {
      console.error(error);
      process.exit(-1);
    }
  }

  fs.writeFileSync("AUTHORS", cleanedAuthorsFile);
}

generateAuthorsFile();
