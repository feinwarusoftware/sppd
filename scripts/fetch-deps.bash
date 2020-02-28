#!/bin/bash

# Install required node modules
yarn install

# Clone mongo database
bash scripts/db-run.bash &
bash scripts/db-clone.bash
kill $(jobs -p)
