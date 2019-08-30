#!/bin/bash

# Set up required environment variables
bash scripts/env-dev.bash

# Start mongo database
bash scripts/db-run.bash &

# Start webserver
node src &

# Start webpack dev server
npx webpack-dev-server --config webpack.dev.js &

# Wait forever
cat

# Kill all child processes
kill $(jobs -p)
