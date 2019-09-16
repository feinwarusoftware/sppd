#!/bin/bash

# Remove all files and folders not tracked by git
git clean -fd
git clean -fx

# Remove all gitignored files
bash scripts/clean.bash

# Revert to latest commit
git reset --hard
