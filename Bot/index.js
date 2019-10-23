var Botkit = require('botkit');
var data = require("./request_mock.json");
var request = require('request');
var intentGathering = require('./intentgathering.js');
var queryBuilder = require('./querybuilder.js');

const SLACK_TOKEN = process.env.SLACK_TOKEN_USER;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET_KEY;
const signingSecret = process.env.SIGNING_KEY;
const status = {'GET':200, 'POST':201, 'PUT':201, 'DELETE': 202};
var urlRoot = "https://api.github.ncsu.edu";

var controller = new Botkit.slackbot({
    clientSigningSecret: signingSecret,
    clientId: clientId,
    clientSecret: clientSecret,
    scopes: ['bot']
});

controller.spawn({
    token: SLACK_TOKEN
}).startRTM();

controller.hears(['keyword', '[\s\S]*'], ['ambient', 'direct_mention', 'direct_message','mention'], function (bot, message) {

    var intentResults = intentGathering.intentGathering(message.text);
    var count = intentResults[1]
    var intent = intentResults[0] 
    if(count>0){
        var categoriesList = data[intent];
        var params = categoriesList['params'];
        var method = categoriesList['method'];
        var endpoint = categoriesList['url'];
        var url = urlRoot + endpoint;
        var ans = [];
        var attributeList = [];
        var type = [];
        var i = 0;

        for(var attribute in params){
            var paramKeys = Object.keys(params[attribute]);
            if(paramKeys[0] === 'required'){
                attributeList.push(attribute);
                type.push(params[attribute][paramKeys[1]]);
            }
        }

        bot.startConversation(message, function(err, convo) {
            for (var attribute in params){
                var paramKeys = Object.keys(params[attribute]);
                if (paramKeys[0] === 'required'){
                    convo.ask("Please tell me "+attribute, function(res, convo){
                        if(isNaN(res.text) && type[i]=='integer'){
                            var replyMessage = {
                                'attachments': [
                                  {
                                    'text': 'I think you entered a string.\nTry giving an Integer',
                                    'color': 'danger'
                                  }
                                ]
                            }
                            bot.reply(message, replyMessage);
                            convo.repeat();
                            convo.next();
                        }
                        else if(isNaN(res.text)==false && type[i]=='string'){
                            var replyMessage = {
                                'attachments': [
                                  {
                                    'text': 'I think you entered an Integer.\nTry giving a string',
                                    'color': 'danger'
                                  }
                                ]
                            }
                            bot.reply(message, replyMessage);
                            convo.repeat();
                            convo.next();
                        }
                        else{
                            ans.push(res.text);
                            convo.next();
                            i += 1;
                            if(ans.length == attributeList.length){
                                var command = queryBuilder.queryBuilder(ans, attributeList, url, method, false);
                                console.log(command);
                                var results = queryBuilder.queryBuilder(ans, attributeList, url, method, true);
                                bot.reply(message, command);
                                convo.next();
                                convo.setTimeout(30000);
                                convo.ask("Would you like me to run the command for you", function(res, convo){
                                    if(res.text == 'yes' || res.text == 'Yes' || res.text == 'sure'){
                                        request(results, function (error, response, body) {
                                            if(!error && response.statusCode == status[method])
                                            {
                                                bot.reply(message, "Succesfully executed the command");
                                            }else{
                                                bot.reply(message, "Oops! Something went wrong");
                                            }
                                        });
                                    }
                                    else{
                                        bot.reply(message, "Ok. Please let me know if you need any more help");
                                    }
                                    convo.next();
                                });
                            }
                        }
                    });
                    convo.onTimeout(function(convo){
                        var replyMessage = {
                            'attachments': [
                              {
                                'text': 'You took longer than I expected.',
                                'color': 'danger'
                              }
                            ]
                        }
                        bot.reply(message, replyMessage);
                        convo.next();
                    });
                }
            }
        });
    }
});