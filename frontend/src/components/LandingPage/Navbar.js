import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    console.log("Logout");
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right" id="login-icon">
          <li>
            <Link to="/" id="login-link" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right" id="login-icon">
          <li>
            <Link to="/login" id="login-link">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header" id="nav-div">
              <a className="navbar-brand">Yelp</a>
            </div>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
