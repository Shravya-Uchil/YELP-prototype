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
  Dropdown,
  DropdownButton,
  InputGroup,
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
      order_type: "PICKUP",
    });
    this.ItemsForCategory = this.ItemsForCategory.bind(this);
    this.getAllMenuItems = this.getAllMenuItems.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.getAllMenuItems().then((ret) => {
      this.getAllCategories();
    });
    this.onAdd = this.onAdd.bind(this);
    console.log("End constructor");
  }

  componentWillMount() {
    console.log("mount");
    localStorage.removeItem("cart_list");
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

  onOrder = (e) => {
    if (localStorage.getItem("cart_list")) {
      var total_cost = 0;
      var cartList = [];
      cartList.push(...JSON.parse(localStorage.getItem("cart_list")));
      for (let i = 0; i < cartList.length; i++) {
        total_cost =
          cartList[i].item_quantity * cartList[i].item_price + total_cost;
      }
      if (this.props.location.state) {
        let data = {
          customer_id: localStorage.getItem("customer_id"),
          restaurant_id: this.props.location.state.restaurant_id,
          order_status: "New Order",
          order_cost: total_cost,
          order_type: this.state.order_type,
          cart_items: cartList,
          order_delivery_status: "Order Received",
        };
        console.log("placing order");
        console.log(data);
        axios
          .post(`http://localhost:3001/yelp/order/customer/placeorder`, data)
          .then((response) => {
            localStorage.removeItem("cart_items");
            //alert("Your order is placed!");
            this.setState({
              isOrderPlaced: 1,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
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

        alert("Review already exists!");
      });
  };

  onTypeSelect = (e) => {
    let type = e.target.text;
    this.setState({
      order_type: type,
    });
  };

  render() {
    let message = null;
    console.log("render");
    let redirect = null;
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login" />;
    }

    let category = null,
      menuTag = [],
      restaurant_name,
      contact,
      cuisine,
      zip_code,
      description,
      restaurant = this.props.location.state;

    if (!localStorage.getItem("customer_id") || !this.props.location.state) {
      redirect = <Redirect to="/home" />;
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
    let orderTypeList = ["Delivery", "Pickup"];
    let orderTypeTag = orderTypeList.map((type) => {
      return (
        <Dropdown.Item href="#" onClick={this.onTypeSelect}>
          {type}
        </Dropdown.Item>
      );
    });
    let ordertag = (
      <Button
        variant="success"
        name="order"
        onClick={this.onOrder}
        style={{ background: "#d32323" }}
      >
        Order
      </Button>
    );
    if (this.state && this.state.isOrderPlaced) {
      redirect = <Redirect to="/customerOrderHistory" />;
      console.log("redirect");
      console.log(redirect);
    }
    return (
      <div>
        {redirect}
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
          <DropdownButton
            variant="outline-secondary"
            title="Order Type"
            id="input-group-dropdown-2"
            style={{ display: "flow-root" }}
          >
            {orderTypeTag}
          </DropdownButton>
          <br />
          <br />
          {ordertag}
        </center>
        <br />
      </div>
    );
  }
}

export default Restaurant;
