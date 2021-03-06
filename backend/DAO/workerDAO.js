const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://172.21.0.10:27017'

const dbName = 'shutter'

function read(findParams, collectionName, callback) {
    // console.log("read")
    // console.log(findParams)
    //  console.log(collectionName)
    var client = new MongoClient(url);
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            // console.log(docs)
            callback(docs)
        })
        client.close();
    })
}

function readAll(callback) {
    read({}, 'orders', (result) => {
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

function update(collectionName, findParams, update, callback) {
    var client = new MongoClient(url)
    client.connect((err) => {
        assert.equal(null, err);
        const db = client.db(dbName)
        db.collection(collectionName).updateOne(findParams, update, (err) => {
            //assert.equal(null, err)
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
        db.collection(collectionName).find(findParam).count(function (err, piece) {
            assert.equal(err, null)
            //  console.log(piece)
            callback(piece)
        });
        client.close();
    })
}

function listOrders(callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {"status": "submitted"}
        db.collection(collectionName).find(findParams).toArray(function (err, docs) {
            assert.equal(err, null)
            // console.log(docs)
            callback(docs)
        })
        client.close();
    });
}

function selectShutter(shutterID, callback) {
    var findParams = {"shutter.shutterID": shutterID.toString()}
    read(findParams, "orders", (order) => {
            // console.log(order)
            let shutter = order[0]['shutter']
            for (let element of shutter) {
                if (element.status === "" && element.shutterID === shutterID) {

                    var updt = {$set: {"shutter.$.status": "selected"}}
                    update("orders", findParams, updt, () => {
                        //    console.log(element.type)
                        read({"type": element.type}, 'parts', (part) => {
                            //     console.log(part[0])

                            update("orders", findParams, {$push: {"partsList": part[0]}}, () => {

                            })
                        })
                    })
                }
            }
            callback(`${shutterID} shutter SELECTED!`)
        }
    )
}

function listPart(shutterID, callback) {
    var findParams = {"shutter.shutterID": shutterID.toString()}
    var upd = {$set: {"shutter.$.status": "done"}}
    update("orders", findParams, upd, () => {
        read(findParams, "orders", (shutter) => {
            // console.log(shutter[0].status)
            read({"type": shutter[0].shutter[0].type}, "parts", (part) => {
                // console.log(part[0].parts)
                callback(part[0].parts)
            })
        })
    })
}

function finish(orderID, callback) {
    var client = MongoClient(url);
    client.connect((err) => {
        if (err !== null) {
            console.log(err);
            callback([]);
            return;
        }
        var db = client.db(dbName);
        var collectionName = 'orders'
        var findParams = {_id: orderID.toString()}
        var upd = {$set: {"status": "finished"}}
        var finish = true
        db.collection(collectionName).find(findParams).toArray((err, order) => {
            let array = order[0].shutter
            for (let entity of array) {
                if (entity.status !== "done") {
                    finish = false;
                }
            }
            if (finish !== true) {
                callback('Még nem lehet befejezni, vannak job-ok amik még nem Done-ok')
            }
            if (finish === true) {
                update(collectionName, findParams, upd, () => {
                    read(findParams, collectionName, (order) => {
                        var summ=0;
                        for (let entity of order[0]['partsList']) {
                            summ = summ+entity.parts[0].price
                            console.log(summ)
                        }
                        update(collectionName,findParams,{$set: {"summ": summ}},() => {
                            callback("Finished");
                        })
                    })

                })
            }
        })
        client.close();
    });
}

module.exports = {
    "listOrders": listOrders,
    "selectShutter": selectShutter,
    "listPart": listPart,
    "finish": finish
}