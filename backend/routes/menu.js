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

module.exports = router;
