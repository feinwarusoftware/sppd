#!/bin/bash

# Load environment variables
source temp/env.bash

# Remove old db dump files
rm -rf temp/dump

# Set up new db dump dirs
mkdir temp/dump
mkdir temp/dump/sppd

# Clone mongo data from remote host
mongodump --username $CLONE_MONGO_USER --password $CLONE_MONGO_PASS --host $CLONE_MONGO_HOST --authenticationDatabase $CLONE_MONGO_AUTHDB --db sppd --out temp/dump
mongorestore --host 127.0.0.1 --db sppd --drop temp/dump/sppd
