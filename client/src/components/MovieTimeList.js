import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateCarousel from './DateCarousel';
import { getMovieHallsAndTimes } from '../actions';

  const mapDispatchToProps = (dispatch) => {
    let actions = {getMovieHallsAndTimes};
    return { ...actions, dispatch };
  }

  const mapStateToProps = (state) => {
    return {

    };
  }


class MovieTimeList extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.dispatch(this.props.getMovieHallsAndTimes(this.props.movie))
  }

  render(){
    return(
      <div>
        <DateCarousel movie = {this.props.movie}/>

      </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieTimeList)
