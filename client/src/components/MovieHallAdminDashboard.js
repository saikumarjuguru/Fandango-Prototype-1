import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';



class MovieHallAdminDashboard extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          let self = this;
          var UserId = 1;
          axios.get('http://localhost:5000/movie_hall/getmoviehallinfo?', {
            params: {
              user_id: 1
            }
          })
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
      
        <div class="card">
        <div class="card-header">
           <strong> Screen {post.screen_id}</strong>
        </div>
        <div class="card-body">
            <h5 class="card-title">Movie: {post.movie_name}</h5>
            <h5 class="card-title">Show Times: {post.slot1} {post.slot2} {post.slot3} {post.slot4}</h5>
            <h5 class="card-title">See it in: {post.see_it_in}</h5>
            <a href="/editMovieDetailAdmin" class="btn btn-primary" onClick={this.editMovieDetailAdmin.bind()}>Edit Detail</a>
          </div>
        </div>
  );


  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
        
      </div>
       
  )
}
}

export default MovieHallAdminDashboard;
