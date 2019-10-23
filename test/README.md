## TEST

navigate to the test folder. install all npm packages needed using - 
```
npm install
```
This will install all relevant packages including chromium and puppeteer

Next, export  details to log on to slack workspace. We also need a slack bot token.
```
export SLACK_WORKSPACE=https://workspacename.slack.com (ex - https://hoomanworkspacegroup.slack.com)
export SLACK_BOT_TOKEN=xoxb-XXXXX
export SLACK_EMAIL=ENTER_YOUR_NAME
export SLACK_PASSWORD=ENTER_YOUR_PASSWORD
```

we will also need to export the channel IDof our DMs with the bot. To do this:

1. Log into the Slack workspace
2. Next, right click on Bot name under the `Apps` section and copy the link.
4. Paste it into some text field. You should see the URL end with `/messages/XXXXXX`
5. Copy the end string and export it
```
export SLACK_BOT_CHANNEL=XXXXX
```

Then, we can run the test file.
```
npm run test:slack
```

chromium opens up, navigates to the Slack sign in page, sign us in and then perform the tests. 

Note - The token mentioned in the test file is a random value. We hardcoded it to match the value used by bot server.
