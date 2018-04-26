import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config';
import {withRouter} from 'react-router-dom';

class AdminHallEdit extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      this.saveMovieDetailAdmin = this.saveMovieDetailAdmin.bind(this);
    }

    componentWillMount(){
            
            
    }

    saveMovieDetailAdmin(userInput){
            
    }

    render(){
            
            var data = JSON.parse(localStorage.getItem('hall_selected'));
            console.log(data);
            var postItem = this.state.posts.map((post)=>{
               
            })
           
            
    

    return(
        
            <div className="halladmindiv">
            <NavAdmin></NavAdmin>
            <br/>
            <h3 class="nowshowing">Edit Hall Details:</h3><br/>
            <div class="card text-white bg-dark mb-3">
            <div class="card-header">
            <strong>  {data.movie_hall_name} </strong>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Hall Name:</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Hall Name" ref="ticket_price" defaultValue={data.movie_hall_name}/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Price for the Movie:</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter Amount in $" ref="ticket_price" defaultValue={data.ticket_price}/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Number of the Tickets:</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" ref="max_seats" placeholder="Enter Number of Tickets" defaultValue={data.max_seats}/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter City Name:</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" ref="max_seats" placeholder="Enter City Name" defaultValue={data.city}/>
                    </div>
                        <a href="/editMovieDetailAdmin" class="btn btn-primary" onClick={()=>this.saveMovieDetailAdmin(this.refs)} >Save</a>
                </form>
            </div>
             <div class="alert alert-warning">
                     <strong>Warning!</strong> Information updated will be for all the movies playing in the hall
            </div>
            </div>
        </div>
        
    )
    }
    }

export default withRouter(AdminHallEdit);
