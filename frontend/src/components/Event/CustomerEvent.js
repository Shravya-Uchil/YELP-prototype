import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import {
  InputGroup,
  FormControl,
  Button,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import serverAddress from "../../config";

class CustomerEvent extends Component {
  constructor(props) {
    super(props);
    this.setState({
      search_input: "",
      noRecords: false,
    });

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.MyEvents = this.MyEvents.bind(this);
    this.getRegisteredEvents = this.getRegisteredEvents.bind(this);
    //this.onCuisineSelect = this.onCuisineSelect.bind(this);

    this.getRegisteredEvents();
  }

  getRegisteredEvents = () => {
    axios
      .get(
        `${serverAddress}/yelp/event/customer/registration/${localStorage.getItem(
          "customer_id"
        )}`
      )
      .then((response) => {
        var cuisines = [];
        console.log("registration response");
        console.log(response.data);
        if (response.data) {
          if (response.data[0].result === "NO_RECORD") {
            console.log("No registrations");
          } else {
            this.setState({
              registrations: response.data,
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(`${serverAddress}/yelp/event/all`)
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
              allEvents: response.data,
              filteredEvents: response.data,
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  }

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
        .get(`${serverAddress}/yelp/event/${searchInput}`)
        .then((response) => {
          if (response.data) {
            if (response.data[0].result === "NO_RECORD") {
              this.setState({
                noRecord: true,
                search_input: searchInput,
                filteredEvents: this.state.allEvents,
              });
            } else {
              this.setState({
                filteredEvents: response.data,
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      noRecords: false,
    });
  };

  MyEvents = (e) => {
    console.log("Myevents");
    if (this.state.registrations) {
      console.log("Here");
      this.setState({
        filteredEvents: this.state.registrations,
      });
    } else {
      this.setState({
        noRecords: true,
      });
    }
  };

  render() {
    let redirectVar = null;
    let messageTag = null;
    let eventsTag = null;
    let myEventsTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    myEventsTag = (
      <Button
        variant="success"
        name="order"
        onClick={this.MyEvents}
        style={{ background: "#d32323" }}
      >
        Registered events
      </Button>
    );

    if (this.state && this.state.filteredEvents) {
      console.log("render");
      eventsTag = this.state.filteredEvents.map((event) => {
        console.log(event);
        var imageSrc = `${serverAddress}/yelp/images/event/${event.event_image}}`;
        return (
          <Col sm={3}>
            <Card bg="white" style={{ width: "18rem" }}>
              <Link to={{ pathname: "/eventdetails", state: event }}>
                <Card.Img
                  variant="top"
                  style={{ height: "15rem" }}
                  src={imageSrc}
                />
                <Card.Title>{event.event_name}</Card.Title>
              </Link>
              <Card.Body>
                <Card.Text>{event.event_description}</Card.Text>
              </Card.Body>
            </Card>
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
      eventsTag = null;
    }

    return (
      <div>
        {redirectVar}
        <div>
          <center>
            <br />
            <h3>Search for Events!</h3>
            <br />
            <form onSubmit={this.onSearch}>
              <InputGroup style={{ width: "50%", display: "flex" }} size="lg">
                <FormControl
                  placeholder="Event..."
                  aria-label="Search Events"
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
                {myEventsTag}
              </InputGroup>
            </form>
            <br />
            <br />
            {messageTag}
            <Row>{eventsTag}</Row>
          </center>
        </div>
      </div>
    );
  }
}
//export Home Component
export default CustomerEvent;
