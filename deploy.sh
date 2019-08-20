#!/bin/bash

eval "$(ssh-agent -s)"
chmod 600 .travis/travis
ssh-add .travis/travis

git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy develop

ssh git@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  # Any command go here:
  forever start -c /bin/bash dev.sh
EOF

