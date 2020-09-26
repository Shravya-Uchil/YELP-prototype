const express = require("express");
const router = express.Router();
//const passwordHash = require("password-hash");
const db = require("../mysqlDB.js");

router.get("/customer/:email_id", (req, res) => {
  console.log("Get details for:");
  console.log(req.params.email_id);
  let sql_query = `CALL get_user('${req.params.email_id}');`;
  db.query(sql_query, (err, result) => {
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

router.post("/customer", (req, res) => {
  /*if(req.body.password && req.body.password !== "")
    {
      var hashedPassword = "'" + passwordHash.generate(req.body.password) + "'";
    }
    else{
      var hashedPassword = "NULL";
    }*/
  console.log("Update Customer");
  console.log(req.body);
  let sql = `CALL update_customer('${req.body.email_id}', '${req.body.cust_name}', '${req.body.password}', '${req.body.city}', '${req.body.state}', '${req.body.country}', '${req.body.nick_name}', '${req.body.headline}', 'shravya');`;
  db.query(sql, (err, result) => {
    if (err) {
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
      console.log("Success");
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "NO_RECORD"
    ) {
      console.log("401");
      console.log(result);
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

module.exports = router;
