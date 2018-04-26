import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'


class AdminBilling extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          let self = this;
          var UserId = 1;
          axios.get(config.API_URL+'/admin/getuserbilldetails')
          .then(function (response) {
            console.log(response.data.message);
            self.setState({posts:response.data.message})
          })
          .catch(function (error) {
            console.log(error);
          });

}

deleteBooking(bookingId){
        
        let req ={
            'billing_id':bookingId
        }
        axios.post(config.API_URL+'/movie_hall/canceluserbooking',req)
        .then(function (response) {
            console.log(response.data.message);
            window.location.reload(true);
          })
}

render(){
  
  
  console.log('render'+this.state.posts);
  var postItem = this.state.posts.map(post=>
                    <tr key={post.billing_id}>
                        <th scope="row">{post.billing_id}</th>
                        <td>{post.username}</td>
                        <td>{post.movie_hall_name}</td>
                        <td>{post.movie_name}</td>
                        <td>{post.screen_number}</td>
                        <td>{post.amount}</td>
                        <td>{post.date}</td>
                        <td>{post.booking_status}</td>
                        <td><span>{post.booking_status ==='Cancelled'?'':<a href=""  class="text-warning" onClick={this.deleteBooking.bind(this,post.billing_id)} >Cancel</a>}</span></td>
                    </tr>  
  );


  return(
        <div className="halladminBookingdiv">
        <NavAdmin></NavAdmin>
        <br/>
        <h2 class="nowshowing">Booked Seats:</h2><br/>
        <table class="table table-dark">
            <thead>
                    <tr>
                        <th scope="col">Billing Id#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Movie Hall Name</th>
                        <th scope="col">Movie Name</th>
                        <th scope="col">Screen No</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date-Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
            </thead>
            <tbody>
            {postItem}
            </tbody>
        </table>
       
      </div>
       
  )
}
}

export default AdminBilling;
