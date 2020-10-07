import React, { Component } from "react";
import { Redirect } from "react-router";
import CustomerEvent from "./CustomerEvent.js";
import RestaurantEvent from "./RestaurantEvent.js";
import NavBar from "../LandingPage/Navbar.js";

class Event extends Component {
  render() {
    let redirectVar = null;
    let event = null;
    console.log("Events");
    if (localStorage.getItem("customer_id")) {
      event = <CustomerEvent />;
    } else if (localStorage.getItem("restaurant_id")) {
      event = <RestaurantEvent />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        {event}
      </div>
    );
  }
}
//export Home Component
export default Event;
