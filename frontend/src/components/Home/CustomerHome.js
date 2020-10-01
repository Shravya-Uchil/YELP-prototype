import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CustomerHome extends Component {
  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    console.log("cust" + redirectVar);
    return (
      <div>
        {redirectVar}
        <div>
          <h1>Yelp Customer</h1>
        </div>
      </div>
    );
  }
}
//export Home Component
export default CustomerHome;
