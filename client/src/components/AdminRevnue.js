import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'


class AdminRevnue extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[],
        posts2:[]
      }
    }

  componentWillMount(){
          let self = this;
          var UserId = 1;
          axios.get(config.API_URL+'/admin/getrevenuebymovie')
          .then(function (response) {
            console.log(response.data.message);
            self.setState({posts:response.data.message})
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get(config.API_URL+'/admin/getrevenuebymoviehall')
          .then(function (response) {
            console.log(response.data.message);
            self.setState({posts2:response.data.message})
          })
          .catch(function (error) {
            console.log(error);
          });

}

  
render(){
  
  
  console.log('render'+this.state.posts);
  var postItem = this.state.posts.map(post=>
    <tr>
        <td>{post.movie_name}</td>
        <td>${post.revenue}</td>
    </tr>
 );
  var postItem2 = this.state.posts2.map(post=>
    <tr>
        <td>{post.movie_hall_name}</td>
        <td>${post.revenue}</td>
    </tr>
                    
  );
  if(localStorage.getItem('role')==='2'){
  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
            <br/>
          <div class="row">
          <div className="col-md-6">
            <h2 class="nowshowing">Revenue By Movie:</h2><br/>
            <table class="table table-dark">
            <thead>
                    <tr>
                        <th scope="col">Billing Id#</th>
                        <th scope="col">Username</th>
                    </tr>
            </thead>
            <tbody>
            {postItem}
            </tbody>
        </table>
          </div>
          <div className="col-md-6">
            <h2 class="nowshowing">Revenue By Movie Hall:</h2><br/>
            <table class="table table-dark">
            <thead>
                    <tr>
                        <th scope="col">Billing Id#</th>
                        <th scope="col">Username</th>
                    </tr>
            </thead>
            <tbody>
            {postItem2}
            </tbody>
        </table>
          </div>
          </div>
      </div>
       
  )}
  else{
    window.location.replace('http://localhost:3000/login');
  }
}
}

export default AdminRevnue;
