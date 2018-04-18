import React, {Component} from 'react';
import Login from './Login';
import LandingPage from './LandingPage';
import { Route, withRouter } from 'react-router-dom';
import SignUp from "./SignUp";


class NewerHomePage extends Component{

  render() {
      return (
        <div>
          <Route exact path="/home" render={LandingPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>


        </div>

    );
}
}

export default withRouter(NewerHomePage);
