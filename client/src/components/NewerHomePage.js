import React, {Component} from 'react';
import Login from './Login';
import LandingPage from '../routes/LandingPage';
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
import AdminHallAdd from './AdminHallAdd'
import AdminMovieDetail from './AdminMovieDetail'
import AdminMovieEdit from './AdminMovieEdit'
import AdminBilling from './AdminBiiling'
import AdminAddMovie from './AdminAddMovie'
import AdminRevnue from './AdminRevnue'
import AdminMovieSearch from './AdminMovieSearch'
import AdminHallSearch from './AdminHallSearch'
import AdminBillSearch from './AdminBillSearch'
import AdminMovieSearchEdit from './AdminMovieSearchEdit'
import AdminUserDetail from './AdminUserDetail'
import AdminUserEditDetail from './AdminUserEditDetail'
import AdminDashboard from './AdminDashboard';

class NewerHomePage extends Component{

  render() {
      return (
        <div>
          <Route exact path="/" render={LandingPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/book" component={BookTicket}/>
          <Route exact path='/moviehalladminhome' component={MovieHallAdminHome}/>
          <Route exact path="/movieDetails/:id" component={MovieDetail}/>
          <Route exact path="/halladmindashboard" component={MovieHallAdminDashboard}/>
          <Route exact path="/halladminbooking" component={MovieHallAdminBooking}/>
          <Route exact path="/halladminsearch" component={MovieHallAdminSearch}/>
          <Route exact path="/editMovieDetailAdmin" component={EditMovieHallAdmin}/>
          <Route exact path="/editprofile" component={EditProfile}/>
          <Route exact path="/adminhome" component={AdminHome}/>
          <Route exact path="/adminhalledit" component={AdminHallEdit}/>
          <Route exact path="/adminhalladd" component={AdminHallAdd}/>
          <Route exact path="/adminmoviedetail" component={AdminMovieDetail}/>
          <Route exact path="/adminmovieedit" component={AdminMovieEdit}/>
          <Route exact path="/adminbilling" component={AdminBilling}/>
          <Route exact path="/adminaddmovie" component={AdminAddMovie}/>
          <Route exact path="/adminrevnue" component={AdminRevnue}/>
          <Route exact path="/adminmoviesearch" component={AdminMovieSearch}/>
          <Route exact path="/adminhallsearch" component={AdminHallSearch}/>
          <Route exact path="/adminbillsearch" component={AdminBillSearch}/>
          <Route exact path="/adminmoviesearchedit" component={AdminMovieSearchEdit}/>
          <Route exact path="/adminuserdetail" component={AdminUserDetail}/>
          <Route exact path="/adminedituserdetail" component={AdminUserEditDetail}/>
          <Route exact path="/admindashboard" component={AdminDashboard}/>
        
        </div>

    );
}
}

export default withRouter(NewerHomePage);
