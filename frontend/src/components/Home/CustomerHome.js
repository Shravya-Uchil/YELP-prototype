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
import FontAwesomeIcon from "react-fontawesome";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.setState({
      search: "",
      noRecords: false,
    });

    this.onChange = this.onChange.bind(this);
    //this.onSearch = this.onSearch.bind(this);
    this.onCuisineSelect = this.onCuisineSelect.bind(this);
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3001/yelp/restaurant/search/_`)
      .then((response) => {
        var cuisines = [];
        console.log("response");
        console.log(response.data);
        if (response.data) {
          if (response.data[0].result === "NO_RECORD") {
            this.setState({
              noRecords: true,
              search: "",
            });
          } else {
            this.setState({
              allRestaurants: response.data,
              filteredRestaurants: response.data,
            });
          }
        }
        console.log("state");
        console.log(this.state);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      noRecords: false,
    });
  };

  onCuisineSelect = (e) => {
    let filter = e.target.text.replace(",", "");
    filter = filter.replace(" ", "");
    if (filter === "All") {
      this.setState({
        filteredRestaurants: this.state.allRestaurants,
      });
    } else {
      var filteredList = this.state.allRestaurants.filter(
        (restaurant) => restaurant.cuisine === filter
      );
      this.setState({
        filteredRestaurants: filteredList,
      });
    }
  };

  render() {
    let cuisineTag = null;
    let redirectVar = null;
    let messageTag = null;
    let restaurantsTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("cust" + redirectVar);
    let cusineList = [
      "All, ",
      "Pizza, ",
      "Chinese, ",
      "Indian, ",
      "Mexican, ",
      "American, ",
      "Thai, ",
      "Burgers, ",
      "Italian, ",
      "Stakehouse, ",
      "Seafood, ",
      "Korean, ",
      "Japanese, ",
      "Breakfast, ",
      "Sushi, ",
      "Vietnamese, ",
      "Sandwiches",
    ];
    cuisineTag = cusineList.map((cuisine) => {
      return (
        <Dropdown.Item href="#" onClick={this.onCuisineSelect}>
          {cuisine}
        </Dropdown.Item>
      );
    });
    if (this.state && this.state.filteredRestaurants) {
      restaurantsTag = this.state.filteredRestaurants.map((restaurant) => {
        return (
          <Col sm={3}>
            <Link to={{ pathname: "/restaurant", state: restaurant }}>
              <Card bg="white" style={{ width: "18rem", margin: "5%" }}>
                <Card.Img
                  variant="top"
                  style={{ height: "15rem" }}
                  src="http://localhost:3001/yelp/images/restaurant/restaurant_default.png"
                />
                <Card.Body>
                  <Card.Title>{restaurant.restaurant_name}</Card.Title>
                  <Card.Text>{restaurant.cuisine}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      });
    }
    if (this.state && this.state.noRecords) {
      messageTag = (
        <Alert variant="warning">No Results. Please try again.</Alert>
      );
    }
    return (
      <div>
        {redirectVar}
        <div>
          <center>
            <br />
            <h3>Search for restaurants!</h3>
            <br />
            <form onSubmit={this.onSearch}>
              <InputGroup style={{ width: "50%", display: "flex" }} size="lg">
                <FormControl
                  placeholder="Pizza, Indian, Italian..."
                  aria-label="Search Restaurants"
                  aria-describedby="basic-addon2"
                  name="search_input"
                  onChange={this.onChange}
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ background: "#d32323" }}
                >
                  Search
                </Button>
              </InputGroup>
              <br />
              <InputGroup style={{ width: "50%", display: "flex" }} size="lg">
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title="Cuisine"
                  id="input-group-dropdown-2"
                  style={{ float: "right" }}
                >
                  {cuisineTag}
                </DropdownButton>
              </InputGroup>
            </form>
            <br />
            <br />
            {messageTag}
            <Row>{restaurantsTag}</Row>
          </center>
        </div>
      </div>
    );
  }
}
//export Home Component
export default CustomerHome;
