function urlBuilder(data, url){
    for(var attribute in data){
        newUrl = url.replace(':'+attribute, data[attribute]);
        url = newUrl;
    }
    return(url);
}

module.exports.urlBuilder = urlBuilder;