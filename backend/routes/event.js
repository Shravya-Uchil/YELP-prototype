const express = require("express");
const router = express.Router();
const pool = require("../mysqlDB.js");
const path = require("path");
const fs = require("fs");

router.get("/all", (req, res) => {
  console.log("get all events");
  let sql = `CALL get_all_events();`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/:event_name", (req, res) => {
  console.log("get event " + req.params.event_name);
  let sql = `CALL get_event_by_name('${req.params.event_name}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log("error");
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result");
    console.log(result);
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/restaurant/:res_id", (req, res) => {
  console.log("get event " + req.params.res_id);
  let sql = `CALL get_event_by_resId(${req.params.res_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/event", (req, res) => {
  console.log("post event");
  console.log(req.body);
  let time = req.body.event_time;
  time = time + ":00";
  let sql = `CALL create_event('${req.body.event_name}', '${req.body.event_description}', '${time}', '${req.body.event_date}', '${req.body.event_location}', '${req.body.event_hashtag}', '${req.body.restaurant_id}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log("done");
    console.log(result);
    if (result && result.length > 0 && result[0][0].status === "EVENT_ADDED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0][0]));
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "EVENT_EXISTS"
    ) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.post("/register", (req, res) => {
  console.log("post register");
  console.log(req.body);
  let sql = `CALL register_to_event('${req.body.event_id}', '${req.body.restaurant_id}', '${req.body.customer_id}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log("done");
    console.log(result);
    if (result && result.length > 0 && result[0][0].status === "REGISTERED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0][0]));
    } else {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.get("/customer/registration/:customer_id", (req, res) => {
  console.log("get cust reg event " + req.params.customer_id);
  let sql = `CALL get_registered_events_customer(${req.params.customer_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/customer/isRegistered/:customer_id/:event_id", (req, res) => {
  console.log(
    "get is evt registered " +
      req.params.customer_id +
      " , " +
      req.params.event_id
  );
  let sql = `CALL get_isRegistered(${req.params.customer_id}, ${req.params.event_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/restaurant/registration/:event_id", (req, res) => {
  console.log("get registered customers for" + req.params.event_id);
  let sql = `CALL get_registered_customers_by_eventId('${req.params.event_id}');`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0]) {
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

module.exports = router;
