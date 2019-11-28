var jsonBuilder = require('./jsonbuilder.js');
var urlBuilder = require('./urlbuilder.js');
const GITHUBTOKEN = process.env.GITHUBTOKEN;

function queryBuilder(ans, attributeList, url, method, type){
    var data = jsonBuilder.dataJsonBuilder(ans, attributeList);
    var url = urlBuilder.urlBuilder(data, url);
    if(type){
        var options = {'url': url, 'method': method, 'headers':{"Authorization": `token ${GITHUBTOKEN}`}, 'json':data};
    }
    else{
        var options = `\`curl --request `+method+` -H "Authorization: token `+GITHUBTOKEN+`" -d '`+ JSON.stringify(data) +`' `+url+`\``;
    }
    return(options);
}

function errorMessageBuilder(text, error){
    if(error){
        var replyMessage = {
            'attachments': [
            {
                'text': text,
                'color': 'danger'
            }
            ]
        };
    }
    else{
        var replyMessage = {
            'attachments': [
                {
                    'text': text                
                }
                ]
        };
    }
    return(replyMessage);
}

module.exports.queryBuilder = queryBuilder;
module.exports.errorMessageBuilder = errorMessageBuilder;