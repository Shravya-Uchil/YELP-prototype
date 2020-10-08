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
import Event from "./Event/Event";
import RestaurantEvent from "./Event/RestaurantEvent";
import AddEvent from "./Event/AddEvent";
import EventDetails from "./Event/EventDetails";
import RestaurantReview from "./Restaurant/RestaurantReview";
import CustomerCard from "./Customer/CustomerCard";
import AddItem from "./Restaurant/AddItem";
import CustomerOrderHistory from "./Order/CustomerOrderHistory";
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
        <Route path="/event" component={Event} />
        <Route path="/restaurantevent" component={RestaurantEvent} />
        <Route path="/addevent" component={AddEvent} />
        <Route path="/eventdetails" component={EventDetails} />
        <Route path="/restaurantreview" component={RestaurantReview} />
        <Route path="/customercard" component={CustomerCard} />
        <Route path="/additem" component={AddItem} />
        <Route path="/customerorderhistory" component={CustomerOrderHistory} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
