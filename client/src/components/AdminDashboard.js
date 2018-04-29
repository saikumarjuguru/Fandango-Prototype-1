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
class AdminDashboard extends Component {

  
componentWillMount(){
    

  
}



render(){
  
  

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
        
        <br/>
        </div>
      </div>
       
  )
}
}

export default AdminDashboard;
