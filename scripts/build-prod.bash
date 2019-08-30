#!/bin/bash

# Set up required environment variables
bash scripts/env-prod.bash

# Build webpack
npx webpack --config webpack.prod.js
