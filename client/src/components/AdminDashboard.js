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
      posts:[],
      allposts:[]
    }
    
  }

componentWillMount(){
  let self=this;
  axios.get(config.API_URL+'/admin/getusertrace')
  .then(function (response) {
    console.log(response.data.message);
    self.setState({posts:response.data.message,allposts:response.data.message})
    console.log(self.state.posts);})

}



render(){
  
var postItem = this.state.posts.map(post=>
  <tr>
 
  <td>{post.user_name}</td>
  <td>{post.path}</td>
  </tr>  );


  
if(localStorage.getItem('role')==='2'){
  return(
        <div className="halladmindashboard">
          <NavAdmin></NavAdmin>
          <br/>
        <div class="card text-white bg-dark mb-3">
        <div className="row">
          <div className="col-md-4">
            <h4 class="nowshowing">Top 10 Movies with Revenue/Year:</h4><br/>
            <ChartMovies/>
          </div>
          <div className="col-md-4">
            <h4 class="nowshowing">Top 10 Cities with Revenue/Year:</h4><br/>
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
              <div className="input-group input-group-sm mb-3 center">
                <input type="text" className="form-control" aria-label="Small" placeholder="Enter User Name/City" aria-describedby="inputGroup-sizing-sm" onChange={(event) => {
                                               var val = event.target.value;
                                               var posts = this.state.allposts.filter((post) => {
                                                   return ((post.user_name.toLowerCase().indexOf(val.toLowerCase()) > -1)||(post.city.toLowerCase().indexOf(val.toLowerCase()) > -1)||(post.state.toLowerCase().indexOf(val.toLowerCase()) > -1));
                                               })
                                               this.setState({
                                                   posts: posts
                                               })
                                            }}/>
              </div>
            <table class="table table-bordered">
            <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Path</th>
                        
                    </tr>
            </thead>
            <tbody>
            {postItem}
            </tbody>
        </table>
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
