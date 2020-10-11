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
import Map from "../Map/Map";
import Geocode from "react-geocode";
import serverAddress from "../../config";

Geocode.setApiKey("AIzaSyAIzrgRfxiIcZhQe3Qf5rIIRx6exhZPwwE");
Geocode.setLanguage("en");
Geocode.setRegion("us");

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.setState({
      search_input: "",
      noRecords: 0,
      locations: [],
    });

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onCuisineSelect = this.onCuisineSelect.bind(this);
    this.getCustomerInfo();
  }

  getCustomerInfo = () => {
    axios
      .get(
        `${serverAddress}/yelp/profile/customerById/${localStorage.getItem(
          "customer_id"
        )}`
      )
      .then((response) => {
        console.log("response");
        console.log(response.data);
        if (response.data) {
          this.setState({
            customer: response.data[0],
          });
          Geocode.fromAddress(response.data[0].city).then(
            (resp) => {
              console.log("Locations");
              console.log(resp.results[0].geometry);
              //console.log(latitude + ", " + longitude);
              let coordinates = {
                lat: resp.results[0].geometry.location.lat,
                lng: resp.results[0].geometry.location.lng,
                address: "YOU",
              };
              console.log("Coordinates");
              console.log(coordinates);

              this.setState({
                center: coordinates,
              });
            },
            (error) => {
              console.error(error);
            }
          );
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(`${serverAddress}/yelp/restaurant/search/_`)
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
      noRecords: 0,
    });
  };

  onCuisineSelect = (e) => {
    let filter = e.target.text;
    if (filter === "All") {
      this.setState({
        filteredRestaurants: this.state.allRestaurants,
        noRecords: 0,
      });
    } else {
      var filteredList = this.state.allRestaurants.filter(
        (restaurant) => restaurant.cuisine === filter
      );
      this.setState({
        filteredRestaurants: filteredList,
      });
      if (filteredList.length === 0) {
        this.setState({ noRecords: 1 });
      }
    }
  };

  onTypeSelect = (e) => {
    let filter = e.target.text;
    let filteredList = this.state.allRestaurants;
    if (filter === "All") {
      this.setState({
        noRecords: 0,
      });
    } else if (filter === "Dine-in") {
      filteredList = this.state.allRestaurants.filter(
        (restaurant) => restaurant.dine_in
      );
    } else if (filter === "Delivery") {
      filteredList = this.state.allRestaurants.filter(
        (restaurant) => restaurant.yelp_delivery
      );
    } else if (filter === "Pickup") {
      filteredList = this.state.allRestaurants.filter(
        (restaurant) => restaurant.curbside_pickup
      );
    }
    this.setState({
      filteredRestaurants: filteredList,
    });

    if (filteredList && filteredList.length === 0) {
      this.setState({ noRecords: 1 });
    }
  };

  onSearch = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    if (this.state) {
      var searchInput =
        typeof this.state.search_input === "undefined" ||
        this.state.search_input === ""
          ? "_"
          : this.state.search_input;
      axios
        .get(`${serverAddress}/yelp/restaurant/search/${searchInput}`)
        .then((response) => {
          if (response.data) {
            if (response.data[0].result === "NO_RECORD") {
              this.setState({
                noRecord: true,
                search_input: searchInput,
                filteredRestaurants: this.state.allRestaurants,
              });
            } else {
              this.setState({
                filteredRestaurants: response.data,
                noRecord: false,
                search_input: "",
              });
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response.data);
          }
        });
    }
  };

  render() {
    if (this.state) {
      console.log("render home");
      console.log(this.state);
    }
    let cuisineTag = null;
    let redirectVar = null;
    let messageTag = null;
    let restaurantsTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("cust" + redirectVar);
    let cusineList = [
      "All",
      "Pizza",
      "Chinese",
      "Indian",
      "Mexican",
      "American",
      "Thai",
      "Burgers",
      "Italian",
      "Stakehouse",
      "Seafood",
      "Korean",
      "Japanese",
      "Breakfast",
      "Sushi",
      "Vietnamese",
      "Sandwiches",
    ];
    cuisineTag = cusineList.map((cuisine) => {
      return (
        <Dropdown.Item href="#" onClick={this.onCuisineSelect}>
          {cuisine}
        </Dropdown.Item>
      );
    });

    let orderTypeList = ["All", "Dine-in", "Delivery", "Pickup"];
    let orderTypeTag = orderTypeList.map((type) => {
      return (
        <Dropdown.Item href="#" onClick={this.onTypeSelect}>
          {type}
        </Dropdown.Item>
      );
    });

    if (this.state && this.state.filteredRestaurants) {
      restaurantsTag = this.state.filteredRestaurants.map((restaurant) => {
        var imageSrc = `${serverAddress}/yelp/images/restaurant/${restaurant.restaurant_image}`;
        return (
          <Col sm={3}>
            <Link to={{ pathname: "/restaurant", state: restaurant }}>
              <Card bg="white" style={{ width: "18rem", margin: "5%" }}>
                <Card.Img
                  variant="top"
                  style={{ height: "15rem" }}
                  src={imageSrc}
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
      console.log(" noRecords - ");
      console.log(this.state);
      messageTag = (
        <Alert variant="warning">No Results. Please try again.</Alert>
      );
    }

    let center = null;
    let locList = [];
    if (this.state && this.state.filteredRestaurants) {
      locList = this.state.filteredRestaurants;
    }
    if (this.state && this.state.center) {
      center = this.state.center;
    }
    var location = {
      address: "1919 Fruitdale Avenue",
      lat: 37.31231,
      lng: -121.92534,
    };
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
                &nbsp;&nbsp;
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title="Mode of Delivery"
                  id="input-group-dropdown-2"
                  style={{ float: "right" }}
                >
                  {orderTypeTag}
                </DropdownButton>
              </InputGroup>
            </form>
            <br />
            <br />
            {messageTag}
            <Row>{restaurantsTag}</Row>
            <Map locationList={locList} center={location} zoomLevel={10} />
          </center>
        </div>
      </div>
    );
  }
}
//export Home Component
export default CustomerHome;
