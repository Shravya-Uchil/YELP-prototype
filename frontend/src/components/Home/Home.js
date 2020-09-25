import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <h1>Yelp</h1>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
