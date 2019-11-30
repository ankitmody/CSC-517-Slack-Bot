var db = require('./mongoDB.js');

function splitAndLowerCase(input){
    var toArray = input.split(/(?=[A-Z])/);
    return toArray.join(' ').toLowerCase();
}

async function listActions(inputMessage){
    let promise = new Promise((resolve)=>{
        var commonCount = [];
        db.search(inputMessage, true).then(function(intentData){
            for(var k in intentData){
                var dictKey = Object.keys(intentData[k])[1];
                if(inputMessage.indexOf(dictKey)!== -1){
                    commonCount.push(dictKey);    
                }
            }

            var actions = "You can also stop me from executing by saying never mind.\n";
            var mappingObject = {};
            var numericMapping = {};
            if(commonCount.length>0){
                db.search(commonCount[0], false).then(function(intentData){
                    for(var k in Object.keys(intentData[0][commonCount[0]])){
                        var cleanedKey= splitAndLowerCase(Object.keys(intentData[0][commonCount[0]])[k]);
                        actions += String(parseInt(k, 10)+1) + ') ' + cleanedKey +'\n';
                        mappingObject[cleanedKey] = Object.keys(intentData[0][commonCount[0]])[k];
                        numericMapping[String(parseInt(k, 10)+1)] = Object.keys(intentData[0][commonCount[0]])[k];
                    }
                    resolve([actions, commonCount[0], mappingObject, numericMapping]);
                });
            }
        });
    });
    let results = await promise;
    return(results);
}

module.exports.listActions = listActions;