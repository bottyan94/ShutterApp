const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp)

const service = require('../Customer/customerService');
const dao = require('../dao')
const daoMock = sinon.mock(dao);

const customerService = new service(this.dao);
describe('Customer Service Test', function () {
    it('list orders by customersID', function () {
        daoMock.expects('read').once();
        var id = {"customer.customerID": Number(395)}
        customerService.ownOrders(id, "orders", (orders) => {
            //console.log(orders.customer.customerID)
            assert(orders.customer.customerID, 395);
        })
    });
})

//End to end
describe('Customer OwnOrders',  ()=> {
    it('should be return status 414, if req.body undefined',(done)=>{
      chai.request(server)
          .post('/customer/registerCustomer')
          .send({"customer":{
                  "name":"",
                  "email":"test@gmail.com",
                  "birth":"2000.01.01",
                  "ordersID":[]
              }})
          .end(function(err, res) {
              res.should.have.status(414)
              done();
          });
    })
    it('should be return status 200',(done)=>{
        chai.request(server)
            .post('/customer/registerCustomer')
            .send({"customer":{
                    "name":"Test",
                    "email":"test@gmail.com",
                    "birth":"2000.01.01",
                    "ordersID":[]
                }})
            .end(function(err, res) {
                res.should.have.status(200)
                done();
            });
    })
    /*it('should be return status 400, if name is already in use',(done)=>{
        chai.request(server)
            .post('/customer/registerCustomer')
            .send({"customer":{
                    "name":"Bottyán Tamás",
                    "email":"test@gmail.com",
                    "birth":"2000.01.01",
                    "ordersID":[]
                }})
            .end(function(err, res) {
                res.should.have.status(400)
                done();
            });
    })*/
});