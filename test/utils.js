const { WebClient } = require('@slack/web-api');

async function getDMHistory() {
  const web = new WebClient(process.env.SLACK_TOKEN_USER);
  const response = await web.im.history({
    channel: process.env.SLACK_BOT_CHANNEL,
    count: 1000
  });
  return response.messages;
}

async function deleteMessage(ts) {
  const web = new WebClient(process.env.SLACK_TOKEN_USER);
  const response = await web.chat.delete({
    channel: process.env.SLACK_BOT_CHANNEL,
    ts
  }).catch(e => { });
}

async function cleanUp() {
    const history = await getDMHistory();
    // uncomment this if you want to delete all messages
    // for (const message of history) {
    //   await deleteMessage(message.ts);
    // }
}

module.exports = {
    cleanUp
};
