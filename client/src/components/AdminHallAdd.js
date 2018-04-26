import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config';
import {withRouter} from 'react-router-dom';

class AdminHallAdd extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      this.addMovieDetailAdmin = this.addMovieDetailAdmin.bind(this);
    }

    componentWillMount(){
            
            
    }

    addMovieDetailAdmin(userInput){
            console.log(userInput.movie_hall_name.value);
            console.log(userInput.ticket_price.value);
            console.log(userInput.max_seats.value);
            console.log(userInput.city.value);
            let req ={
                "movie_hall_name": userInput.movie_hall_name.value,
                "ticket_price": userInput.ticket_price.value,
                "max_seats": userInput.max_seats.value,
                "city": userInput.city.value
            }
            console.log(req);
            axios.post(config.API_URL+'/admin/addmoviehall',req,
                {withCredential: true}
                )
                .then(function (response) {
                    console.log(response.data.message);
                    window.location.replace('http://localhost:3000/adminhome');
                })

    }

    render(){
            
          
            
    

    return(
        
            <div className="halladmindiv">
            <NavAdmin></NavAdmin>
            <br/>
            <h3 class="nowshowing">Add Movie Hall</h3><br/>
            <div class="card text-white bg-dark mb-3">
            <div class="card-header">
            <strong>  Enter Movie Hall Details </strong>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Hall Name:</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Hall Name" ref="movie_hall_name" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Price for the Movie:</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter Amount in $" ref="ticket_price" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter Number of the Tickets:</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" ref="max_seats" placeholder="Enter Number of Tickets" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Enter City Name:</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" ref="city" placeholder="Enter City Name" />
                    </div>
                        <button class="btn btn-warning" onClick={()=>this.addMovieDetailAdmin(this.refs)} >Save</button>
                </form>
            </div>
            </div>
        </div>
        
    )
    }
    }

export default withRouter(AdminHallAdd);
