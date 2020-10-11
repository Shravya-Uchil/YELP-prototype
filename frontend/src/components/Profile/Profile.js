import React, { Component } from "react";
import { Redirect } from "react-router";
import NavBar from "../LandingPage/Navbar.js";
import CustomerProfile from "./UserProfile.js";
import RestaurantProfile from "./RestaurantProfile.js";

class Profile extends Component {
  render() {
    let redirectVar = null;
    let profile = null;
    if (localStorage.getItem("customer_id")) {
      profile = <CustomerProfile />;
    } else if (localStorage.getItem("restaurant_id")) {
      profile = <RestaurantProfile />;
    } else {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <br />
        {profile}
      </div>
    );
  }
}
//export Home Component
export default Profile;
