const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../mysqlDB.js");

router.get("/customer/:email_id", (req, res) => {
  let sql_query = `CALL get_user('${req.params.email_id}');`;
  db.query(sql_query, (err, result) => {
    if (err) {
      console.log("Error:");
      console.log(err);
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

router.get("/customerById/:cust_id", (req, res) => {
  let sql_query = `CALL get_user_byId('${req.params.cust_id}');`;
  db.query(sql_query, (err, result) => {
    if (err) {
      console.log("Error:");
      console.log(err);
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

router.post("/customer", async (req, res) => {
  var encryptedPassword = "NULL";
  try {
    if (req.body.password && req.body.password !== "") {
      encryptedPassword =
        "'" + (await bcrypt.hash(req.body.password, 12)) + "'";
    }
    let sql = `CALL update_customer('${req.body.email_id}', '${req.body.cust_name}', ${encryptedPassword}, '${req.body.city}', '${req.body.state}', '${req.body.country}', '${req.body.nick_name}', '${req.body.headline}', 
    '${req.body.yelp_since}','${req.body.dob}','${req.body.things_love}','${req.body.find_me}','${req.body.blog_website}','${req.body.phone_number}');`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error:");
        console.log(err);
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error in Data");
      }
      if (
        result &&
        result.length > 0 &&
        result[0][0].status === "CUSTOMER_UPDATED"
      ) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(result[0][0].status);
      } else if (
        result &&
        result.length > 0 &&
        result[0][0].status === "NO_RECORD"
      ) {
        res.writeHead(401, {
          "Content-Type": "text/plain",
        });
        res.end(result[0][0].status);
      }
    });
  } catch (err) {
    console.log("Error in encryption:");
    console.log(err);
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end("Error in encrypting password!!");
  }
});

router.get("/restaurant/:restaurant_id", (req, res) => {
  let sql_query = `CALL get_restaurant_byId('${req.params.restaurant_id}');`;
  db.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
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

router.post("/restaurant", async (req, res) => {
  var encryptedPassword = "NULL";
  try {
    if (req.body.password && req.body.password !== "") {
      encryptedPassword =
        "'" + (await bcrypt.hash(req.body.password, 12)) + "'";
    }
    let sql = `CALL update_restaurant('${req.body.restaurant_id}', '${req.body.restaurant_name}', ${encryptedPassword}, '${req.body.zip_code}' ,'${req.body.contact}', '${req.body.description}', NULL, NULL, '${req.body.cuisine}', '${req.body.curbside_pickup}', '${req.body.dine_in}', '${req.body.yelp_delivery}');`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error:");
        console.log(err);
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error in Data");
      }
      if (
        result &&
        result.length > 0 &&
        result[0][0].status === "RESTAURANT_UPDATED"
      ) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(result[0][0].status);
      } else if (
        result &&
        result.length > 0 &&
        result[0][0].status === "NO_RECORD"
      ) {
        res.writeHead(401, {
          "Content-Type": "text/plain",
        });
        res.end(result[0][0].status);
      }
    });
  } catch (err) {
    console.log("Error in encryption:");
    console.log(err);
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end("Error in encrypting password!!");
  }
});

module.exports = router;
