#!/bin/bash

# Set up required environment variables
source scripts/env-dev.bash

# Build webpack
npx webpack --config ui/webpack.dev.js
