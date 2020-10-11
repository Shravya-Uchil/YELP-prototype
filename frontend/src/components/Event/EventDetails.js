import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Button, Col, Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import NavBar from "../LandingPage/Navbar.js";
import { Link } from "react-router-dom";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister = (e) => {
    axios.defaults.withCredentials = true;

    var data = {
      event_id: this.props.location.state.event_id,
      customer_id: localStorage.getItem("customer_id"),
      restaurant_id: this.props.location.state.restaurant_id,
    };

    //var data = Object.assign({}, this.state);
    console.log("Register to event");
    console.log(data);
    axios
      .post(`http://localhost:3001/yelp/event/register`, data)
      .then((response) => {
        console.log("Registered");
        alert("Registered to event!!");
        this.setState({
          isRegistered: 1,
        });
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  componentDidMount() {
    if (localStorage.getItem("customer_id")) {
      axios
        .get(
          `http://localhost:3001/yelp/event/customer/isRegistered/${localStorage.getItem(
            "customer_id"
          )}/${this.props.location.state.event_id}`
        )
        .then((response) => {
          console.log("response");
          console.log(response.data);
          if (response.data) {
            if (response.data[0].result === "REGISTERED") {
              this.setState({
                isRegistered: 1,
              });
            }
          }
        })
        .catch((error) => {
          console.log("Error");
          console.log(error);
        });
    } else {
      axios
        .get(
          `http://localhost:3001/yelp/event/restaurant/registration/${this.props.location.state.event_id}`
        )
        .then((response) => {
          console.log("response cust");
          console.log(response.data);
          if (response.data) {
            this.setState({
              registered_customers: response.data,
            });
          }
        })
        .catch((error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }

  render() {
    console.log("render");
    console.log(this.props.location.state);
    let redirectVar = null;
    let eventTag = null;
    let registerTag = null;
    let registered_customers = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (localStorage.getItem("customer_id")) {
      if (this.state && this.state.isRegistered) {
        registerTag = (
          <Button
            variant="success"
            name="registered"
            style={{ background: "#d32323" }}
            disabled={true}
          >
            Registered
          </Button>
        );
      } else {
        registerTag = (
          <Button
            variant="success"
            name="registered"
            onClick={this.onRegister}
            style={{ background: "#d32323" }}
          >
            Register
          </Button>
        );
      }
    } else {
      if (this.state && this.state.registered_customers) {
        registered_customers = this.state.registered_customers.map((cust) => {
          var imageSrc = `http://localhost:3001/yelp/images/customer/${cust.cust_image}`;
          return (
            <Col sm={3} style={{ margin: "2%" }}>
              <Card bg="white" style={{ width: "15rem" }}>
                <Link to={{ pathname: "/customercard", state: cust }}>
                  <Card.Img variant="top" src={imageSrc} />
                  <Card.Title>{cust.cust_name}</Card.Title>
                </Link>
              </Card>
            </Col>
          );
        });
      }
    }

    var eventSrc = `http://localhost:3001/yelp/images/event/${this.props.location.state.event_image}`;
    eventTag = (
      <Card
        bg="white"
        style={{ width: "70rem", height: "30rem", margin: "2%" }}
      >
        <Card.Img variant="top" style={{ width: "15rem" }} src={eventSrc} />
        <Card.Title>{this.props.location.state.event_name}</Card.Title>
        <Card.Body>
          <Card.Text>{this.props.location.state.event_description}</Card.Text>
          <Card.Text>{this.props.location.state.event_location}</Card.Text>
          <Card.Text>
            {this.props.location.state.event_date} |{" "}
            {this.props.location.state.event_time}
          </Card.Text>
          <Card.Text>{this.props.location.state.event_hashtag}</Card.Text>
        </Card.Body>
        {registerTag}
      </Card>
    );

    let header = null;
    if (localStorage.getItem("restaurant_id")) {
      header = <h4>Registered Customers</h4>;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>{eventTag}</div>
        <Container style={{ margin: "5%" }}>
          {header}
          {registered_customers}
        </Container>
      </div>
    );
  }
}
//export Home Component
export default EventDetails;
