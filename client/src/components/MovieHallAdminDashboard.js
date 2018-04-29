import React, {Component} from 'react';
import axios from 'axios';
import NavHallAdmin from './NavHallAdmin';
import config from '../config'
import ChartMovieHallAdmin from './Charts/ChartMovieHallAdmin'

class MovieHallAdminDashboard extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          let self = this;
          var UserId = localStorage.getItem('userId');
          axios.get(config.API_URL+'/movie_hall/getrevenuebymovie', {
            params: {
              user_id: UserId
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

  
render(){
  
  
  console.log('render'+this.state.posts);
  var postItem = this.state.posts.map(post=>

    <div class="card text-white bg-dark mb-3">
    <div class="card-header">
       <strong> Movie Name: {post.movie_name}</strong>
    </div>
    <div class="card-body">
        <h5 class="card-title">Revnue Generated: ${post.revenue}</h5>
        </div>
    </div>

                    
  );

  if(localStorage.getItem('role')==='1'){
  return(
        <div className="halladmindiv">
        <NavHallAdmin></NavHallAdmin>
          <div className="">
            <br/>
            <h3 class="nowshowing">Movies Earning:</h3><br/>
            
            {postItem}
          </div>
          
      </div>
       
  )}
  else{
    window.location.replace("http://localhost:3000/login");
  }
}
}

export default MovieHallAdminDashboard;
