const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../mysqlDB.js");

router.get("/search/:search_str", (req, res) => {
  console.log("Get all resturants matching: " + req.params.search_str);
  let sql_query = `CALL search_restaurants('${req.params.search_str}');`;
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
      console.log("Success:");
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/restaurant/:restaurant_id", (req, res) => {
  console.log("Get restaurant details for:" + req.params.restaurant_id);
  let sql_query = `CALL get_restaurant_byId('${req.params.restaurant_id}');`;
  db.query(sql_query, (err, result) => {
    if (err) {
      console.log("Error");
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      console.log("Success:");
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/restaurant", async (req, res) => {
  console.log("Update Restaurant");
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
        console.log("Success:");
        console.log(result);
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(result[0][0].status);
      } else if (
        result &&
        result.length > 0 &&
        result[0][0].status === "NO_RECORD"
      ) {
        console.log("No record found:");
        console.log(result);
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

router.get("/restaurantReview/:restaurant_id", (req, res) => {
  console.log("Get reviews for:" + req.params.restaurant_id);
  let sql_query = `CALL get_reviews('${req.params.restaurant_id}');`;
  db.query(sql_query, (err, result) => {
    if (err) {
      console.log("Error");
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      console.log("Success:");
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/restaurantReview", async (req, res) => {
  console.log("Add review");
  let sql = `CALL add_review('${req.body.review_text}', '${req.body.review_rating}', '${req.body.restaurant_id}' ,'${req.body.customer_id}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error:");
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === "REVIEW_ADDED") {
      console.log("Success:");
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "NO_RECORD"
    ) {
      console.log("No record found:");
      console.log(result);
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

module.exports = router;
