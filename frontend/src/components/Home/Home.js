import React, { Component } from "react";
import { Redirect } from "react-router";

class Home extends Component {
  render() {
    let redirectVar = null;
    if (localStorage.getItem("customer_id")) {
      redirectVar = <Redirect to="/customerhome" />;
    } else if (localStorage.getItem("restaurant_id")) {
      redirectVar = <Redirect to="/restauranthome" />;
    } else {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("here " + redirectVar);
    return <div>{redirectVar}</div>;
  }
}
//export Home Component
export default Home;
