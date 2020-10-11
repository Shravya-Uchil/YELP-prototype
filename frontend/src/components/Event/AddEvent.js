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
    this.onImageChange = this.onImageChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onUpload = this.onUpload.bind(this);
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

  onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("event_image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:3001/yelp/images/event/${this.state.event_id}`,
        formData,
        config
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          file_text: "Choose file...",
          event_image: response.data,
        });
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      file_text: e.target.files[0].name,
    });
  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/login" />;
    } else if (this.state.isAddDone) {
      redirectVar = <Redirect to="/event" />;
    }
    var imageSrc;
    var fileText = this.state.file_text || "Choose image..";
    if (this.state) {
      imageSrc = `http://localhost:3001/yelp/images/item/${this.state.event_image}`;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <Container fluid={true}>
          <Row>
            <Col xs={6} md={4}>
              <center>
                <Card style={{ width: "18rem", margin: "5%" }}>
                  <Card.Img variant="top" src={imageSrc} />
                  <Card.Body>
                    <Card.Title>
                      <h3>{this.state.item_name}</h3>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <form onSubmit={this.onUpload}>
                  <br />
                  <div class="custom-file" style={{ width: "80%" }}>
                    <input
                      type="file"
                      class="custom-file-input"
                      name="event_image"
                      accept="image/*"
                      onChange={this.onImageChange}
                      required
                    />
                    <label class="custom-file-label" for="event_image">
                      {fileText}
                    </label>
                  </div>
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ background: "#d32323" }}
                  >
                    Upload
                  </Button>
                </form>
              </center>
            </Col>
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
