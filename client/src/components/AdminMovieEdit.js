import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config';
import {withRouter} from 'react-router-dom';

class AdminMovieEdit extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
      this.saveMovieDetailAdmin = this.saveMovieDetailAdmin.bind(this);
    }

    componentWillMount(){
            console.log('test'+JSON.parse(localStorage.getItem('movie_selected')).movie_name);
            let self = this;
            axios.get(config.API_URL+'/movie_hall/getmovienames')
            .then(function (response) {
              console.log(response.data.message);
              self.setState({posts:response.data.message})
              
            })
            .catch(function (error) {
              console.log(error);
            });
            
    }

    saveMovieDetailAdmin(userInput){
            var data = JSON.parse(localStorage.getItem('movie_selected'));
            console.log("slot1"+userInput.slot1.checked)
            console.log("slot2"+userInput.slot2.checked)
            console.log("slot3"+userInput.slot3.checked)
            console.log("slot4"+userInput.slot4.checked)
            console.log("max_seats"+userInput.max_seats.value)
            console.log("ticket_price"+userInput.ticket_price.value)
            console.log("movie_name"+userInput.movie_name.value)
            var movie_id='';
            var posting = this.state.posts.map((post)=>{
                if(userInput.movie_name.value === post.movie_name)
                movie_id=post.movie_id
            })
           console.log("movie_id"+movie_id);
           var slot1 =0;
           if(userInput.slot1.checked){
             slot1 = userInput.max_seats.value;
           }else{slot1 = null }
           var slot2 =0;
           if(userInput.slot2.checked){
             slot2 = userInput.max_seats.value;
           }else{slot2 = null }
           var slot3 =0;
           if(userInput.slot3.checked){
             slot3= userInput.max_seats.value;
           }else{slot3= null }
           var slot4 =0;
           if(userInput.slot4.checked){
             slot4 = userInput.max_seats.value;
           }else{slot4 = null }
        
        
           
        let req ={
                    "movie_hall_id": data.movie_hall_id,
                    "screen_number": data.screen_number,
                    "movie_id": movie_id,
                    "slot1": slot1,
                    "slot2": slot2,
                    "slot3": slot3,
                    "slot4": slot4,
                    "max_seats": userInput.max_seats.value,
                    "ticket_price": userInput.ticket_price.value
        }
        console.log(req);
        axios.post(config.API_URL+'/movie_hall/editmovieinfo',req,
        {withCredential: true}
        )
        .then(function (response) {
            console.log(response.data.message);
            window.location.replace('http://localhost:3000/moviehalladminhome');
          })
         

    }

    render(){
            
            var data = JSON.parse(localStorage.getItem('movie_selected'));
            var postItem = this.state.posts.map((post)=>{
                if(post.movie_name === data.movie_name)
                return <option selected>{post.movie_name}</option>
                
                return <option >{post.movie_name}</option>
            })
            console.log('test'+data.slot1);
            
    
    if(localStorage.getItem('role')==='2'){
    return(
        
            <div className="halladmindiv">
            <NavAdmin></NavAdmin>
            <br/>
            <h3 class="nowshowing">Edit Movie Details:</h3><br/>
            <div class="card text-white bg-dark mb-3">
            <div class="card-header">
            <strong> Screen {data.screen_number} </strong>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Select Movie to be played:</label>
                        <select class="form-control" ref="movie_name" id="exampleFormControlSelect1">
                            <option>Select a Movie to be Shown</option>    
                            {postItem}
                        </select>
                    </div>
                   <label for="exampleFormControlSelect1">Select Timings to be played in:</label>
                    <br/>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  ref="slot1" value={data.slot1} defaultChecked={data.slot1>0 ? true:false}/>
                        <label class="form-check-label" for="inlineCheckbox1">12:00 PM</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  ref="slot2" value={data.slot2} defaultChecked={data.slot2>0 ? true:false}/>
                        <label class="form-check-label" for="inlineCheckbox2">03:00 PM</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" ref="slot3" value={data.slot3} defaultChecked={data.slot3>0 ? true:false}/>
                        <label class="form-check-label" for="inlineCheckbox3">06:00 PM </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value={data.slot4} ref="slot4" defaultChecked={data.slot4>0 ? true:false}/>
                        <label class="form-check-label" for="inlineCheckbox3">09:00 PM </label>
                    </div>
                    <div class="form-group">
                    <label for="exampleFormControlInput1">Enter Price for the Movie:</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter Amount in $" ref="ticket_price" defaultValue={data.ticket_price}/>
                    </div>
                    <div class="form-group">
                    <label for="exampleFormControlInput1">Enter Number of Tickets:</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" ref="max_seats" placeholder="Enter Number of Tickets" defaultValue={data.max_seats}/>
                    </div>
                    <button class="btn btn-primary" onClick={()=>this.saveMovieDetailAdmin(this.refs)} >Save</button>
                </form>
            </div>
            </div>
        </div>
        
    )}
    else{
        window.location.replace("http://localhost:3000/login");
    }
    }
    }

export default withRouter(AdminMovieEdit);
