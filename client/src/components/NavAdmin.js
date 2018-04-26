import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
 
class NavAdmin extends Component {

  constructor(props){
    super(props);
    this.searchMovies = this.searchMovies.bind(this);
  } 

  searchMovies(userInput){
    
    console.log(userInput.serachText.value);
    console.log(userInput.searchType.value);
    localStorage.setItem('searchTextAdmin',userInput.serachText.value);
    localStorage.setItem('searchTypeAdmin',userInput.searchType.value);

    switch(userInput.searchType.value)
    {
        case "Movie":this.props.history.push('/adminmoviesearch');break;
        case "Movie Hall":this.props.history.push('/adminhallsearch');break;
        case "Bill By Date":
        case "Bill By Month":this.props.history.push('/adminbillsearch');break;
    }
   
  }
  
  render(){
    console.log("render");
    return(
        <nav class="navbar navbar-expand-lg navbar-white bg-dark">
        
        <a class="navbar-brand">
        <img src='images/fandango-header.png' width='210px'/>
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link text-warning" href="./adminhome">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./admindashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./adminbilling">Billing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-warning" href="./adminrevnue">Revenue</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
                <form class="form-inline my-2 my-lg-0">
                    <div class="form-group">
                        <select class="form-control" ref="searchType" id="exampleFormControlSelect1">
                            <option>Movie</option> 
                            <option>Movie Hall</option>  
                            <option>Bill By Date</option>  
                            <option>Bill By Month</option>  
                        </select>
                    </div>
                    <input class="form-control my-2 my-lg-0" ref="serachText" type="search" placeholder="Search Here..." aria-label="Search"/>
                    <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" onClick={()=>this.searchMovies(this.refs)}>Search</button>
                </form>&nbsp;
                <a href='./adminhalladd'><button class="btn btn btn-warning navbar-btn">Add Movie Hall</button> </a>&nbsp;
                <a href='./adminaddmovie'><button class="btn btn btn-warning navbar-btn">Add Movie</button></a>
          </ul>
        </div>
      </nav>
    )
  }
  }
  
  export default withRouter(NavAdmin);