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
        var data = JSON.parse(localStorage.getItem('hall_selected'));

        if(userInput.movie_hall_name.value === null || userInput.movie_hall_name.value ===''||
        userInput.ticket_price.value === null || userInput.ticket_price.value ===''||
        userInput.max_seats.value === null || userInput.max_seats.value ===''||
        userInput.city.value === null || userInput.city.value ==='')
        {
                alert("All fields are mandatory!!");
                return false;
        } 
        else{
        let req ={
            "movie_hall_id": data.movie_hall_id,
            "movie_hall_name": userInput.movie_hall_name.value,
            "ticket_price": userInput.ticket_price.value,
            "max_seats": userInput.max_seats.value,
            "city": userInput.city.value
        }
        console.log(req);
        axios.post(config.API_URL+'/admin/editmoviehall',req
            )
            .then(function (response) {
                console.log(response.data.message);
                this.props.history.push('/adminhome');
            })}
            
    }

    render(){
            
            var data = JSON.parse(localStorage.getItem('hall_selected'));
            console.log(data);
            var postItem = this.state.posts.map((post)=>{
               
            })
           
            
    
    if(localStorage.getItem('role')==='2'){
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
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Hall Name" ref="movie_hall_name" defaultValue={data.movie_hall_name}/>
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
                        <input type="text" class="form-control" id="exampleFormControlInput1" ref="city" placeholder="Enter City Name" defaultValue={data.city}/>
                    </div>
                        <button class="btn btn-warning" onClick={()=>this.saveMovieDetailAdmin(this.refs)} >Save</button>
                </form>
            </div>
             <div class="alert alert-warning">
                     <strong>Warning!</strong> Information updated will be for all the movies playing in the hall
            </div>
            </div>
        </div>
        
    )}
    else{
        window.location.replace('http://localhost:3000/login');
    }
    }
    }

export default withRouter(AdminHallEdit);
