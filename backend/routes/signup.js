const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../mysqlDB.js");

router.post("/customer", (req, res) => {
  console.log("POST customer info");
  //bcrypt.hash(req.body.password, 10, function (err, hash) {
  // Store hash in database
  let sql_query = `CALL register_customer('${req.body.name}', '${req.body.email_id}', '${req.body.password}');`;
  //});
  //var hashedPassword = passwordHash.generate(req.body.password);
  //let sql = `CALL Customer_put('${req.body.name}', '${req.body.email_id}', '${hashedPassword}', '${req.body.address}', '${req.body.phone_number}');`;

  pool.query(sql_query, (err, result) => {
    if (err) {
      console.log("Error " + err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === "USER_ADDED") {
      console.log("Succ: ");
      console.log(result);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "USER_EXISTS"
    ) {
      console.log("Already present");
      console.log(result);
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

module.exports = router;
