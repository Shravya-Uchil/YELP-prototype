import React, { Component } from "react";
import { Redirect } from "react-router";
import NavBar from "../LandingPage/Navbar.js";

class Profile extends Component {
  render() {
    let redirectVar = null;
    if (localStorage.getItem("customer_id")) {
      redirectVar = <Redirect to="/customerprofile" />;
    } else if (localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/restaurantprofile" />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar />
        {redirectVar}
      </div>
    );
  }
}
//export Home Component
export default Profile;
