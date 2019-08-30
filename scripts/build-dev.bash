#!/bin/bash

# Set up required environment variables
bash scripts/env-dev.bash

# Build webpack
npx webpack --config webpack.dev.js
