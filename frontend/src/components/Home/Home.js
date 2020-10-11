import React, { Component } from "react";
import { Redirect } from "react-router";
import CustomerHome from "./CustomerHome.js";
import RestaurantHome from "./RestaurantHome.js";
import NavBar from "../LandingPage/Navbar.js";

class Home extends Component {
  render() {
    let redirectVar = null;
    let home = null;

    if (localStorage.getItem("customer_id")) {
      home = <CustomerHome />;
    } else if (localStorage.getItem("restaurant_id")) {
      home = <RestaurantHome />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        {home}
      </div>
    );
  }
}
//export Home Component
export default Home;
