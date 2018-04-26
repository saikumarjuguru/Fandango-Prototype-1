import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
 
class NavAdmin extends Component {

  constructor(props){
    super(props);
   
  } 
  
  render(){
    console.log("render");
    return(
        <nav class="navbar navbar-expand-lg navbar-white bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item"> 
            <a class="nav-link text-warning" href="#">Fandango</a></li>
            <li class="nav-item active">
<<<<<<< HEAD
              <a class="nav-link" href="./adminhome">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./admindashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./halladminbooking">Billing</a>
=======
              <a class="nav-link text-warning" href="./adminhome">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./admindashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./halladminbooking">Billing</a>
>>>>>>> 01ec5579dd35744eb05fcf433bcc3f6beec3e45a
            </li>
          </ul>
<<<<<<< HEAD
          
=======
          <ul class="nav navbar-nav navbar-right">
                <a href='./adminhalladd'><button class="btn btn btn-warning navbar-btn">Add Movie Hall</button> </a>&nbsp;
                <button class="btn btn btn-warning navbar-btn">Add Movie</button>
          </ul>
>>>>>>> 01ec5579dd35744eb05fcf433bcc3f6beec3e45a
        </div>
      </nav>
    )
  }
  }
  
  export default withRouter(NavAdmin);