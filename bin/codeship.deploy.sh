#!/bin/bash

HOMEDIR="/opt/katastr.io"
COMMIT=$(git log --oneline | head -n 1 | cut -d ' ' -f 1)

cd ~/clone

npm install && \
npm run build && \
rsync -aqz ~/clone/dist/* codeship@193.85.199.37:${HOMEDIR}/monitor-frontend-${COMMIT} && \
ssh codeship@193.85.199.37 << EOF
find ${HOMEDIR} -maxdepth 1 -type d ! -name monitor-frontend-${COMMIT} -name 'monitor-frontend-*' -exec rm -rf '{}' \;
rm ${HOMEDIR}/monitor-frontend
ln -s $HOMEDIR}/monitor-frontend-${COMMIT} ${HOMEDIR}/monitor-frontend
EOF
