import React , {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

}

  const mapStateToProps = (state) => {
    return {
      loginMsg: state.loginReducer.loginMsg,
      loginStatus : state.loginReducer.loginStatus,
      username : state.loginReducer.username
    };
  }


class LandingPage extends Component {
  render(){

    return(
      <div>
        Welcome {this.props.username}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
