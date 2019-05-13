const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://172.21.0.10:27017'

const dbName = 'shutter'

function read(findParams, collectionName, callback) {
    //console.log(findParams)
   // console.log(collectionName)
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
     db.collection(collectionName).find(findParams).toArray(function (err, docs) {
          //  assert.equal(err, null)
          //  console.log(docs)
            callback(docs)
        })
        client.close();
    })
}
function readAll(collectionName, callback) {
    //console.log(collectionName)
    read({}, collectionName, (result) => {
        //console.log(result)
        callback(result)
    })
}

function insert(collectionName, data, callback) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).insertOne(data, (err, r) => {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            client.close()
            callback()
        })
    })
}

function update(collectionName, mit, mire, callback) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).updateOne(mit, mire, (err) => {
            assert.equal(null, err)
            client.close()
            callback()
        })
    })
}

function piece(findParam, collectionName, callback) {
    //console.log(findParam)
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).find(findParam).count(function (err,piece) {
           assert.equal(err, null)
          //  console.log(piece)
           callback(piece)
       });
       client.close();
    })
}


module.exports = {
    "read": read,
    "readAll": readAll,
    "insert": insert,
    "update": update,
    "piece":piece
}