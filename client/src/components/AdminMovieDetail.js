import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'


class AdminMovieDetail extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      
    }

  componentWillMount(){
          let self = this;
          var data = JSON.parse(localStorage.getItem('hall_selected')); 
          console.log(data.movie_hall_id);
          axios.get(config.API_URL+'/admin/getmoviesinhall', {
            params: {
              movie_hall_id: data.movie_hall_id
            }
          })
          .then(function (response) {
            console.log(response.data.message);
            self.setState({posts:response.data.message})
            console.log(this.state.posts);
          })
          .catch(function (error) {
            console.log(error);
          });

}

editMovieDetailAdmin(movie_selected){
  console.log(JSON.stringify(movie_selected));
  localStorage.setItem('movie_selected',JSON.stringify(movie_selected));
  
}

render(){
  
  
  
  var postItem = this.state.posts.map(post=>
      
        <div class="card text-white bg-dark mb-3">
        <div class="card-header">
           <h6><strong> Screen {post.screen_number}</strong></h6>
        </div>
        <div class="card-body">
            <h6 class="card-title">Movie Name: {post.movie_name}</h6>
            <h6 class="card-title">Show Times: {post.slot1>0 ?'12:00PM':null} {post.slot2>0 ?'03:00PM':null} {post.slot3>0 ?'06:00PM':null} {post.slot4>0 ?'09:00PM':null}</h6>
            <h6 class="card-title">See it in: {post.see_it_in}</h6>
            <h6 class="card-title">Ticket Price: ${post.ticket_price}</h6>
            <h6 class="card-title">Number Of Seats: {post.max_seats}</h6>
            <a href="./adminmovieedit" class="btn btn-warning btn-sm" onClick={this.editMovieDetailAdmin.bind(this,post)}>Edit Detail</a>
          </div>
        </div>
  );

  if(localStorage.getItem('role')==='2'){
  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
        <br/>
        <h3 class="nowshowing">Now Showing:</h3><br/>
        {postItem}
      </div>
       
  )}
  else{
    window.location.replace("http://localhost:3000/login");
  }
}
}

export default AdminMovieDetail;
