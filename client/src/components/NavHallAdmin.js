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
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item"> 
            <a class="nav-link" href="#">Fandango</a></li>
            <li class="nav-item active">
              <a class="nav-link" href="./moviehalladminhome">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./halladmindashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./halladminbooking">Bookings</a>
            </li>
            
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" ref="serachText" type="search" placeholder="Search Movies..." aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>this.searchMovies(this.refs.serachText.value)}>Search</button>
          </form>
        </div>
      </nav>
    )
  }
  }
  
  export default withRouter(NavHallAdmin);