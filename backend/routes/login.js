const express = require("express");
const router = express.Router();
// const passwordHash = require("password-hash");
const bcrypt = require("bcrypt");
const db = require("../mysqlDB.js");

router.post("/", (req, res) => {
  let sql_query = `CALL get_user('${req.body.email_id}');`;

  db.query(sql_query, (err, result) => {
    console.log("result:" + result);
    if (err) {
      console.log("Error:" + err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.send("Database Error");
    }
    if (result && result.length > 0 && result[0][0].status) {
      if (req.body.password === result[0][0].password) {
        req.session.user = req.body.email_id;
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Logged in");
      } else {
        res.writeHead(401, {
          "Content-Type": "text/plain",
        });
        res.end("INCORRECT_PASSWORD");
      }
    } else {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end("NO_USER");
    }
  });
});

module.exports = router;
