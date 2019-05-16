const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://172.21.0.10:27017'

const dbName = 'shutter'

function readAll(callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'customers'
        var findParams = {}
        db.collection(collectionName).find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            // console.log(docs)
            callback(docs)
        })
        client.close();
    });

}
function registerCustomer(customer, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'customers'
        db.collection(collectionName).insertOne(customer, (err, r) => {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            client.close()
            callback()
        })
    })
}
function addOrder(order, callback) {
    var findParams = {"_id": order.customer.customerID.toString()}
    var update = {$push: {"customer.ordersID": order._id}};
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        db.collection(collectionName).insertOne(order, (err, r) => {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            db.collection(collectionName).updateOne(findParams, update, (err) => {
                assert.equal(null, err)
                client.close()
                callback(order)
            })
            client.close()
        })
    })
}
function ownOrders(customerID, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {"customer.customerID": Number(customerID)}
        db.collection(collectionName).find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            // console.log(docs)
            callback(docs)
        })
        client.close();
    });
}
function submit(orderID, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {"_id": orderID}
        var update = {$set: {"status": "submitted"}}
        db.collection(collectionName).find(findParams).toArray(function (err, order) {
            if (order[0].status === "added") {
                db.collection(collectionName).updateOne(findParams, update, (err) => {
                    assert.equal(null, err)
                    client.close()
                    callback(order)
                })
            }
        })
    });
}
function pay(orderID, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {"_id": orderID}
        var update = {$set: {"payment": "paid"}}
        db.collection(collectionName).find(findParams).toArray(function (err, order) {
            if (order[0].payment === "waiting" && order[0].status === "installed") {
                db.collection(collectionName).updateOne(findParams, update, (err) => {
                    assert.equal(null, err)
                    client.close()
                    callback(order[0].customer.customerID)
                })
            }
        })
    });
}
function invoice(orderID, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {"_id": orderID}
        db.collection(collectionName).find(findParams).toArray(function (err, order) {
            console.log(order[0].invoice)
            if (order[0].invoice !== undefined && order[0].invoice !== null) {
                db.collection("invoice").find({"_id": order[0].invoice.toString()}).toArray(function (err, invoice) {
                    assert.equal(null, err)
                    client.close()
                    callback(invoice)
                })
            }
        })
    });
}

module.exports = {
    "readAll": readAll,
    "registerCustomer": registerCustomer,
    "addOrder": addOrder,
    "ownOrders": ownOrders,
    "submit": submit,
    "pay": pay,
    "invoice": invoice

}