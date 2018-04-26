import React, {Component} from 'react';
import Login from './Login';
import LandingPage from './LandingPage';
import { Route, withRouter } from 'react-router-dom';
import SignUp from "./SignUp";
import BookTicket from "./BookTicket";
import MovieHallAdminHome from "./MovieHallAdminHome";
import MovieDetail from "./MovieDetail";
import MovieHallAdminDashboard from './MovieHallAdminDashboard';
import MovieHallAdminBooking from './MovieHallAdminBooking';
import MovieHallAdminSearch from './MovieHallAdminSearch'
import EditMovieHallAdmin from './EditMovieHallAdmin'
import EditProfile from "./EditProfile";
import AdminHome from './AdminHome'
import AdminHallEdit from './AdminHallEdit'

class NewerHomePage extends Component{

  render() {
      return (
        <div>
          <Route exact path="/home" render={LandingPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/book" component={BookTicket}/>
          <Route exact path='/moviehalladminhome' component={MovieHallAdminHome}/>
          <Route exact path="/movieDetails" component={MovieDetail}/>
          <Route exact path="/halladmindashboard" component={MovieHallAdminDashboard}/>
          <Route exact path="/halladminbooking" component={MovieHallAdminBooking}/>
          <Route exact path="/halladminsearch" component={MovieHallAdminSearch}/>
          <Route exact path="/editMovieDetailAdmin" component={EditMovieHallAdmin}/>
          <Route exact path="/editprofile" component={EditProfile}/>
          <Route exact path="/adminhome" component={AdminHome}/>
          <Route exact path="/adminhalledit" component={AdminHallEdit}/>

        </div>

    );
}
}

export default withRouter(NewerHomePage);
