import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import ItemCard from "./Item";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import cookie from "react-cookies";
import NavBar from "../LandingPage/Navbar.js";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.setState({
      menu_category: [],
      menu_items: [],
    });
    this.ItemsForCategory = this.ItemsForCategory.bind(this);
    this.getAllMenuItems = this.getAllMenuItems.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getAllMenuItems().then((ret) => {
      this.getAllCategories();
    });
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
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container>
          <Card
            bg="info"
            text="white"
            style={{ width: "70rem", height: "15rem", margin: "2%" }}
          >
            <Row>
              <Col>
                <Card.Img
                  style={{ width: "18rem", height: "15rem" }}
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
