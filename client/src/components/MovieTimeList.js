import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateCarousel from './DateCarousel';


  const mapDispatchToProps = (dispatch) => {
    let actions = {};
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

  render(){
    return(
      <div>

          <DateCarousel movie = {this.props.movie}/>
      </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieTimeList)
