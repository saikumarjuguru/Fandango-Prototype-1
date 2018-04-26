import React, {Component} from 'react';
import axios from 'axios';
import NavHallAdmin from './NavHallAdmin';
import config from '../config'


class MovieHallAdminSearch extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          var searchtext=localStorage.getItem('searchTextHallAdmin');
          let self = this;
          var UserId = 1;
          
          let req ={
                    "user_id":"1",
                    "searchtext":searchtext
                    }
           axios.post(config.API_URL+'/movie_hall/searchmoviehalladmin',req)
                .then(function (response) {
                    console.log(response.data.message);
                    self.setState({posts:response.data.message})
                })
                .catch(function (error) {
                    console.log(error);
                });
          
          
        
          

}

editMovieDetailAdmin(){
  
}

render(){
  
  
  console.log('render'+this.state.posts);
  var postItem = this.state.posts.map(post=>
      
        <div class="card text-white bg-dark mb-3">
        <div class="card-header">
           <strong> Screen {post.screen_id}</strong>
        </div>
        <div class="card-body">
            <h5 class="card-title">Movie: {post.movie_name}</h5>
            <h5 class="card-title">Show Times: {post.slot1} {post.slot2} {post.slot3} {post.slot4}</h5>
            <h5 class="card-title">See it in: {post.see_it_in}</h5>
            <h5 class="card-title">Ticket Price: ${post.ticket_price}</h5>
            <h5 class="card-title">Number Of Seats: {post.max_seats}</h5>
            <a href="/editMovieDetailAdmin" class="btn btn-warning" onClick={this.editMovieDetailAdmin.bind()}>Edit Detail</a>
          </div>
        </div>
  );


  return(
        <div className="halladmindiv">
        <NavHallAdmin></NavHallAdmin>
        <br/>
        <h3 class="nowshowing">Search Results:</h3><br/>
        {postItem}
      </div>
       
  )
}
}

export default MovieHallAdminSearch;
