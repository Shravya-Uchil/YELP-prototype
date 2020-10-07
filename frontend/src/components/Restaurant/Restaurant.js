import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import ItemCard from "./Item";
import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";
import cookie from "react-cookies";
import NavBar from "../LandingPage/Navbar.js";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.setState({
      menu_category: [],
      menu_items: [],
      review_rating: 0,
    });
    this.ItemsForCategory = this.ItemsForCategory.bind(this);
    this.getAllMenuItems = this.getAllMenuItems.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.getAllMenuItems().then((ret) => {
      this.getAllCategories();
    });
    this.onAdd = this.onAdd.bind(this);
    console.log("End constructor");
  }

  componentWillMount() {
    console.log("mount");
    if (this.props.location.state) {
      document.title = this.props.location.state.restaurant_name;
      localStorage.setItem(
        "selected_restaurant_id",
        this.props.location.state.restaurant_id
      );
    }
  }

  getAllCategories = () => {
    if (this.props.location.state) {
      axios
        .get(
          `http://localhost:3001/yelp/menu/category/${this.props.location.state.restaurant_id}`
        )
        .then((response) => {
          if (response.data[0]) {
            this.setState({
              menu_category: response.data,
            });
          }
          console.log("Category get");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log(err.response.data);
          }
        });
    }
  };

  getAllMenuItems = () => {
    if (this.props.location.state) {
      return axios
        .get(
          `http://localhost:3001/yelp/menu/items/${this.props.location.state.restaurant_id}`
        )
        .then((response) => {
          console.log("Items get");
          //if (response.data[0]) {
          this.setState({
            menu_items: response.data,
          });
          //}
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log(err.response.data);
          }
        });
    }
  };

  ItemsForCategory = (menu_category) => {
    console.log("filter item for:");
    console.log(menu_category);
    console.log(this.state.menu_items);
    var itemsSection = [];

    //console.log(menu_category.category_name);
    if (
      this.state &&
      this.state.menu_items &&
      this.state.menu_items.length > 0
    ) {
      var filteredItems = this.state.menu_items.filter(
        (_item) => _item.category_id === menu_category.category_id
      );
      //console.log(filteredItems);
      if (filteredItems.length > 0) {
        var tag = <h4>{menu_category.category_name}</h4>;
        itemsSection.push(tag);
        for (var i = 0; i < filteredItems.length; i++) {
          var item = <ItemCard menu_item={filteredItems[i]} />;
          itemsSection.push(item);
        }
      }
      return itemsSection;
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeRating = (newRating, name) => {
    this.setState({
      [name]: newRating,
    });
  };

  onAdd = (e) => {
    //prevent page from refresh
    e.preventDefault();
    axios.defaults.withCredentials = true;
    if (this.props.location.state) {
      var data = {
        restaurant_id: this.props.location.state.restaurant_id,
        customer_id: localStorage.getItem("customer_id"),
        review_text: this.state.review_text,
        review_rating: this.state.review_rating || 0,
      };
    }

    //var data = Object.assign({}, this.state);
    console.log("Add review");
    console.log(data);
    axios
      .post(`http://localhost:3001/yelp/restaurant/restaurantReview`, data)
      .then((response) => {
        alert("Review Added!");
        this.setState({
          isAddDone: 1,
        });
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  render() {
    console.log("render");
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    let redirectVar = null,
      category = null,
      menuTag = [],
      restaurant_name,
      contact,
      cuisine,
      zip_code,
      description,
      restaurant = this.props.location.state;

    if (!localStorage.getItem("customer_id") || !this.props.location.state) {
      redirectVar = <Redirect to="/home" />;
    }

    if (restaurant) {
      restaurant_name = restaurant.restaurant_name;
      contact = restaurant.contact;
      zip_code = restaurant.zip_code;
      cuisine = restaurant.cuisine;
      description = restaurant.description;
    }
    if (
      this.state &&
      this.state.menu_category &&
      this.state.menu_category.length > 0
    ) {
      for (var i = 0; i < this.state.menu_category.length; i++) {
        category = this.ItemsForCategory(this.state.menu_category[i]);
        menuTag.push(category);
      }
    }
    console.log("render");
    console.log(this.state);
    let rating = 0;
    if (this.state && this.state.review_rating) {
      rating = this.state.review_rating;
    }
    let isReviewAdded = false;
    if (this.state && this.state.isAddDone) {
      isReviewAdded = true;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container>
          <Card
            bg="light"
            text="dark"
            style={{ width: "70rem", height: "20rem", margin: "2%" }}
          >
            <Row>
              <Col>
                <Card.Img
                  style={{ width: "20rem", height: "20rem" }}
                  src={
                    "http://localhost:3001/yelp/images/restaurant/restaurant_default.png"
                  }
                />
              </Col>
              <Card.Body>
                <Card.Title>
                  <h1>{restaurant_name}</h1>
                </Card.Title>
                <br />
                <Card.Text>
                  <h4>
                    {zip_code} | {contact}
                  </h4>
                </Card.Text>
                <br />
                <Card.Text>
                  <h4>Cuisine: {cuisine}</h4>
                </Card.Text>
                <br />
                <Card.Text>
                  <h4>Description: {description}</h4>
                </Card.Text>
              </Card.Body>
            </Row>
          </Card>
          <Form onSubmit={this.onAdd}>
            <StarRatings
              rating={rating}
              starRatedColor="#d32323"
              changeRating={this.changeRating}
              numberOfStars={5}
              name="review_rating"
            />
            <Form.Row>
              <Form.Group as={Col} controlId="addreview">
                <Form.Label>Write review</Form.Label>
                <Form.Control
                  name="review_text"
                  as="textarea"
                  onChange={this.onChange}
                  autocomplete="off"
                  rows={3}
                />
              </Form.Group>
            </Form.Row>
            <div className="d-flex flex-row">
              <Button
                type="submit"
                style={{ background: "#d32323" }}
                id="add"
                disabled={isReviewAdded}
              >
                Add Review
              </Button>
              {"   "}
              <Link to={{ pathname: "/restaurantreview", state: restaurant }}>
                <Button name="view_review" style={{ background: "#d32323" }}>
                  View Reviews
                </Button>
              </Link>
            </div>
            {"  "}
          </Form>
          <br />
          <Container>{menuTag}</Container>
        </Container>
        <center>
          <Button
            variant="success"
            name="order"
            href="/cart"
            style={{ background: "#d32323" }}
          >
            Order
          </Button>
        </center>
        <br />
      </div>
    );
  }
}

export default Restaurant;
