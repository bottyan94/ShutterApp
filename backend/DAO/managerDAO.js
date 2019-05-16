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
    read({},'orders', (result) => {
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
function pieces(findParam, collectionName, callback) {
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

function listOrders(callback){
    readAll((orders)=>{
        callback(orders)
    })
}
function listCustomers(callback) {
    var all = {"_id": {$ne: null}}
    read(all, "customers", (customers) => {
       // logger.info(`${customers.length} customers were found!`)
        callback(customers)
    })
}
function install(orderID, callback){
    //console.log(orderID)
    read({"_id": orderID}, 'orders', (order) => {
      //  console.log(order)
        if (order[0].status === "finished") {
            var mit = {"_id": orderID.toString()}
            var mire = {$set: {"status": "installed"}}
            update("orders", mit, mire, (request) => {
               // logger.info(`${orderID} order has updated the status to Need a date for the installation!`)
                callback(request)
            })
        } else callback("nem lehet installálni még a munkát")
    })
}
function invoice(invoiceID, orderID, callback){
    var order = {"_id": orderID.toString()}
    var invoice = {}
    read(order, "orders", (obj) => {
        //console.log(obj[0])
        //console.log(obj[0].customer.customerID)
        let id = obj[0].customer.customerID.toString()
        //console.log(id)
        read({"_id": id}, 'customers', (customer) => {
            //console.log(customer[0].customer)
            invoice['_id'] = invoiceID
            invoice['customer'] = customer[0].customer.name
            invoice['shutter'] = obj[0]['shutter']
            invoice['partsList'] = obj[0]['partsList']
            invoice['summ'] = obj[0]['summ']
            invoice['payment'] = false
           // console.log(obj[0])
            insert('invoice', invoice, () => {
                update('orders', {"_id": orderID}, {$set: {"invoice": invoiceID}}, () => {
                    //logger.info(`${invoiceID} invoice has inserted to invoice table!`)
                    callback(invoice)
                })
            })
        })
    })
}
function stat(callback){
    var obj = {}
    pieces({}, "orders", (piece) => {
        obj['allOrders'] = piece;
        pieces({"status": "installed"}, "orders", (piece) => {
            obj['installed'] = piece;
            pieces({"status": "finished"}, "orders", (piece) => {
                obj['finished'] = piece;
                pieces({"status": "submitted"}, "orders", (piece) => {
                    obj['submitted'] = piece;
                    pieces({"status": "added"}, "orders", (piece) => {
                        obj['added'] = piece;
                        //console.log(obj)
                        callback(obj)
                    })
                })
            })
        })
    })
}
module.exports={
    "listOrders":listOrders,
    "listCustomers":listCustomers,
    "install":install,
    "invoice":invoice,
    "stat":stat
}