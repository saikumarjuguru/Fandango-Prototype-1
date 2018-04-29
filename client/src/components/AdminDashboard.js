import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'
import {Bar} from 'react-chartjs-2'
import ChartMovies from './Charts/ChartMovies'
import ChartCity from './Charts/ChartCity'
import ChartHall from './Charts/ChartHall'
import ChartCPP from './Charts/ChartCPP'
import ChartMovieClick  from "./Charts/ChartMovieClick";
import ChartReviews from './Charts/ChartReviews';
import ChartTraceUser from './Charts/ChartTraceUser';
import ChartLessSeen from './Charts/ChartLessSeen';

class AdminDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[]
    }
    
  }

componentWillMount(){
        let self = this;
        axios.get(config.API_URL+'/admin/getlessseen')
        .then(function (response) {
          console.log(response.data.message);
          self.setState({posts:response.data.message})
          console.log(this.state.posts);
        })
        .catch(function (error) {
          console.log(error);
        });

}



render(){
  
  
if(localStorage.getItem('role')==='2'){
  return(
        <div className="halladmindashboard">
          <NavAdmin></NavAdmin>
          <br/>
        <div class="card text-white bg-dark mb-3">
        <div className="row">
          <div className="col-md-4">
            <h4 class="nowshowing">Top 10 Movies with Revnue/Year:</h4><br/>
            <ChartMovies/>
          </div>
          <div className="col-md-4">
            <h4 class="nowshowing">Top 10 Cities with Revnue/Year:</h4><br/>
            <ChartCity/>
          </div>
          <div className="col-md-4">
             <h4 class="chart">Top 10 Halls(Tickets sold) last month:</h4><br/>
             <ChartHall/>
          </div>
        </div>
        <br/>
        </div>
        <div class="card text-white bg-dark mb-3">
        <div className="row">
          <div className="col-md-4">
            <h4 class="nowshowing">Number of Clicks per page:</h4><br/>
            <ChartCPP/>
          </div>
          <div className="col-md-4">
            <h4 class="nowshowing">Number of Clicks/Movie:</h4><br/>
            <ChartMovieClick/>
          </div>
          <div className="col-md-4">
            <h4 class="nowshowing">Number of Reviews/Movie:</h4><br/>
            <ChartReviews/>
          </div>
        </div>
        </div>
        <div class="card text-white bg-dark mb-3">
        <div className="row">
          <div className="col-md-8">
            <h4 class="nowshowing">User Trace Diagram:</h4><br/>
            <ChartTraceUser/>
          </div>
          <div className="col-md-4">
            <h4 class="nowshowing">Area Less Seen:</h4><br/>
            <ChartLessSeen/>
          </div>
          
        </div>
        
        <br/>
        </div>
        <div class="card text-white bg-dark mb-3">
        
        </div>
      </div>
       
  )}
  else{
    window.location.replace("http://localhost:3000/login");
  }
}
}

export default AdminDashboard;
