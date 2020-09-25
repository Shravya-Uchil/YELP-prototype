import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
    const data = {
      email_id: this.state.UEmail,
      password: this.state.password,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/yelp/login", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          localStorage.setItem("email_id", this.state.UEmail);
          this.props.history.replace("/home");
        } else {
          alert("status not 200!!!");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid username or password!!!");
      });
  };

  render() {
    return (
      <div class="container">
        <div class="login-form">
          <div class="main-div">
            <div class="panel">
              <h2>User Login</h2>
              <p>Please enter your username and password</p>
            </div>

            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="UEmail"
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
            <button onClick={this.submitLogin} class="btn btn-primary">
              Login
            </button>
            <div class="login-link">
              <Link to="/signup"> Sign up </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
