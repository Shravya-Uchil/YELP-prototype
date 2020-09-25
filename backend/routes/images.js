const express = require("express");
const router = express.Router();
const pool = require("../mysqlDB.js");
const path = require("path");
const fs = require("fs");

router.get("/user/:user_image", (req, res) => {
  console.log("fetchimage");
  res.sendFile(
    path.join(__dirname, "..") + "/public/uploads/defaultcustomerprofile.jpg"
  );
});

module.exports = router;
