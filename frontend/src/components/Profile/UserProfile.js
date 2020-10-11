import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCustomerDetails,
  updateCustomerDetails,
} from "../../actions/customerProfileActions";
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
import serverAddress from "../../config";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentWillMount() {
    console.log("We are here, emailid is " + localStorage.getItem("email_id"));
    /*axios
      .get(
        `${serverAddress}/yelp/profile/customer/${localStorage.getItem(
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
      });*/
    this.props.getCustomerDetails();
  }

  componentWillReceiveProps(nextProps) {
    console.log("We in props received, next prop is: ", nextProps);
    if (nextProps.customer) {
      var { customer } = nextProps;

      var customerData = {
        cust_name: customer.cust_name || this.state.cust_name,
        email_id: customer.email_id || this.state.email_id,
        city: customer.city || this.state.city,
        state: customer.state || this.state.state,
        country: customer.country || this.state.country,
        phone_number: customer.phone_number || this.state.phone_number,
        cust_image: customer.cust_image || this.state.cust_image,
        dob: customer.dob || this.state.dob,
        nick_name: customer.nick_name || this.state.nick_name,
        headline: customer.headline || this.state.headline,
        yelp_since: customer.yelp_since || this.state.yelp_since,
        things_love: customer.things_love || this.state.things_love,
        find_me: customer.find_me || this.state.find_me,
        blog_website: customer.blog_website || this.state.blog_website,
        customer_id: customer.customer_id || this.state.customer_id,
      };
      this.setState(customerData);
      console.log("customer data");
      console.log(customerData);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cust_image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${serverAddress}/yelp/images/customer/${this.state.customer_id}`,
        formData,
        config
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          file_text: "Choose file...",
          cust_image: response.data,
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

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();
    /*axios.defaults.withCredentials = true;
    let data = Object.assign({}, this.state);
    axios
      .post(`${serverAddress}/yelp/profile/customer`, data)
      .then((response) => {
        console.log("Updated");
        alert("Updated profile");
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });*/
    let data = Object.assign({}, this.state);
    this.props.updateCustomerDetails(data);
    document.getElementById("update").blur();
  };

  render() {
    var imageSrc;
    var fileText = this.state.file_text || "Choose image..";
    if (this.state) {
      imageSrc = `${serverAddress}/yelp/images/customer/${this.state.cust_image}`;
    }
    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col class="col-md-3 col-3" style={{ margin: "2%" }}>
              <center>
                <Card style={{ width: "15rem" }}>
                  <Card.Img variant="top" src={imageSrc} />
                  <Card.Body>
                    <Card.Title>
                      <h3>{this.state.cust_name}</h3>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <br />
                <form onSubmit={this.onUpload}>
                  <div class="custom-file" style={{ width: "80%" }}>
                    <input
                      type="file"
                      class="custom-file-input"
                      name="cust_image"
                      accept="image/*"
                      onChange={this.onImageChange}
                      required
                    />
                    <label class="custom-file-label" for="cust_image">
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
            <Col class="col-md-4 col-4" style={{ margin: "2%" }} xs={6} md={4}>
              <h4>Basic Details</h4>
              <br />
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  <Form>
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
                          autocomplete="off"
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
                          autocomplete="off"
                          required
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          name="city"
                          type="text"
                          value={this.state.city}
                          onChange={this.onChange}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          name="state"
                          type="text"
                          value={this.state.state}
                          onChange={this.onChange}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          name="country"
                          type="text"
                          value={this.state.country}
                          onChange={this.onChange}
                          autocomplete="off"
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
                          autocomplete="off"
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
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col class="col-md-3 col-3" style={{ margin: "2%" }}>
              <h4>About</h4>
              <br />
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="yelp_since">
                        <Form.Label>Yelping Since</Form.Label>
                        <Form.Control
                          name="yelp_since"
                          type="date"
                          value={this.state.yelp_since}
                          onChange={this.onChange}
                          autocomplete="off"
                          required
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="things_love">
                        <Form.Label>Things I Love</Form.Label>
                        <Form.Control
                          name="things_love"
                          type="text"
                          value={this.state.things_love}
                          onChange={this.onChange}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="find_me">
                        <Form.Label>Find Me In</Form.Label>
                        <Form.Control
                          name="find_me"
                          type="text"
                          value={this.state.find_me}
                          onChange={this.onChange}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="blog_website">
                        <Form.Label>My Blog or Website</Form.Label>
                        <Form.Control
                          name="blog_website"
                          type="text"
                          value={this.state.blog}
                          onChange={this.onChange}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={this.state.phone_number}
                          onChange={this.onChange}
                          autocomplete="off"
                          pattern="^[0-9]+$"
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
                          required={true}
                          autocomplete="off"
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <center>
              <ButtonGroup aria-label="Third group">
                <Button
                  variant="success"
                  style={{ background: "#d32323" }}
                  id="update"
                  onClick={this.onUpdate}
                >
                  Save Changes
                </Button>
              </ButtonGroup>
              {"  "}
              <ButtonGroup aria-label="Fourth group">
                <Link to="/login">Cancel</Link>
              </ButtonGroup>
            </center>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}
CustomerProfile.propTypes = {
  getCustomerDetails: PropTypes.func.isRequired,
  updateCustomerDetails: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customer: state.customerProfile.customer,
});

export default connect(mapStateToProps, {
  getCustomerDetails,
  updateCustomerDetails,
})(CustomerProfile);
