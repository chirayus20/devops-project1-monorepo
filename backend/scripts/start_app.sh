#!/bin/bash
pkill node || true
cd /home/ubuntu/app
nohup node app.js > app.log 2>&1 &