import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
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
          var UserId = 1;
          axios.get(config.API_URL+'/movie_hall/getmoviehallinfo?', {
            params: {
              user_id: 1
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
           <strong> Screen {post.screen_id}</strong>
        </div>
        <div class="card-body">
            <h5 class="card-title">Movie Name: {post.movie_name}</h5>
            <h5 class="card-title">Show Times: {post.slot1} {post.slot2} {post.slot3} {post.slot4}</h5>
            <h5 class="card-title">See it in: {post.see_it_in}</h5>
            <h5 class="card-title">Ticket Price: ${post.ticket_price}</h5>
            <h5 class="card-title">Number Of Seats: {post.max_seats}</h5>
            <a href="/editMovieDetailAdmin" class="btn btn-primary" onClick={this.editMovieDetailAdmin.bind(this,post)}>Edit Detail</a>
          </div>
        </div>
  );


  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
        <br/>
        <h3 class="nowshowing">Now Showing:</h3><br/>
        {postItem}
      </div>
       
  )
}
}

export default MovieHallAdminHome;
