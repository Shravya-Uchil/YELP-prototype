const express = require("express");
const router = express.Router();
const db = require("../mysqlDB.js");

router.post("/customer/placeorder", (req, res) => {
  console.log("place order");
  console.log(req.body);
  let sql = `CALL add_order('${req.body.customer_id}', '${req.body.restaurant_id}', '${req.body.order_status}','${req.body.order_cost}', '${req.body.order_type}', '${req.body.order_delivery_status}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log("query 1 done");
    console.log(result[0]);
    if (result && result.length > 0 && result[0][0].status === "ORDER_PLACED") {
      req.body.cart_items.forEach((cart_item) => {
        let sql2 = `CALL add_order_items(${result[0][0].order_id}, ${cart_item.item_id}, ${cart_item.item_quantity});`;
        db.query(sql2, (err, result) => {
          if (err) {
            console.log(err);
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end("Database Error");
          }
        });
      });
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0][0]));
    } else {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0]);
    }
  });
});

router.get("/customer/allOrders/:customer_id", (req, res) => {
  console.log("get all orders for" + req.params.customer_id);
  let sql = `CALL get_orders_customer('${req.params.customer_id}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log(result);
    if (result && result.length > 0 && result[0][0].status == "NO_RECORDS") {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORDS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/restaurant/allOrders/:restaurant_id", (req, res) => {
  console.log("get all orders for" + req.params.restaurant_id);
  let sql = `CALL get_orders_restaurant('${req.params.restaurant_id}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log(result);
    if (result && result.length > 0 && result[0][0].status == "NO_RECORDS") {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORDS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.get("/orderitems/:order_id", (req, res) => {
  console.log("get order items for" + req.params.order_id);
  let sql = `CALL get_orders_items('${req.params.order_id}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log(result);
    if (result && result.length > 0 && result[0][0].status == "NO_RECORDS") {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORDS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/restaurant/updateOrderStatus", (req, res) => {
  console.log("update order status");
  console.log(req.body);
  let sql = `CALL update_order_status('${req.body.order_id}', '${req.body.order_status}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log(result);
    if (result && result.length > 0 && result[0][0].status == "NO_RECORDS") {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORDS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/restaurant/updateDeliveryStatus", (req, res) => {
  console.log("update delivery status");
  console.log(req.body);
  let sql = `CALL update_delivery_status('${req.body.order_id}', '${req.body.order_delivery_status}');`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Database Error");
    }
    console.log(result);
    if (result && result.length > 0 && result[0][0].status == "NO_RECORDS") {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORDS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

module.exports = router;
