#!/bin/sh
>&2 echo "Starting server..."

case $NODE_ENV in
   "production")
      ./wait-for-it.sh db:3306
      typeorm migration:run -d dist/ormconfig.js
      node dist/main
   ;;
   "debug")
      ./wait-for-it.sh db:3306
      nest start --debug --watch
   ;;
   *)
      ./wait-for-it.sh db:3306
      nest start --watch
   ;;
esac
