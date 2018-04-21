import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavAdmin from './NavAdmin';



class MovieHallAdminHome extends Component {

  




render(){
  console.log("render");
  return(
        <div>
        <NavAdmin></NavAdmin>
        </div>
  )
}
}

export default MovieHallAdminHome;
