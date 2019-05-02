const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'

const dbName = 'shutter'
const collectionName = 'customers'

function readCustomers(findParams, callback) {
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        collection.find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            callback(docs)
        })
        client.close();
    })
}

function readAllCustomers(callback) {
    readCustomers({}, (result) => {
        callback(result)
    })
}

function addWindow(data) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)
        const collection = db.collection(collectionName);
        db.collection(collectionName).updateOne({name: data.name}, {
            $push: {
                      windows: data.windows}

        }, (err) => {
            assert.equal(null, err);
            client.close();
        })


    })
}


function addShutter(data) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)
        const collection = db.collection(collectionName);

        db.collection(collectionName).updateOne({name: data.name}, {
            $push: {
                shutters: data.shutters}

        }, (err) => {
            assert.equal(null, err);
            client.close();
        })


    })
}
module.exports = {
    "readAllCustomers": readAllCustomers,
    "addWindow": addWindow,
    "addShutter": addShutter
}