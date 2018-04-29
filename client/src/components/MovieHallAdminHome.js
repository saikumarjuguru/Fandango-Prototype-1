import React, {Component} from 'react';
import axios from 'axios';
import NavHallAdmin from './NavHallAdmin';
import config from '../config'


class MovieHallAdminHome extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      
    }

  componentWillMount(){
          let self = this;
          var UserId = localStorage.getItem('userId');
          axios.get(config.API_URL+'/movie_hall/getmoviehallinfo?', {
            params: {
              user_id: UserId
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
  this.props.history.push('/editMovieDetailAdmin');
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
            <button class="btn btn-warning btn-sm" onClick={this.editMovieDetailAdmin.bind(this,post)}>Edit Detail</button>
          </div>
        </div>
  );

  if(localStorage.getItem('role')==='1'){
  return(
        <div className="halladmindiv">
        <NavHallAdmin></NavHallAdmin>
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

export default MovieHallAdminHome;
