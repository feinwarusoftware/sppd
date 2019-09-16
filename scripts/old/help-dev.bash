#!/bin/bash

echo "
These are the basic instructions for how to get started:
1. Run 'yarn setup'.
2. Add the required executables to your PATH.
3. Add the required environment variables to temp/env.bash.
4. Run 'yarn fetch-deps'.
5. Run 'yarn run-dev'.

The following is a list of available commands:
1. yarn help: Displays the help page.
2. yarn build-dev: Builds the webpack dev bundle in ui/dist.
3. yarn build-prod: Builds the webpack prod bundle in ui/dist.
4. yarn clean: Removes all gitignored files.
5. yarn db-clone: Clones the db of the configured host into temp/db.
6. yarn db-run: Runs mongodb in temp/db.
7. yarn fetch-deps: Fetches the required dependencies.
8. yarn setup: Initial setup script.
9. yarn lint-fix: Attempts to fix eslint errors.
10. yarn lint: Runs the eslint linter.
11. yarn reset: Removes all gitignored and untracked and resets the branch to the latest commit.
12. yarn run-dev: Runs the webserver, database, and webpack with hot reloading in dev mode.
13. yarn run-prod: Runs the webserver, database, and webpack in production mode.
14. yarn test: Runs tests via jest.
"
