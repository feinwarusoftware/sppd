#!/bin/bash

# Set up required environment variables
source scripts/env-prod.bash

# Build webpack
npx webpack --config ui/webpack.prod.js
