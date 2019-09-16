"use strict";

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  plugins: {
    "postcss-preset-env": {},
    cssnano: devMode ? false : {}
  }
};
