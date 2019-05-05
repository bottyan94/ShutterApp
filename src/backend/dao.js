const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'

const dbName = 'shutter'


function read(findParams, collectionName, callback) {
    console.log("read: "+{findParams})
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            callback(docs)
        })
        client.close();
    })
}
function readAll(collectionName,callback) {
    read({},collectionName, (result) => {
        callback(result)
    })
}
function insert(collectionName, data,callback) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).insertOne(data, (err) => {
            assert.equal(null, err)
            client.close()
            callback("inserted")
        })
    })
}
function update(collectionName,mit,mire,callback){
    console.log("update: "+{mit},{mire})
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).updateOne(mit,mire, (err) => {
            assert.equal(null, err)
            client.close()
            callback("updated")
        })
    })
}
module.exports={
    "read":read,
    "readAll":readAll,
    "insert":insert,
    "update":update
}