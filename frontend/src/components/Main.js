import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./LandingPage/Navbar";
import Signup from "./Signup/Signup";
import BizSignup from "./Signup/BizSignup";
import Home from "./Home/Home";
import CustomerHome from "./Home/CustomerHome";
import RestaurantHome from "./Home/RestaurantHome";
import CustomerProfile from "./Profile/UserProfile";
import RestaurantProfile from "./Profile/RestaurantProfile";
import Profile from "./Profile/Profile";
import Restaurant from "./Restaurant/Restaurant";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/customerhome" component={CustomerHome} />
        <Route path="/restauranthome" component={RestaurantHome} />
        <Route path="/profile" component={Profile} />
        <Route path="/customerprofile" component={CustomerProfile} />
        <Route path="/restaurantprofile" component={RestaurantProfile} />
        <Route path="/bizsignup" component={BizSignup} />
        <Route path="/restaurant" component={Restaurant} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
