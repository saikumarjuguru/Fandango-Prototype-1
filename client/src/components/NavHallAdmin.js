import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
 
class NavHallAdmin extends Component {

  constructor(props){
    super(props);
    this.searchMovies = this.searchMovies.bind(this);
  } 
    
  searchMovies(searchText){
   
    localStorage.setItem('searchTextHallAdmin',searchText);
    this.props.history.push('/halladminsearch');
  }
  
  
  render(){
    console.log("render");
    return(
        <nav class="navbar navbar-expand-lg navbar-white bg-dark">
         <a class="navbar-brand">
        <img src='images/fadango-header.png' width='160px'/>
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            
            <li class="nav-item active">
              <a class="nav-link text-warning" href="./moviehalladminhome">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./halladmindashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./halladminbooking">Bookings</a>
            </li>
            
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" ref="serachText" type="search" placeholder="Search Movies..." aria-label="Search"/>
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" onClick={()=>this.searchMovies(this.refs.serachText.value)}>Search</button>
          </form>
        </div>
      </nav>
    )
  }
  }
  
  export default withRouter(NavHallAdmin);