import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

//Define a Login Component
class Login extends Component{
    
    submitLogin = (e) => {
        e.preventDefault();
        return;
    }

    render(){
        return(
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>User Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                            <div class="login-link">
                            <Link to="/signup"> Sign up </Link>               
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;