var chai = require("chai");
chai.use(require("chai-http"));

var app = require("../index");

var expect = require("chai").expect;
var assert = require("chai").assert;
// const should = chai.should();

var agent = require("chai").request.agent(app);

describe("Yelp", function () {
  describe("Login Test", function () {
    it("Customer Incorrect Password", function (done) {
      agent
        .post("/yelp/login/customer")
        .send({ email_id: "a@b.com", password: "wrongpassword" })
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res.text).to.equal("INCORRECT_PASSWORD");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("Signup Test", function () {
    // Restaurant registration
    it("Restaurant Sign up test", function (done) {
      agent
        .post("/yelp/signup/restaurant")
        .send({
          restaurant_name: "New4",
          zip_code: "95091",
          email_id: "new4@new.com",
          password: "new4",
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("RESTAURANT_ADDED");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
  // /search
  describe("Customer/Restaurant details Test", function () {
    it("Get all restaurants test", function (done) {
      agent
        .get("/yelp/restaurant/search/_")
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text).length).to.be.at.least(1);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("Reviews test", function () {
    // Get reviewes for a restaurant id
    // Get reviewes for a customer id
    it("Get all reviews test", function (done) {
      agent
        .get("/yelp/restaurant/restaurantReview/1")
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text).length).to.be.at.least(1);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("Events test", function () {
    it("Register to an event test", function (done) {
      agent
        .post("/yelp/event/register")
        .send({
          event_id: "4",
          restaurant_id: "1",
          customer_id: "7",
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("REGISTERED");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
});
