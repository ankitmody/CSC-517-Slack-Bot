#!/bin/bash

export GITHUBTOKEN="YOUR_GITHUBTOKEN_GOES_HERE"
export CLIENT_ID="YOUR_CLIENT_ID_GOES_HERE"
export CLIENT_SECRET_KEY="YOUR_CLIENT_SECRET_KEY_GOES_HERE"
export SIGNING_KEY="YOUR_SIGNING_KEY_GOES_HERE"
export SLACK_TOKEN_USER="YOUR_SLACK_TOKEN_USER_GOES_HERE"
export dbURL="YOUR_MONGODB_URL_GOES_HERE"

forever start /home/ubuntu/Project/Bot/index.js