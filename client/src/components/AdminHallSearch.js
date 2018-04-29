import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'


class AdminHallSearch extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          var searchtext=localStorage.getItem('searchTextAdmin');
          let self = this;
          
          let req ={
                    "searchtext":searchtext
                    }
           axios.post(config.API_URL+'/admin/searchmoviehall',req)
                .then(function (response) {
                    console.log(response.data.message);
                    self.setState({posts:response.data.message})
                })
                .catch(function (error) {
                    console.log(error);
                });
          
          
        
          

}

editHallDetails(hall_selected){
    console.log(JSON.stringify(hall_selected));
    localStorage.setItem('hall_selected',JSON.stringify(hall_selected));
    
  }

render(){
  
  
  console.log('render'+this.state.posts.length);
  var postItem;
  if(this.state.posts.length === 0){
     postItem = <h4>"No Search Result Available"</h4>
  }
  else{ postItem = this.state.posts.map(post=>
      
        <div class="card text-white bg-dark mb-3">
        <div class="card-header">
        <h6><strong>{post.movie_hall_name}</strong></h6>
        </div>
        <div class="card-body">
            <h6 class="card-title">Hall Name: &nbsp;{post.movie_hall_name}</h6>
            <h6 class="card-title">Ticket Price:&nbsp; ${post.ticket_price}</h6>
            <h6 class="card-title">Number Of Seats: &nbsp;{post.max_seats}</h6>
            <h6 class="card-title">Location:&nbsp;{post.city}</h6>
            <a href="/adminhalledit" class="btn btn-warning" onClick={this.editHallDetails.bind(this,post)}>Edit Hall Details</a> &nbsp;
            <a href="/adminmoviedetail" class="btn btn-warning" onClick={this.editHallDetails.bind(this,post)}>View Movie Details</a>
        </div>
        </div>
  );
  }

  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
        <br/>
        <h3 class="nowshowing">Search Results:</h3><br/>
        {postItem}
      </div>
       
  )
}
}

export default AdminHallSearch;
