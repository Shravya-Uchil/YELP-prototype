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

class CustomerCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3001/yelp/profile/customerById/${this.props.location.state.customer_id}`
      )
      .then((response) => {
        var cuisines = [];
        console.log("response");
        console.log(response.data);
        if (response.data) {
          this.setState({
            customer: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  }

  render() {
    console.log("render");
    console.log(this.state);
    let redirectVar = null;
    let customerTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state && this.state.customer) {
      customerTag = (
        <Row>
          <Col sm={2}>
            <Card
              bg="light"
              text="dark"
              style={{ width: "70rem", height: "20rem", margin: "2%" }}
            >
              <Card.Img
                variant="top"
                style={{ height: "15rem", width: "15rem" }}
                src="http://localhost:3001/yelp/images/user/user_profile.png"
              />
              <Card.Title>{this.state.customer.cust_name || ""}</Card.Title>
            </Card>
          </Col>
          <Col sm={2}>
            <Card
              bg="light"
              text="dark"
              style={{ width: "70rem", height: "20rem", margin: "2%" }}
            >
              <Card.Body>
                <Card.Text>
                  Nick name: {this.state.customer.nick_name || ""}
                </Card.Text>
                <Card.Text>City: {this.state.customer.city || ""}</Card.Text>
                <Card.Text>State: {this.state.customer.state || ""}</Card.Text>
                <Card.Text>
                  Country: {this.state.customer.country || ""}
                </Card.Text>
                <Card.Text>
                  Phone no: {this.state.customer.phone_number || ""}
                </Card.Text>
                <Card.Text>Bio: {this.state.customer.headline || ""}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }

    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>{customerTag}</div>
      </div>
    );
  }
}
//export Home Component
export default CustomerCard;
