// To be shifted to a Database
var userKeyMap = {};

function userTokenExists(user){
    //Will be a MongoDB key exists query.
    return(userKeyMap.hasOwnProperty(user));
}

function getUserToken(user){
    //To be gathered from a Database
    userKeyMap[user];
}

function storeUserToken(user,token){
    // To be stored into a Database
    userKeyMap[user] = token;
}

function askForTokenMessage() {
    let message = "It looks like I do not have your Github access token in My Database.I will need it to make a customized Query for you.\n"
    message += " Please reply to the message with the token. To create a token please refer https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line"
    return(message);
}

module.exports.askForTokenMessage = askForTokenMessage;
module.exports.userTokenExists = userTokenExists;
module.exports.getUserToken = getUserToken;
module.exports.storeUserToken = storeUserToken;