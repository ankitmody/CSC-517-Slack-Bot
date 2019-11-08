var db = require('./mongoDB.js');

function getMeRepeatedWordsDetails (sentence, tester) {
    sentence = sentence + " ";
    var regex = /[^\s]+/g;
    var regex2 = new RegExp ( "(" + tester.match ( regex ).join ( "|" ) + ")\\W", "g" );
    matches = sentence.match(regex2);
    if(matches == null){
        matches = [];
    }
    return(matches.length);
}

async function intentGathering(test){
    let promise = new Promise((resolve) =>{
        var commonCount = {};
        var masterDict = {};
        db.search(test, true).then(function(intentData){
            for(var k in intentData){
                var dictKey = Object.keys(intentData[k])[1];
                var values = []
                for(var key in intentData[k][Object.keys(intentData[k])[1]]){
                    values.push(Object.keys(intentData[k][Object.keys(intentData[k])[1]])[0]);
                    for(var i=0;i<intentData[k][Object.keys(intentData[k])[1]][key]['expressions'].length;i++){
                        var count = getMeRepeatedWordsDetails(intentData[k][Object.keys(intentData[k])[1]][key]['expressions'][i], test);
                        commonCount[key] = commonCount[key] + count || count;
                    }
                    masterDict[dictKey] = values;
                }
            }
            var intent = Object.keys(commonCount).reduce(function(a, b){ return commonCount[a] > commonCount[b] ? a : b });
            var count = 0;
            var lookUpKey = "";
            Object.keys(masterDict).forEach(function(key) {
                value = masterDict[key];
                for(var i=0;i<value.length;i++){
                    if(value[i] == intent){
                        lookUpKey = key;
                        break;
                    }
                }
            });
            for(var attribute in commonCount){
                count += commonCount[attribute];
            }
            resolve([lookUpKey, intent, count]);
        });
    });
    let results = await promise;
    return(results);
}


module.exports.intentGathering = intentGathering;