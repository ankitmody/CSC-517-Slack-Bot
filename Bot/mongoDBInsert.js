const MongoClient = require('mongodb').MongoClient;
const uri = process.env.dbURL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const jsonData = JSON.parse(fs.readFileSync('routes.json', 'utf-8'));

client.connect(err => {
   const collection = client.db("GithubYoda").collection("githubData");

   collection.insertMany(jsonData, {checkKeys: false});

   client.close();
});