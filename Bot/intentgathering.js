var intentData = require('./intent.json');

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

function intentGathering(test){
    var commonCount = {};
    for(var key in intentData){
        for(var i=0;i<intentData[key]['expressions'].length;i++){
            var count = getMeRepeatedWordsDetails(intentData[key]['expressions'][i], test);
            commonCount[key] = commonCount[key] + count || count;
        }
    }
    var intent = Object.keys(commonCount).reduce(function(a, b){ return commonCount[a] > commonCount[b] ? a : b });
    var count = 0;
    for(var attribute in commonCount){
        count += commonCount[attribute];
    }
    return [intent, count];
}


module.exports.intentGathering = intentGathering;