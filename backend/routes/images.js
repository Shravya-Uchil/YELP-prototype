const express = require("express");
const router = express.Router();
const pool = require("../mysqlDB.js");
const path = require("path");
const fs = require("fs");

router.get("/user/:user_image", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..") + "/public/uploads/defaultcustomerprofile.jpg"
  );
});

router.get("/restaurant/:restaurant_image", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..") + "/public/uploads/restaurant_default.jpg"
  );
});

router.get("/item/:item_image", (req, res) => {
  res.sendFile(path.join(__dirname, "..") + "/public/uploads/item_default.jpg");
});

router.get("/event/:event_image", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..") + "/public/uploads/event_default.png"
  );
});

module.exports = router;
