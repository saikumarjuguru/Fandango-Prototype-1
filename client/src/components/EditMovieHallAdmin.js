import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'


class EditMovieHallAdmin extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

    componentWillMount(){
            console.log('test'+JSON.parse(localStorage.getItem('movie_selected')).movie_name);
            let self = this;
            axios.get(config.API_URL+'/movie_hall/getmovienames')
            .then(function (response) {
              console.log(response.data.message);
              self.setState({posts:response.data.message})
              console.log(this.state.posts);
            })
            .catch(function (error) {
              console.log(error);
            });
            
    }

    saveMovieDetailAdmin(){
    
    }

    render(){
            
            var data = JSON.parse(localStorage.getItem('movie_selected'));
            var postItem = this.state.posts.map(post=>{
                if(post.movie_name === data.movie_name)
                return <option selected>{post.movie_name}</option>
                return <option>{post.movie_name}</option>
            })
      
            
    

    return(
        
            <div className="halladmindiv">
            <NavAdmin></NavAdmin>
            <br/>
            <h3 class="nowshowing">Edit Movie Details:</h3><br/>
            <div class="card text-white bg-dark mb-3">
            <div class="card-header">
            <strong> Screen {data.screen_id} </strong>
            </div>
            <div class="card-body">
                <form>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                                 {postItem}
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Email address</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                
                <div class="form-group">
                    <label for="exampleFormControlSelect2">Example multiple select</label>
                    
                </div>
                </form>
            </div>
            </div>
        </div>
        
    )
    }
    }

export default EditMovieHallAdmin;
