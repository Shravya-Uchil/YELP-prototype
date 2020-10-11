import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { Card } from "react-bootstrap";
import NavBar from "../LandingPage/Navbar.js";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import serverAddress from "../../config";

class RestaurantReview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let res_id = null;
    if (this.props.restaurant_details) {
      res_id = this.props.restaurant_details.restaurant_id;
    } else {
      res_id = this.props.location.state.restaurant_id;
    }
    axios
      .get(`${serverAddress}/yelp/restaurant/restaurantReview/${res_id}`)
      .then((response) => {
        var cuisines = [];
        console.log("response");
        console.log(response.data);
        if (response.data) {
          this.setState({
            reviews: response.data,
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
    let reviewsTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state && this.state.reviews) {
      reviewsTag = this.state.reviews.map((review) => {
        return (
          <Card
            bg="white"
            style={{ width: "70rem", height: "15rem", margin: "2%" }}
          >
            <StarRatings
              rating={review.review_rating}
              starRatedColor="#d32323"
              numberOfStars={5}
              name="review_rating"
              disabled={true}
            />
            <Link to={{ pathname: "/customercard", state: review }}>
              <Card.Title>{review.cust_name}</Card.Title>
            </Link>
            <Card.Body>
              <Card.Text>
                {review.restaurant_name} | {review.review_date}
              </Card.Text>
              <Card.Text>{review.review_text}</Card.Text>
            </Card.Body>
          </Card>
        );
      });
    }
    let navbar = <NavBar />;
    if (this.props.restaurant_details) {
      navbar = null;
    }
    return (
      <div>
        {redirectVar}
        {navbar}
        <div>{reviewsTag}</div>
      </div>
    );
  }
}
//export
export default RestaurantReview;
