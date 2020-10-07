import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import { Card } from "react-bootstrap";
import NavBar from "../LandingPage/Navbar.js";

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
    axios
      .get(
        `http://localhost:3001/yelp/event/customer/isRegistered/${localStorage.getItem(
          "customer_id"
        )}/${this.props.location.state.event_id}`
      )
      .then((response) => {
        var cuisines = [];
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
  }

  render() {
    console.log("render");
    console.log(this.props.location.state);
    let redirectVar = null;
    let eventTag = null;
    let registerTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
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

    eventTag = (
      <Card
        bg="white"
        style={{ width: "70rem", height: "30rem", margin: "2%" }}
      >
        <Card.Img
          variant="top"
          style={{ height: "15rem", width: "15rem" }}
          src="http://localhost:3001/yelp/images/event/event_default.png"
        />
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

    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>{eventTag}</div>
      </div>
    );
  }
}
//export Home Component
export default EventDetails;
