import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../actions';

const mapDispatchToProps = (dispatch) => {

    let actions = {getMovie};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {

    };
  }

class MovieDetail extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
      let movieID  = "";
      this.props.dispatch(this.props.getMovieDetail(movieID));
  }

  render(){
    return(
        <div>

        </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
