import React, {Component} from 'react';
import axios from 'axios';
import NavHallAdmin from './NavHallAdmin';
import config from '../config'


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
          axios.get(config.API_URL+'/movie_hall/getrevenuebymovie', {
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


  return(
        <div className="halladminBookingdiv">
        <NavHallAdmin></NavHallAdmin>
          <div className="hallBookinginnerdiv">
            <h2 class="nowshowing">Movies Earning:</h2><br/>
            {postItem}
          </div>
      </div>
       
  )
}
}

export default MovieHallAdminDashboard;
