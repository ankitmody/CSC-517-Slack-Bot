function dataJsonBuilder(ans, attributeList){
    var data = {};
    for(var i=0;i<ans.length;i++){
        data[attributeList[i]] = ans[i].replace(/\s/g,'');
    }
    return(data);
}

module.exports.dataJsonBuilder = dataJsonBuilder;