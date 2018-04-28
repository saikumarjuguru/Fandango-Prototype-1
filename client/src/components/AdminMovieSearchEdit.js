import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config';
import {withRouter} from 'react-router-dom';

class AdminMovieSearchEdit extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      this.addMovieAdmin = this.addMovieAdmin.bind(this);
    }

    componentWillMount(){
            
            
    }

    addMovieAdmin(userInput){
            var data = JSON.parse(localStorage.getItem('movie_selected_search'));
            if(userInput.movie_name.value === null || userInput.movie_name.value ===''||
            userInput.trailer_link.value === null || userInput.trailer_link.value ===''||
            userInput.movie_characters.value === null || userInput.movie_characters.value ===''||
            userInput.release_date.value === null || userInput.release_date.value ===''||
            userInput.photos.value === null || userInput.photos.value ===''||
            userInput.movie_length.value === null || userInput.movie_length.value ==='')
               {
                    alert("All fields are mandatory!!");
                    return false;
               }
            else{   
            let req ={
                "movie_id":data.movie_id,
                "title": userInput.movie_name.value,
                "trailer_link": userInput.trailer_link.value,
                "movie_characters": userInput.movie_characters.value,
                "release_date": userInput.release_date.value,
                "rating":userInput.rating.value,
                "photos":userInput.photos.value,
                "movie_length":userInput.movie_length.value,
                "see_it_in":userInput.see_it_in.value,
                "movie_type":userInput.movie_type.value
            }
            console.log(req);
            axios.post(config.API_URL+'/admin/editmovie',req,
                {withCredential: true}
                )
                .then(function (response) {
                    console.log(response.data.message);
                    window.location.replace('http://localhost:3000/adminhome');
                })}

    }

    render(){
            
        var data=JSON.parse(localStorage.getItem('movie_selected_search'));
        console.log("test");
        console.log(data);
    

        return(
            
                <div className="halladmindiv">
                <NavAdmin></NavAdmin>
                <br/>
                <h3 class="nowshowing">Edit Movie</h3><br/>
                <div class="card text-white bg-dark mb-3">
                <div class="card-header">
                <strong> Enter Movie Details </strong>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Movie Title:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Movie Title" ref="movie_name" defaultValue={data.movie_name}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Trailer Link:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="https://www.youtube.com/watch?v=D86RtevtfrA" ref="trailer_link" defaultValue={data.trailer_link}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Movie Characters:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="movie_characters" placeholder="Enter Movie Characters" defaultValue={data.movie_characters}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Release Date:</label>
                            <input type="date" class="form-control" id="exampleFormControlInput1" ref="release_date" placeholder="Enter Release Date" defaultValue={new Date(data.release_date)} />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Select Rating:</label>
                            <select class="form-control" ref="rating" id="exampleFormControlSelect1"defaultValue={data.rating} >
                                <option>G</option> 
                                <option>PG</option>  
                                <option>PG-13</option>  
                                <option>R</option>  
                                <option>NC-17</option>    
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Movie Photo Link:</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="photos" placeholder="Enter photo link" defaultValue={data.photos} />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Enter Movie Duration:</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" ref="movie_length" placeholder="in minutes" defaultValue={data.movie_length}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">See it in:</label>
                            <select class="form-control" ref="see_it_in" id="exampleFormControlSelect1" defaultValue={data.see_it_in}>
                                <option>Digital</option> 
                                <option>Imax 3D</option>      
                            </select>
                        </div>
                        <div class="form-group">
                        <label for="exampleFormControlSelect1">Select Genre:</label>
                        <select class="form-control" ref="movie_type" id="exampleFormControlSelect1">
                            <option>Comedy</option> 
                            <option>Horror</option>  
                            <option>Thriller</option>  
                            <option>Sci-Fi</option>  
                            <option>Drama</option>    
                        </select>
                        </div>
                        <button class="btn btn-warning" onClick={()=>this.addMovieAdmin(this.refs)} >Save</button>
                    </form>
                </div>
                </div>
            </div>
            
        )
        }
        }

export default withRouter(AdminMovieSearchEdit);
