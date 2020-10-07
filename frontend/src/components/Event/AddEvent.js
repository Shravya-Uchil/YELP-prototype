import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import { Redirect } from "react-router";
import NavBar from "../LandingPage/Navbar.js";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
    //this.onImageChange = this.onImageChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    //this.onUpload = this.onUpload.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      restaurant_id: localStorage.getItem("restaurant_id"),
    });
  }

  onAdd = (e) => {
    //prevent page from refresh
    e.preventDefault();
    axios.defaults.withCredentials = true;

    var data = {
      restaurant_id: localStorage.getItem("restaurant_id"),
      event_name: this.state.event_name,
      event_description: this.state.event_description,
      event_date: this.state.event_date,
      event_time: this.state.event_time,
      event_location: this.state.event_location,
      event_hashtag: this.state.event_hashtag,
    };

    //var data = Object.assign({}, this.state);
    console.log("Add event");
    console.log(data);
    axios
      .post(`http://localhost:3001/yelp/event/event`, data)
      .then((response) => {
        console.log("Updated");
        alert("Event Added!");
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
    let redirectVar = null;
    if (!localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/login" />;
    } else if (this.state.isAddDone) {
      redirectVar = <Redirect to="/event" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container fluid={true}>
          <Row>
            <Col style={{ margin: "2%" }}>
              <h4>Create Event</h4>
              <br />
              <Form onSubmit={this.onAdd}>
                <Form.Row>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      name="event_name"
                      type="text"
                      pattern="^[A-Za-z0-9 ]+$"
                      required={true}
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="description">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                      name="event_description"
                      type="text"
                      pattern="^[A-Za-z0-9 ]+$"
                      required={true}
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="location">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control
                      name="event_location"
                      type="text"
                      pattern="^[A-Za-z0-9 ]+$"
                      required={true}
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="date">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      name="event_date"
                      type="date"
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="time">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control
                      name="event_time"
                      type="time"
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="hashtag">
                    <Form.Label>Hashtags</Form.Label>
                    <Form.Control
                      name="event_hashtag"
                      type="text"
                      onChange={this.onChange}
                      autocomplete="off"
                    />
                  </Form.Group>
                </Form.Row>

                <ButtonGroup aria-label="Third group">
                  <Button
                    type="submit"
                    variant="success"
                    style={{ background: "#d32323" }}
                    id="add"
                  >
                    Add Event
                  </Button>
                </ButtonGroup>
                {"  "}
              </Form>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}

export default AddEvent;
