import React, { Component } from "react";
import { Redirect } from "react-router";

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
    return <div>{redirectVar}</div>;
  }
}
//export Home Component
export default Profile;
