var jsonBuilder = require('./jsonbuilder.js');
var urlBuilder = require('./urlbuilder.js');
// const GITHUBTOKEN = process.env.GITHUBTOKEN;
const GITHUBTOKEN = 'edc765f202ad012d270c7d1161650449127356f0';

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

module.exports.queryBuilder = queryBuilder;