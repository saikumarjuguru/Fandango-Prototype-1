import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'
import {withRouter} from 'react-router-dom';

class AdminMovieSearch extends Component {

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
            console.log(req);
           axios.post(config.API_URL+'/admin/searchmovie',req)
                .then(function (response) {
                    console.log(response.data.message);
                    self.setState({posts:response.data.message})
                })
                .catch(function (error) {
                    console.log(error);
                });
          
          
        
          

}

editMovieDetailAdmin(movie_selected_search){
    console.log(JSON.stringify(movie_selected_search));
    localStorage.setItem('movie_selected_search',JSON.stringify(movie_selected_search)); 
    this.props.history.push('/adminmoviesearchedit');
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
           <h6><strong>{post.movie_name}</strong></h6>
        </div>
        <div class="card-body row">
            <div class="col-md-9">
            <h6 class="card-title">Movie Characters: {post.movie_characters}</h6>
            <h6 class="card-title">Trailer Link: <a href={post.trailer_link} target="_blank">{post.trailer_link}</a></h6>
            <h6 class="card-title">Release Date: {post.release_date}</h6>
            <h6 class="card-title">Rating: {post.rating}</h6>
            <h6 class="card-title">Duration: {post.movie_length}</h6>
            <h6 class="card-title">See it in: {post.see_it_in}</h6> 
            <button class="btn btn-warning" onClick={this.editMovieDetailAdmin.bind(this,post)}>Edit Detail</button>
            </div>
            <div class="col-md-3">
            <img class="card-img-right imagesearch" src={post.photos} alt="Card image cap" />
            </div>
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

export default withRouter(AdminMovieSearch);
