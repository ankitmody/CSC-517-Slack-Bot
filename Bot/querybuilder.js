var jsonBuilder = require('./jsonbuilder.js');
var urlBuilder = require('./urlbuilder.js');
var tokenManager = require('./tokenManager.js')
// const GITHUBTOKEN = process.env.GITHUBTOKEN;


function queryBuilder(ans, attributeList, url, method, type, user = "NOT_DEFINED"){
    var data = jsonBuilder.dataJsonBuilder(ans, attributeList);
    var url = urlBuilder.urlBuilder(data, url);
    if(user == "NOT_DEFINED"){
        var GITHUBTOKEN = process.env.GITHUBTOKEN;
    }
    else{
        var GITHUBTOKEN = tokenManager.getUserToken(user);
    }
    if(type){
        var options = {'url': url, 'method': method, 'headers':{"Authorization": `token ${GITHUBTOKEN}`}, 'json':data};
    }
    else{
        var options = `\`curl --request `+method+` -H "Authorization: token `+GITHUBTOKEN+`" -d '`+ JSON.stringify(data) +`' `+url+`\``;
    }
    return(options);
}

function errorMessageBuilder(text){
    var replyMessage = {
        'attachments': [
          {
            'text': text,
            'color': 'danger'
          }
        ]
    };
    return(replyMessage);
}

module.exports.queryBuilder = queryBuilder;
module.exports.errorMessageBuilder = errorMessageBuilder;