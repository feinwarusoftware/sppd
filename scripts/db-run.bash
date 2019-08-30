#!/bin/bash

# Create db directory if it doesnt already exist
mkdir temp/db

# Runs mongo in the correct dir
mongod --dbpath=temp/db
