#!/bin/bash

# Set up required dirs
mkdir temp

# Set up environment variables
touch temp/env.bash
cat scripts/env.bash.template > temp/env.bash

echo "Please set the required environment variables in temp/env.bash"
