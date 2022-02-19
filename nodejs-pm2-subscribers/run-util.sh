#!/bin/bash

# requires {start|stop|status|...?} AND (for "start") {ble|zeromq}
# use `npx`
if [ -z "$1" ]
then
    echo "run-util.sh {delete|list|stop}"
    echo "run-util.sh {start} PATH"
fi

if [ "$1" == "delete" ]
then
    npx pm2 delete all
fi

if [ "$1" == "list" ]
then
    npx pm2 list
fi

if [ "$1" == "stop" ]
then
    npx pm2 stop all
fi

if [ "$1" == "start" ]
then
    if [ -z "$2" ]
    then
        echo "Must provide path"
    else
        if [ -z "$3" ]
        then
            FILE_PATH=$2 npx pm2 start configs/zeromq.config.js --only $3
        else
            FILE_PATH=$2 npx pm2 start configs/zeromq.config.js
        fi
    fi
fi
