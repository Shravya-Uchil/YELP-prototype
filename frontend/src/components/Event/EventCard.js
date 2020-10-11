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

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.setState({
      noRecords: false,
    });
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:3001/yelp/event/restaurant/${localStorage.getItem(
          "restaurant_id"
        )}`
      )
      .then((response) => {
        console.log("response");
        console.log(response.data);
        if (response.data) {
          if (response.data[0].result === "NO_RECORD") {
            this.setState({
              noRecords: true,
            });
          } else {
            this.setState({
              allEvents: response.data,
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

  render() {
    let redirectVar = null;
    let messageTag = null;
    let eventsTag = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state && this.state.allEvents) {
      eventsTag = this.state.allEvents.map((event) => {
        var imageSrc = `http://localhost:3001/yelp/images/event/${event.event_image}`;
        return (
          <Col sm={3}>
            <Card bg="white" style={{ width: "18rem" }}>
              <Link to={{ pathname: "/registration", state: event }}>
                <Card.Img
                  variant="top"
                  style={{ height: "15rem" }}
                  src={imageSrc}
                />
                <Card.Title>{event.event_name}</Card.Title>
              </Link>
              <Card.Body>
                <Card.Text>{event.event_description}</Card.Text>
                <Card.Text>{event.event_location}</Card.Text>
                <Card.Text>
                  {event.event_date} | {event.event_time}
                </Card.Text>
                <Card.Text>{event.event_hashtag}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }
    if (this.state && this.state.noRecords) {
      messageTag = <Alert variant="warning">No events found.</Alert>;
    }

    return (
      <div>
        {redirectVar}
        <div>
          <center>
            <br />
            <br />
            <br />
            {messageTag}
            <Row>{eventsTag}</Row>
            <br />
            <br />
            <br />
            <br />
            <Button
              variant="success"
              name="order"
              href="/addEvent"
              style={{ background: "#d32323" }}
            >
              Add Event
            </Button>
          </center>
        </div>
      </div>
    );
  }
}
//export Home Component
export default RestaurantEvent;
