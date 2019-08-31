#!/bin/bash

# Revert branch to latest commit
git reset --hard
git clean -fd
git clean -fx

bash scripts/clean.bash
