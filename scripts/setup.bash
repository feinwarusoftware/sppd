#!/bin/bash

# Pre-clean
bash scripts/clean.bash

# Set up required dirs
mkdir temp

# Set up environment variables
touch temp/env.bash
cat scripts/env.bash.template > temp/env.bash

REQUIRED_PATH=(bash git node yarn npx mongod mongodump mongorestore)

echo ""

for i in ${REQUIRED_PATH[@]}; do
  if type -P $i &>/dev/null; then
    echo "$i - Ok"
  else
    echo "$i - Not in PATH"
  fi
done

echo ""

echo "
1. If there are any executables flagged as 'Not in PATH', please add them now.
2. Set the required environment variables in temp/env.bash to complete the setup.
3. After completing the above, run 'yarn install' to install the required dependencies.
"
