import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from './NavAdmin';
import config from '../config'
import {withRouter} from 'react-router-dom';


class AdminUserDetail extends Component {

    constructor(props){
      super(props);
      this.state = {
        posts:[]
      }
    }

  componentWillMount(){
          let self = this;
         
          axios.get(config.API_URL+'/admin/getuserdetails')
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

editUserDetails(user_id){
  localStorage.setItem('admin_edit_user_id',user_id);
  this.props.history.push('/adminedituserdetail');

}
deleteUser(user_id){
        let req ={
          'user_id':user_id
      }
      axios.post(config.API_URL+'/admin/deleteuser',req)
      .then(function (response) {
          console.log(response.data.message);
          window.location.reload(true);
        })

}



render(){
  
  
  console.log('render'+this.state.posts);
  var postItem = this.state.posts.map(post=>
                    <tr key={post.user_id}>
                        <th scope="row">{post.username}</th>
                        <td>{post.first_name}</td>
                        <td>{post.last_name}</td>
                        <td>{post.address}</td>
                        <td>{post.city}</td>
                        <td>{post.state}</td>
                        <td>{post.zipcode}</td>
                        <td>{post.phone}</td>
                        <td>{post.email}</td>
                        <td><a href=""  class="text-warning" onClick={this.editUserDetails.bind(this,post.user_id)} >Edit</a>&nbsp;/&nbsp;
                            <a href=""  class="text-warning" onClick={this.deleteUser.bind(this,post.user_id)}>Delete</a>
                        
                        </td>
                    </tr>  
  );


  return(
        <div className="halladmindiv">
        <NavAdmin></NavAdmin>
        <br/>
        <h2 class="nowshowing">Users:</h2><br/>
        <table class="table table-dark table-bordered">
            <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Zip Code</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
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

export default withRouter(AdminUserDetail);
