const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'

const dbName = 'shutter'
const collectionName = 'customers'

function ownOrders(name, callback) {
    console.log(name)
    readCustomers({"customer.name": name}, (result) => {
        callback(result)
    })
}

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

function registerCustomer(data, callback) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)

        db.collection(collectionName).insertOne({customer: data.customer, windows: [], shutters: []}, (err, r) => {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            client.close()
            callback()
        })


    })
}

function addWindow(data) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)

        db.collection(collectionName).updateOne({"customer.name": data.customer.name}, {
            $push: {
                windows: data.windows
            }

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

        db.collection(collectionName).updateOne({"customer.name": data.customer.name}, {
            $push: {
                shutters: data.shutters
            }

        }, (err) => {
            assert.equal(null, err);
            client.close();
        })


    })
}

function submit(data) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);

        const db = client.db(dbName)
        console.log(data.customer.name)
        db.collection(collectionName).updateOne({"customer.name": data.customer.name}, {
            $set: {
                submit: data.submit
            }
        }, (err) => {
            assert.equal(null, err);
            client.close();
        })


    })
}

module.exports = {
    "registerCustomer": registerCustomer,
    "readAllCustomers": readAllCustomers,
    "addWindow": addWindow,
    "addShutter": addShutter,
    "ownOrders": ownOrders,
    "submit": submit
}