import React, {Component} from 'react';

class Create extends Component{

    handleSubmit = (e) => {
        console.log("SUBMITT");
    }
    render(){
        return(
            <div>
                <br/>
                <div className="container">
                    <h2 id="signup">Sign up for Yelp</h2>
                    <br/>
                    <form action="" method="post" onSubmit={this.handleSubmit}>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="UFName" id="UFName" placeholder="First Name" required />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="ULName" id="ULName" placeholder="Last Name" required />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="UEmail" id="UEmail" placeholder="Email Id" required />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="password" class="form-control" name="UPassword" id="UPassword" placeholder="Password" required />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="password" class="form-control" name="UPasswordRe" id="UPasswordRe" placeholder="Re enter Password" required />
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit">Sign Up</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;