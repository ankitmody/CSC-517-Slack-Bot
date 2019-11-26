const MongoClient = require('mongodb').MongoClient;
const uri = process.env.dbURL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('routes.json', 'utf-8'));

client.connect(err => {
   const collection = client.db("GithubYoda").collection("githubData");
   // perform actions on the collection object
   collection.insertMany(jsonData, {checkKeys: false});
//    collection.find({ "search": { $type: 3 } }).toArray(function (err, docs) {
//        console.log("retrieved records:");
//        console.log(JSON.stringify(docs));
//        var data = JSON.parse(JSON.stringify(docs));
//        console.log(data[0].search.topics.url);
//    });
   client.close();
});