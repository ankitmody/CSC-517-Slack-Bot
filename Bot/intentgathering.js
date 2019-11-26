var db = require('./mongoDB.js');

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

            var actions = "";
            if(commonCount.length>0){
                db.search(commonCount[0], false).then(function(intentData){
                    for(var k in Object.keys(intentData[0][commonCount[0]])){
                        actions += Object.keys(intentData[0][commonCount[0]])[k]+'\n';
                    }
                    resolve([actions, commonCount[0]]);
                });
            }
        });
    });
    let results = await promise;
    return(results);
}

module.exports.listActions = listActions;