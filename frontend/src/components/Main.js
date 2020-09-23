import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import Signup from './Signup/Signup';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;