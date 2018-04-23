import React, {Component} from 'react';

class NavAdmin extends Component {

    
  
  
  
  render(){
    console.log("render");
    return(
        <nav class="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Fandango</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Billing</a></li>
                    
                </ul>
            </div>
        </nav>
    )
  }
  }
  
  export default NavAdmin;