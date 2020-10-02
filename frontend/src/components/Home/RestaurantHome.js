import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card, Container, Col, Form, Row } from "react-bootstrap";
import axios from "axios";

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios
      .get(
        `http://localhost:3001/yelp/profile/restaurant/${localStorage.getItem(
          "restaurant_id"
        )}`
      )
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            restaurant: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let redirectVar = null;
    let restaurantDetails = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state && this.state.restaurant) {
      let restaurant = this.state.restaurant;
      let resImageSrc =
        "http://localhost:3001/yelp/images/restaurant/restaurant_default.png";
      restaurantDetails = (
        <Card
          bg="info"
          text="white"
          style={{ width: "70rem", height: "15rem", margin: "2%" }}
        >
          <Row>
            <Col>
              <Card.Img
                style={{ width: "18rem", height: "15rem" }}
                src={resImageSrc}
              />
            </Col>
            <Card.Body>
              <Card.Title>
                <h1>{restaurant.restaurant_name}</h1>
              </Card.Title>
              <br />
              <Card.Text>
                <h4>
                  {restaurant.contact} | {restaurant.zip_code}
                </h4>
              </Card.Text>
              <br />
              <Card.Text>
                <h4>Cuisine: {restaurant.cuisine}</h4>
              </Card.Text>
              <br />
              <Card.Text>
                <h4>Description: {restaurant.description}</h4>
              </Card.Text>
              <br />
            </Card.Body>
          </Row>
        </Card>
      );
    }
    return (
      <div>
        {redirectVar}
        <div>
          <Container className="justify-content">
            <br />
            {restaurantDetails}
          </Container>
        </div>
      </div>
    );
  }
}
//export Home Component
export default RestaurantHome;
