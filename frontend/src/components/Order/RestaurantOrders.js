import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../LandingPage/Navbar.js";
import { Redirect } from "react-router";
import serverAddress from "../../config";

class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryStateValue: "Change Delivery Status",
      stateValue: "Change Order Status",
      filter_title: "Order Status",
      noRecords: 0,
    };

    this.changeStateValue = this.changeStateValue.bind(this);
    this.changeDeliveryStateValue = this.changeDeliveryStateValue.bind(this);
    this.onUpdateDelivery = this.onUpdateDelivery.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.getOrderHistory();
  }

  getOrderHistory = () => {
    axios
      .get(
        `${serverAddress}/yelp/order/restaurant/allOrders/${localStorage.getItem(
          "restaurant_id"
        )}`
      )
      .then((response) => {
        console.log("respose");
        console.log(response);
        if (response.data[0]) {
          this.setState({
            orders_history: response.data,
            orders_history_filtered: response.data,
            noRecords: 0,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({
            message: err.response.data,
            noRecords: 1,
          });
        }
      });
  };

  changeDeliveryStateValue = (e, id) => {
    this.setState({
      deliveryStateValue: e.target.text,
      order_delivery_status: e.target.text,
      order_delivery_status_id: id,
    });
  };

  changeStateValue = (e, id) => {
    this.setState({
      stateValue: e.target.text,
      order_status: e.target.text,
      order_status_id: id,
    });
  };

  onUpdateDelivery = (e) => {
    console.log("delivery");
    console.log(e.target);
    console.log(this.state);
    if (
      this.state &&
      this.state.order_delivery_status &&
      this.state.order_delivery_status_id === parseInt(e.target.id)
    ) {
      var data = {
        order_id: this.state.order_delivery_status_id,
        order_delivery_status: this.state.order_delivery_status,
      };
      axios
        .post(
          `${serverAddress}/yelp/order/restaurant/updateDeliveryStatus`,
          data
        )
        .then((response) => {
          console.log("response");
          console.log(response);
          let orders = this.state.orders_history_filtered;
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].order_id === this.state.order_delivery_status_id) {
              orders[
                i
              ].order_delivery_status = this.state.order_delivery_status;
              break;
            }
          }
          this.forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please change the delivery status to update.");
    }
  };

  onUpdateOrder = (e) => {
    console.log("order");
    console.log(e.target);
    console.log(this.state);
    if (
      this.state &&
      this.state.order_status &&
      this.state.order_status_id === parseInt(e.target.id)
    ) {
      var data = {
        order_id: this.state.order_status_id,
        order_status: this.state.order_status,
      };
      axios
        .post(`${serverAddress}/yelp/order/restaurant/updateOrderStatus`, data)
        .then((response) => {
          console.log("response");
          console.log(response);
          let orders = this.state.orders_history_filtered;
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].order_id === this.state.order_status_id) {
              orders[i].order_status = this.state.order_status;
              break;
            }
          }
          this.forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please change the order status to update.");
    }
  };

  onFilterSelect = (e) => {
    this.setState({
      filter_title: e.target.text,
    });
    let filter = e.target.text;
    if (filter === "All") {
      this.setState({
        orders_history_filtered: this.state.orders_history,
        noRecords: 0,
      });
    } else {
      var filteredList = this.state.orders_history.filter(
        (order) => order.order_status === filter
      );
      this.setState({
        orders_history_filtered: filteredList,
      });
      if (filteredList.length === 0) {
        this.setState({ noRecords: 1 });
      }
    }
  };

  render() {
    let message = null;
    let orderCards = null;
    let redirectVar = null;
    if (!localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/login" />;
    }

    let order_status_filter = [
      "All",
      "New Order",
      "Delivered Order",
      "Cancelled Order",
    ];
    let status_tag = order_status_filter.map((status) => {
      return (
        <Dropdown.Item href="#" onClick={this.onFilterSelect}>
          {status}
        </Dropdown.Item>
      );
    });

    if (this.state && this.state.noRecords) {
      message = <Alert variant="warning">No Results. Please try again.</Alert>;
    }

    if (this.state && this.state.orders_history_filtered) {
      if (this.state.orders_history_filtered.length > 0) {
        orderCards = this.state.orders_history_filtered.map((order) => {
          let delivery_details = null;
          let details = null;
          if (order.order_type === "DELIVERY") {
            details = [
              "Order Received",
              "Preparing",
              "On the way",
              "Delivered",
            ];
          } else {
            details = [
              "Order Received",
              "Preparing",
              "Pick up ready",
              "Picked up",
            ];
          }
          delivery_details = details.map((d) => {
            return (
              <Dropdown.Item
                href="#"
                onClick={(e) =>
                  this.changeDeliveryStateValue(e, order.order_id)
                }
              >
                {d}
              </Dropdown.Item>
            );
          });

          let order_status = (details = [
            "New Order",
            "Delivered Order",
            "Cancelled Order",
          ]);
          let order_status_tag = details.map((d) => {
            return (
              <Dropdown.Item
                href="#"
                onClick={(e) => this.changeStateValue(e, order.order_id)}
              >
                {d}
              </Dropdown.Item>
            );
          });
          console.log("render");
          console.log(this.state);

          return (
            <Card
              style={{ width: "70rem", margin: "2%" }}
              bg="white"
              text="dark"
            >
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Text>
                      Customer Name:{" "}
                      <Link
                        to={{
                          pathname: "/customercard",
                          state: order,
                        }}
                      >
                        {" "}
                        {order.cust_name}
                      </Link>
                    </Card.Text>
                    <Card.Text>Order Date: {order.order_date}</Card.Text>
                    <Card.Text>Order Price: {order.order_cost}</Card.Text>
                    <Card.Text>Order Type: {order.order_type}</Card.Text>
                    <Card.Text>
                      <b>Order Status: </b> {order.order_status}
                    </Card.Text>
                    <Card.Text>
                      <b>Delivery Status: </b> {order.order_delivery_status}
                    </Card.Text>
                    <Card.Text>
                      <Link
                        to={{
                          pathname: "/ordercard",
                          state: {
                            order_details: order,
                            prevPath: "/customerorderhistory",
                          },
                        }}
                      >
                        Order Details
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col sm={3} align="center">
                  <Row sm={3}>
                    <Card.Body>
                      <Card.Title>
                        <DropdownButton
                          id={order.order_id}
                          title={this.state.stateValue}
                          variant="outline-secondary"
                        >
                          {order_status_tag}
                        </DropdownButton>
                      </Card.Title>
                    </Card.Body>
                  </Row>
                  <Row>
                    <Card.Body>
                      <Card.Title>
                        <Button
                          variant="primary"
                          onClick={this.onUpdateOrder}
                          style={{ background: "#d32323" }}
                          id={order.order_id}
                        >
                          Update Order Status
                        </Button>
                      </Card.Title>
                    </Card.Body>
                  </Row>
                </Col>
                <Col sm={3}>
                  <Row sm={3}>
                    <Card.Body>
                      <Card.Title>
                        <DropdownButton
                          variant="outline-secondary"
                          id="dropdown-dstatus-button"
                          title={this.state.deliveryStateValue}
                        >
                          {delivery_details}
                        </DropdownButton>
                      </Card.Title>
                    </Card.Body>
                  </Row>
                  <Row>
                    <Card.Body>
                      <Card.Title>
                        <Button
                          variant="primary"
                          onClick={this.onUpdateDelivery}
                          style={{ background: "#d32323" }}
                          id={order.order_id}
                        >
                          Update Delivery Status
                        </Button>
                      </Card.Title>
                    </Card.Body>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        });
      }
    } else {
      message = <Alert variant="warning">No orders available!!!</Alert>;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <NavBar />
          <Container>
            <h3>Orders</h3> <br />
            {message}
            <DropdownButton
              variant="outline-secondary"
              title={this.state.filter_title}
              id="input-group-dropdown-2"
              style={{ float: "left" }}
            >
              {status_tag}
            </DropdownButton>
            <br />
            <br />
            {orderCards}
          </Container>
        </div>
      </div>
    );
  }
}
export default RestaurantOrders;
