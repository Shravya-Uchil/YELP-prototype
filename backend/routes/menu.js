const express = require("express");
const router = express.Router();
const pool = require("../mysqlDB.js");
const path = require("path");
const fs = require("fs");

router.get("/category/:res_id", (req, res) => {
  console.log("get category " + req.params.res_id);
  let sql = `CALL get_menu_categories_by_resId(${req.params.res_id});`;
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

router.get("/categoryById/:category_id", (req, res) => {
  console.log("get category by id " + req.params.category_id);
  let sql = `CALL get_menu_category_byId(${req.params.category_id});`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0]) {
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/items/:res_id", (req, res) => {
  console.log("get items " + req.params.res_id);
  let sql = `CALL get_items_by_resId(${req.params.res_id});`;
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

router.post("/item", (req, res) => {
  console.log("post item");
  console.log(req.body);
  var sql1 = `CALL update_get_category('${req.body.item_category}', '${req.body.restaurant_id}');`;
  pool.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    } else {
      var item_id = 0;
      if (req.body.item_id != null) {
        item_id = req.body.item_id;
      }
      let sql = `CALL update_item('${item_id}', '${req.body.item_name}', '${req.body.item_description}', '${req.body.item_ingredients}', '${req.body.item_price}', '${req.body.restaurant_id}', '${result[0][0].category_id}', '${req.body.item_image}');`;
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
        if (
          result &&
          result.length > 0 &&
          (result[0][0].status === "ITEM_ADDED" ||
            result[0][0].status === "ITEM_UPDATED")
        ) {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(JSON.stringify(result[0][0]));
        } else if (
          result &&
          result.length > 0 &&
          result[0][0].status === "NO_RECORD"
        ) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end(result[0][0].status);
        }
      });
    }
  });
});

module.exports = router;
