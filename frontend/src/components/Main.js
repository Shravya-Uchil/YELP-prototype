import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div className="Main__router">
                <Switch>
                    {/*Render Different Component based on Route*/}
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;