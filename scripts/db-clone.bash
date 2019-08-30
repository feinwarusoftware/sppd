#!/bin/bash

# Remove old db files
rm -r temp/db
rm -r temp/dump

# Clone mongo data from specified host
mongodump --username $CLONE_MONGO_USER --password $CLONE_MONGO_PASS --host $CLONE_MONGO_HOST --authenticationDatabase $CLONE_MONGO_AUTHDB --db sppd --out temp/dump
mongorestore --host 127.0.0.1 --db sppd --drop temp/dump/sppd
