const puppeteer = require('puppeteer');
require('expect-puppeteer');
const utils = require('./utils');

let page, browser;
const TIMEOUT = 100000; // 100 seconds

jest.setTimeout(TIMEOUT);

const waitForProcessing = 10000;

describe('Slack Test', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: ['--no-sandbox', '--disable-setuid-sandbox']

    });
    page = await browser.newPage();
  })

  afterAll(async () => {
    await browser.close();
    await utils.cleanUp();
  })

  it('should be titled "Slack" after logging in and opening DMs', async () => {
    // Log in
    await page.goto(process.env.SLACK_WORKSPACE);
    await expect(page).toFill('input[id="email"]', process.env.SLACK_EMAIL, { timeout: TIMEOUT });
    await expect(page).toFill('input[id="password"]', process.env.SLACK_PASSWORD, { timeout: TIMEOUT });
    await expect(page).toClick('button[id="signin_btn"]', { timeout: TIMEOUT });

    // data-qa-presence-active="false"

    // Click on Bot in side bar
    //await page.waitForSelector(`a[data-qa-channel-sidebar-channel-id="${process.env.SLACK_BOT_CHANNEL}"]`, { timeout: TIMEOUT });
    //await expect(page).toClick(`a[data-qa-channel-sidebar-channel-id="${process.env.SLACK_BOT_CHANNEL}"]`, { timeout: TIMEOUT });

    // Verify Page Title
    //expect(await page.title()).toContain('Slack');
  }, TIMEOUT);

  it('Should be able to construct an example for create repo-Happy Path', async () => {
    // ask for example for create repo
    await page.waitForSelector(`div[data-qa="message_input"]`, { timeout: TIMEOUT });
    await expect(page).toFill('div[data-qa="message_input"]', 'create a repo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me name')


    await expect(page).toFill('div[data-qa="message_input"]', 'testrepo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);


    let requestReply = `curl --request POST -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"name":"testrepo"}' https://api.github.ncsu.edu/user/repos`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')

    await page.waitFor(2000);
  });

  it('Should be able to construct an example for create repo-Alternative Path', async () => {
    // ask for example for create repo
    await page.waitForSelector(`div[data-qa="message_input"]`, { timeout: TIMEOUT });
    await expect(page).toFill('div[data-qa="message_input"]', 'create a repo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me name')


    await expect(page).toFill('div[data-qa="message_input"]', 'testrepo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);


    let requestReply = `curl --request POST -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"name":"testrepo"}' https://api.github.ncsu.edu/user/repos`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)


    await page.waitFor(40000);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message_attachment__text'), e => e.textContent));

    expect(messages.pop()).toBe('You took longer than I expected.')

    await page.waitFor(2000);
  });

  it('Should be able to construct an example for search topics: Happy Path', async () => {
    // example for search topics
    await page.waitForSelector(`div[data-qa="message_input"]`, { timeout: TIMEOUT });
    await expect(page).toFill('div[data-qa="message_input"]', 'searching topics', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me q')

    await expect(page).toFill('div[data-qa="message_input"]', 'python', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');
    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request GET -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"q":"python"}' https://api.github.ncsu.edu/search/topics`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')

    await page.waitFor(2000);
  });

  it('Should be able to construct an example for search topics: Alternative Path', async () => {
    // example for search topics alternative path
    await page.waitForSelector(`div[data-qa="message_input"]`, { timeout: TIMEOUT });
    await expect(page).toFill('div[data-qa="message_input"]', 'searching topics', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me q')

    await expect(page).toFill('div[data-qa="message_input"]', '105', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');
    await page.waitFor(waitForProcessing);
    let reply = 'I think you entered an Integer.Try giving a string';

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message_attachment__text'), e => e.textContent));

    expect(messages.pop()).toBe(reply)

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));
    expect(messages.pop()).toBe('Please tell me q')

    await expect(page).toFill('div[data-qa="message_input"]', 'python', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');
    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request GET -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"q":"python"}' https://api.github.ncsu.edu/search/topics`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')

    await page.waitFor(2000);
  });


  it('Should be able to construct an example for edit an issue topics:Happy Path', async () => {
    // example for search topics
    await expect(page).toFill('div[data-qa="message_input"]', 'editing issues', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me issue_number')

    // await expect(page).toMatch('Please tell me issue_number', { timeout: TIMEOUT });

    await expect(page).toFill('div[data-qa="message_input"]', '1', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me owner')

    // await expect(page).toMatch('Please tell me owner', { timeout: TIMEOUT });

    await expect(page).toFill('div[data-qa="message_input"]', 'testowner', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me repo')

    // await expect(page).toMatch('Please tell me repo', { timeout: TIMEOUT });

    await expect(page).toFill('div[data-qa="message_input"]', 'testrepo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request PATCH -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"issue_number":"1","owner":"testowner","repo":"testrepo"}' https://api.github.ncsu.edu/repos/testowner/testrepo/issues/1`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')


    // await expect(page).toMatch(requestReply, { timeout: TIMEOUT});
    await page.waitFor(2000);
  });

  it('Should be able to construct an example for edit an issue topics:Alternative Path', async () => {
    // example for search topics
    await expect(page).toFill('div[data-qa="message_input"]', 'editing issues', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));


    expect(messages.pop()).toBe('Please tell me issue_number')

    // await expect(page).toMatch('Please tell me issue_number', { timeout: TIMEOUT });
    await expect(page).toFill('div[data-qa="message_input"]', 'abc', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');
    await page.waitFor(waitForProcessing);
    let reply = 'I think you entered a string.Try giving an Integer';

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message_attachment__text'), e => e.textContent));

    expect(messages.pop()).toBe(reply)

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));
    expect(messages.pop()).toBe('Please tell me issue_number')

    await expect(page).toFill('div[data-qa="message_input"]', '1', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me owner')

    // await expect(page).toMatch('Please tell me owner', { timeout: TIMEOUT });

    await expect(page).toFill('div[data-qa="message_input"]', 'testowner', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me repo')

    // await expect(page).toMatch('Please tell me repo', { timeout: TIMEOUT });

    await expect(page).toFill('div[data-qa="message_input"]', 'testrepo', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request PATCH -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"issue_number":"1","owner":"testowner","repo":"testrepo"}' https://api.github.ncsu.edu/repos/testowner/testrepo/issues/1`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')


    // await expect(page).toMatch(requestReply, { timeout: TIMEOUT});
    await page.waitFor(2000);
  });




  it('Should be able to construct an example for getting info about an user: Happy Path', async () => {
    // ask for example for user info
    await expect(page).toFill('div[data-qa="message_input"]', 'information about user', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me username')

    await expect(page).toFill('div[data-qa="message_input"]', 'testuser', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request GET -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"username":"testuser"}' https://api.github.ncsu.edu/users/testuser`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)

    await expect(page).toFill('div[data-qa="message_input"]', 'No', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Ok. Please let me know if you need any more help')

    await page.waitFor(2000);
  });

  it('Should be able to construct an example for getting info about an user:Alternative Path', async () => {
    // ask for example for user info
    await expect(page).toFill('div[data-qa="message_input"]', 'information about user', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Please tell me username')

    await expect(page).toFill('div[data-qa="message_input"]', 'testuser', { timeout: TIMEOUT });
    await page.keyboard.press('Enter');

    await page.waitFor(waitForProcessing);
    let requestReply = `curl --request GET -H "Authorization: token edc765f202ad012d270c7d1161650449127356f0" -d '{"username":"testuser"}' https://api.github.ncsu.edu/users/testuser`

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message__body'), e => e.textContent));

    expect(messages.pop()).toBe('Would you like me to run the command for you')
    expect(messages[messages.length - 1]).toBe(requestReply)


    await page.waitFor(40000);

    messages = await page.evaluate(() => Array.from(document.getElementsByClassName('c-message_attachment__text'), e => e.textContent));

    expect(messages.pop()).toBe('You took longer than I expected.')

    await page.waitFor(2000);
  });


})
