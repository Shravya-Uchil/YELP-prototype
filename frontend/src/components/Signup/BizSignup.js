import React, { Component } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { restaurantSignup } from "../../actions/signupActions";
import { Redirect } from "react-router";
import NavBar from "../LandingPage/Navbar.js";

class RestaurantCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    console.log("Submitting restaurant info");
    //prevent page from refresh
    e.preventDefault();

    if (this.state.password !== this.state.passwordRe) {
      alert("Passwords do not match!!!");
      return;
    }
    const data = {
      restaurant_name: this.state.restName,
      zip_code: this.state.zipcode,
      email_id: this.state.email_id,
      password: this.state.password,
    };

    this.props.restaurantSignup(data);

    this.setState({
      signupDone: 1,
    });
    /*axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/yelp/signup/customer", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.props.history.replace("/login");
        } else {
          alert("status not 200!!!");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to signup!!!");
      });*/
  };
  render() {
    let redirectVar = null;
    let message = "";
    console.log("Restaurant Signup render");
    console.log(this.props);
    if (localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/home" />;
    } else if (
      this.props.restaurant === "RESTAURANT_ADDED" &&
      this.state.signupDone
    ) {
      alert("Registration successful!");
      redirectVar = <Redirect to="/login" />;
    } else if (
      this.props.restaurant === "RESTAURANT_EXISTS" &&
      this.state.signupDone
    ) {
      message = "This Restaurant is already on Yelp!";
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>
          <br />
          <div className="container">
            <h2 id="signup">Sign up for Yelp</h2>
            <br />
            <form onSubmit={this.onSubmit}>
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="restName"
                  onChange={this.onChange}
                  id="restName"
                  placeholder="Restaurant Name"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="zipcode"
                  onChange={this.onChange}
                  id="zipcode"
                  placeholder="Location (Enter Zip Code)"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="email_id"
                  onChange={this.onChange}
                  id="email_id"
                  placeholder="Email Id"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  onChange={this.onChange}
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="passwordRe"
                  onChange={this.onChange}
                  id="passwordRe"
                  placeholder="Re Enter Password"
                  required
                />
              </div>
              <br />
              <div style={{ color: "#ff0000" }}>{message}</div>
              <br />
              <div style={{ width: "30%" }}>
                <button class="btn btn-success" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RestaurantCreate.propTypes = {
  restaurantSignup: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.signup.restaurant,
});

export default connect(mapStateToProps, { restaurantSignup })(RestaurantCreate);
