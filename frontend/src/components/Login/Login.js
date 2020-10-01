import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { customerLogin } from "../../actions/loginActions";

//Define a Login Component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitLogin = (e) => {
    e.preventDefault();
    let typeVal = document.getElementById("login_type").value;

    let data = Object.assign({}, this.state);
    /*const data = {
      email_id: this.state.email_id,
      password: this.state.password,
    };*/
    this.props.customerLogin(data, typeVal);
    this.setState({
      loginDoneOnce: 1,
    });

    /*e.preventDefault();
    const data = {
      email_id: this.state.email_id,
      password: this.state.password,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/yelp/login", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          localStorage.setItem("email_id", this.state.email_id);
          this.props.history.replace("/home");
        } else {
          alert("status not 200!!!");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid username or password!!!");
      });*/
  };

  /*componentWillReceiveProps(nextProps) {
    console.log("We in props received, next prop is: ", nextProps);
    console.log(this.state);
    console.log("Myprops: ", this.props);
    if (nextProps.customer) {
      var { customer } = nextProps.customer;
      this.setState(customer);
    }
  }*/

  render() {
    console.log("Login render");
    let message = "";
    let redirectVar = null;
    if (this.props.customer && this.props.customer.customer_id) {
      if (this.props.customer.login_type === 0) {
        localStorage.setItem("email_id", this.props.customer.email_id);
        localStorage.setItem("customer_id", this.props.customer.customer_id);
        localStorage.setItem("login_type", "customer");
        redirectVar = <Redirect to="/home" />;
      } else {
        localStorage.setItem("email_id", this.props.customer.email_id);
        localStorage.setItem("restaurant_id", this.props.customer.customer_id);
        localStorage.setItem("login_type", "restaurant");
        redirectVar = <Redirect to="/home" />;
      }
    } else if (
      this.props.customer === "NO_CUSTOMER" &&
      this.state.loginDoneOnce
    ) {
      message = "Cannot recognize username or password!!!";
    } else if (
      this.props.customer === "INCORRECT_PASSWORD" &&
      this.state.loginDoneOnce
    ) {
      message = "Incorrect Password!!!";
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Login</h2>
                <p>Please enter your username and password</p>
              </div>
              <form onSubmit={this.submitLogin}>
                <div style={{ color: "#ff0000" }}>{message}</div>
                <br />
                <div class="form-group">
                  Choose login type:
                  <select id="login_type" name="type">
                    <option value="Customer">Customer</option>
                    <option value="Restaurant">Restaurant</option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="email_id"
                    onChange={this.onChange}
                    placeholder="Email Id"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
                <div class="login-link">
                  <Link to="/signup"> Customer Sign up </Link>
                </div>
                <div class="login-link">
                  <Link to="/bizsignup"> Restaurant Sign up </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//export Login Component
Login.propTypes = {
  customerLogin: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customer: state.login.customer,
});

export default connect(mapStateToProps, { customerLogin })(Login);
