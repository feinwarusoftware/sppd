#!/bin/bash

# Remove all gitignored files 
rm -rf $(cat .gitignore | egrep -v "^\s*(#|$)")
