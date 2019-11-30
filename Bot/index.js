var Botkit = require('botkit');
var data = require("./request_mock.json");
var request = require('request');
var intentGathering = require('./intentgathering.js');
var queryBuilder = require('./querybuilder.js');
var db = require('./mongoDB.js');

const SLACK_TOKEN = process.env.SLACK_TOKEN_USER;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET_KEY;
const signingSecret = process.env.SIGNING_KEY;
const status = {'GET':200, 'POST':201, 'PUT':201, 'DELETE': 202};
const urlRoot = "https://api.github.ncsu.edu";

var controller = new Botkit.slackbot({
    clientSigningSecret: signingSecret,
    clientId: clientId,
    clientSecret: clientSecret,
    scopes: ['bot']
});

controller.spawn({
    token: SLACK_TOKEN
}).startRTM();

function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

controller.hears(['keyword', '[\s\S]*'], ['ambient', 'direct_mention', 'direct_message','mention'], function (bot, message) {
    
    var lookUpKey = message.text.toLowerCase();
    intentGathering.listActions(lookUpKey).then(function(intentResults){
        bot.startConversation(message, function(err, convo){
            var replyMessage = queryBuilder.errorMessageBuilder("Please choose one of the following actions\n"+intentResults[0], false)
            convo.ask(replyMessage, function(res, convo){
                var userReply = res.text;
                lookUpKey = intentResults[1];
                var keyMapping = intentResults[2];
                var numericMapping = intentResults[3];
                if(keyMapping[userReply]!=undefined){
                    var intent = keyMapping[userReply]
                }
                else{
                    var intent = numericMapping[userReply];
                }
                convo.next();
                if(userReply === 'never mind'){
                    bot.reply(message, "No problem.\nRemember I am always hearing");
                    convo.stop();
                }
                else{
                    db.search(lookUpKey, false).then(function(results){
                        var categoriesList = results[0][lookUpKey][intent];
                    
                        if(categoriesList!=undefined){
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
                                            if(res.text == 'never mind'){
                                                bot.reply(message, "No problem.\nRemember I am always hearing");
                                                convo.stop();
                                            }
                                            else if(isNaN(res.text) && type[i]=='integer'){
                                                var replyMessage = queryBuilder.errorMessageBuilder('I think you entered a string.\nTry giving an Integer', true);
                                                bot.reply(message, replyMessage);
                                                convo.repeat();
                                                convo.next();
                                            }
                                            else if(isNaN(res.text)==false && type[i]=='string' || isValid(res.text)==false){
                                                var replyMessage = queryBuilder.errorMessageBuilder('I think you entered an Integer.\nTry giving a string', true);
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
                                            var replyMessage = queryBuilder.errorMessageBuilder('You took longer than I expected.');
                                            bot.reply(message, replyMessage);
                                            convo.next();
                                        });
                                    }
                                }
                            });
                        }
                        else{
                            bot.reply(message, "I guess you misspelled it.\nPlease try again from start");
                        }
                    });
                }
            });
        });
    });
});