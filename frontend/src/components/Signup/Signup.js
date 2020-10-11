import React, { Component } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { customerSignup } from "../../actions/signupActions";
import { Redirect } from "react-router";
import NavBar from "../LandingPage/Navbar.js";
import serverAddress from "../../config";

class Create extends Component {
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
    console.log("Submitting customer info");
    //prevent page from refresh
    e.preventDefault();
    console.log("P1:" + this.state.UPassword);
    console.log("P2:" + this.state.UPasswordRe);
    if (this.state.UPassword !== this.state.UPasswordRe) {
      alert("Password miss match!!!");
      return;
    }
    const data = {
      cust_name: this.state.UFName + " " + this.state.ULName,
      email_id: this.state.UEmail,
      password: this.state.UPassword,
    };

    this.props.customerSignup(data);

    this.setState({
      signupDone: 1,
    });
    /*axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("${serverAddress}/yelp/signup/customer", data)
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
    console.log("Signup render");
    console.log(this.props);
    if (localStorage.getItem("customer_id")) {
      redirectVar = <Redirect to="/home" />;
    } else if (
      this.props.customer === "CUSTOMER_ADDED" &&
      this.state.signupDone
    ) {
      alert("Registration successful!");
      redirectVar = <Redirect to="/login" />;
    } else if (
      this.props.customer === "CUSTOMER_EXISTS" &&
      this.state.signupDone
    ) {
      message = "Email id is already registered!";
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
                  name="UFName"
                  onChange={this.onChange}
                  id="UFName"
                  placeholder="First Name"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="ULName"
                  onChange={this.onChange}
                  id="ULName"
                  placeholder="Last Name"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="UEmail"
                  onChange={this.onChange}
                  id="UEmail"
                  placeholder="Email Id"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="UPassword"
                  onChange={this.onChange}
                  id="UPassword"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div style={{ width: "30%" }} class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="UPasswordRe"
                  onChange={this.onChange}
                  id="UPasswordRe"
                  placeholder="Re enter Password"
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

Create.propTypes = {
  customerSignup: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customer: state.signup.customer,
});

export default connect(mapStateToProps, { customerSignup })(Create);
