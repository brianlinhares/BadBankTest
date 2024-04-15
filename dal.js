const mongodb = require("mongodb");
require('dotenv').config()
 
//=================================================MONGO Connect=================================================
// connects to database
const connectionURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ebre3yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = "myproject";

//get MongoClient
const MongoClient = mongodb.MongoClient;

let db = null;

MongoClient.connect(connectionURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err,connectedClient) => {
    if(err){
        throw err;
    }
    //connectedClient will be the connected instance of MongoClient
    db = connectedClient.db(dbName);


})
//=================================================Create Account=================================================
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 100};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}
//=================================================All Accounts=================================================
function all(){
    return new Promise((resolve, reject) => {    
        const accounts = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}
//=================================================DEPOSIT=================================================
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const accounts = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: Number(amount)}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}
//=================================================WITHDRAW=================================================
function updateNegative(email, amount){
    return new Promise((resolve, reject) => {    
        const accounts = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: Number(amount*-1)}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}

//=================================================find - ACCOUNT=================================================
function find(email){
    return new Promise((resolve, reject) => {    
        const accounts = db
            .collection('users')
            .find({email: email})      
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

//=================================================findOne - ACCOUNT=================================================
function findOne(email){
    return new Promise((resolve, reject) => {    
        const accounts = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

module.exports = {create, findOne, find, update, all, updateNegative};

//------------------------------------------------------------------------------- This bottom one works - ATLAS
// const MongoClient = require('mongodb').MongoClient;
// // const url         = 'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect('mongodb+srv://root:GnvxXvB55PFObImU@cluster0.ebre3yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', function(err, client){
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

// // create user account
// function create(name, email, password){
//     return new Promise((resolve, reject) => {    
//         const collection = db.collection('users');
//         const doc = {name, email, password, balance: 0};
//         collection.insertOne(doc, {w:1}, function(err, result) {
//             err ? reject(err) : resolve(doc);
//         });    
//     })
// }

// // all users
// function all(){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .find({})
//             .toArray(function(err, docs) {
//                 err ? reject(err) : resolve(docs);
//         });    
//     })
// }

// // module.exports = {create, findOne, find, update, all};
// module.exports = {create, all};

//------------------------------------------------------------------------------- This bottom one works - COMPASS

// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect('mongodb://localhost:27017/badbank', function(err, client){
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

// // create user account
// function create(name, email, password){
//     return new Promise((resolve, reject) => {    
//         const collection = db.collection('users');
//         const doc = {name, email, password, balance: 0};
//         collection.insertOne(doc, {w:1}, function(err, result) {
//             err ? reject(err) : resolve(doc);
//         });    
//     })
// }

// // all users
// function all(){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .find({})
//             .toArray(function(err, docs) {
//                 err ? reject(err) : resolve(docs);
//         });    
//     })
// }

// // module.exports = {create, findOne, find, update, all};
// module.exports = {create, all};
