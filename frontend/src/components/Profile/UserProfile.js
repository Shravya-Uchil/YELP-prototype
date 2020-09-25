import React, { Component } from "react";
import axios from "axios";
/*import PropTypes from "prop-types";
import { connect } from "react-redux";
import backendServer from "../../webConfig";
import {
  getCustomer,
  updateCustomer,
} from "../../actions/customerProfileActions";*/
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    //this.onImageChange = this.onImageChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    //this.onUpload = this.onUpload.bind(this);
  }

  componentWillMount() {
    console.log("We are here, emailid is" + localStorage.getItem("email_id"));
    console.log('${localStorage.getItem("user_id")}');
    axios
      .get(
        `http://localhost:3001/yelp/profile/customer/${localStorage.getItem(
          "email_id"
        )}`
      )
      .then((response) => {
        console.log("Response:", response.data[0]);
        var userData = {
          //user_id: user.user_id || this.state.user_id,
          cust_name: response.data[0].cust_name,
          email_id: response.data[0].email_id,
          address: response.data[0].address,
          //phone_number: response.data[0].phone_number,
          cust_image: response.data[0].cust_image,
          password: response.data[0].password,
          //dob: response.data[0].dob,
          nick_name: response.data[0].nick_name,
          headline: response.data[0].headline,
          //yelp_since: response.data[0].yelp_since,
          //things_love: response.data[0].things_love,
        };
        this.setState(userData);
        console.log("State:", this.state);
      })
      .catch((error) => {
        console.log("error:");
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let data = Object.assign({}, this.state);
    axios
      .post(`http://localhost:3001/yelp/profile/customer`, data)
      .then((response) => {
        console.log("Updated");
        alert("Updated profile");
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  render() {
    var imageSrc = "http://localhost:3001/yelp/images/user/user_profile.png";
    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col>
              <center>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={imageSrc}
                    style={{ height: "10vw" }}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h3>{this.state.cust_name}</h3>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <form onSubmit={this.onUpload}>
                  <br />
                  <br />
                  <div class="custom-file" style={{ width: "80%" }}>
                    <input
                      type="file"
                      class="custom-file-input"
                      name="cust_image"
                      accept="image/*"
                      onChange={this.onImageChange}
                      required
                    />
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
            <Col>
              <h4>Profile</h4>
              <br />
              <Form onSubmit={this.onUpdate}>
                <Form.Row>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="cust_name"
                      type="text"
                      pattern="^[A-Za-z0-9 ]+$"
                      required={true}
                      value={this.state.cust_name}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="dob">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      name="dob"
                      type="date"
                      value={this.state.dob}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      name="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      name="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="nickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                      name="nick_name"
                      type="text"
                      value={this.state.nick_name}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="headline">
                    <Form.Label>Headline</Form.Label>
                    <Form.Control
                      name="headline"
                      type="text"
                      value={this.state.headline}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="email_id">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email_id"
                      value={this.state.email_id}
                      disabled
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="RB.password">
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      placeholder="New Password"
                      value={this.state.password}
                    />
                  </Form.Group>
                </Form.Row>

                <ButtonGroup aria-label="Third group">
                  <Button
                    type="submit"
                    variant="success"
                    style={{ background: "#d32323" }}
                  >
                    Save Changes
                  </Button>
                </ButtonGroup>
                {"  "}
                <ButtonGroup aria-label="Fourth group">
                  <Link to="/home">Cancel</Link>
                </ButtonGroup>
              </Form>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}
export default CustomerProfile;
/*CustomerProfile.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.customerProfile.user,
});

export default connect(mapStateToProps, { getCustomer, updateCustomer })(
  CustomerProfile
);*/
