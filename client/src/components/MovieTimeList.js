import React, {Component} from 'react';
import { connect } from 'react-redux';


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
        MovieTimeList
      </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieTimeList)
