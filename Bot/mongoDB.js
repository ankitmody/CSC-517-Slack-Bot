const MongoClient = require('mongodb').MongoClient;
const uri = process.env.dbURL;

async function search(collectionName, intent){
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let promise = new Promise((resolve)=> {client.connect(err => {
            if(intent){
                collection = client.db("GithubYoda").collection("intent");
                collection.find().toArray(function (err, docs) {
                    // console.log("retrieved records:");
                    if(!err) resolve(docs);
                });
            }
            else{
                var qry = {};
                qry[collectionName] = { $type : 3 };
                collection = client.db("GithubYoda").collection("testJSON");
                collection.find(qry).toArray(function (err, docs) {
                    // console.log("retrieved records:");
                    if(!err) resolve(docs);
                });
            }
            client.close();   
        });
    });
    let results = await promise
    return (results);
}

module.exports.search = search;