import React, { Component } from "react";
import axios from "axios";
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../LandingPage/Navbar.js";
import { Redirect } from "react-router";

class CustomerOrderHistory extends Component {
  constructor(props) {
    super(props);

    this.getOrderHistory();
  }

  getOrderHistory = () => {
    axios
      .get(
        `http://localhost:3001/yelp/order/customer/allOrders/${localStorage.getItem(
          "customer_id"
        )}`
      )
      .then((response) => {
        console.log("respose");
        console.log(response);
        if (response.data[0]) {
          this.setState({
            orders_history: response.data,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({
            message: err.response.data,
          });
        }
      });
  };

  render() {
    let message = null;
    let orderCards = null;
    let redirectVar = null;
    if (!localStorage.getItem("customer_id")) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state && this.state.orders_history) {
      if (this.state.orders_history.length > 0) {
        orderCards = this.state.orders_history.map((order) => {
          return (
            <Card
              style={{ width: "50rem", margin: "2%" }}
              bg="white"
              text="dark"
            >
              <Link
                to={{
                  pathname: "/ordercard",
                  state: {
                    order_details: order,
                    prevPath: "/customerorderhistory",
                  },
                }}
                style={{ margin: "2%" }}
              >
                <center>
                  <Card.Title>{order.restaurant_name}</Card.Title>
                </center>
              </Link>
              <Card.Body>
                <Card.Text>Order date: {order.order_date}</Card.Text>
                <Card.Text>Total: {order.order_cost}</Card.Text>
                <Card.Text>
                  <b>Order Status: </b> {order.order_status}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        });
      }
    } else {
      message = (
        <Alert variant="warning">
          You do not have any orders made in the past.
        </Alert>
      );
    }
    return (
      <div>
        {redirectVar}
        <div>
          <NavBar />
          <Container className="justify-content">
            <h3>Orders History</h3> <br />
            {message}
            {orderCards}
          </Container>
        </div>
      </div>
    );
  }
}
export default CustomerOrderHistory;
