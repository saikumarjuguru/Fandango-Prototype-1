import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login,requestAuth} from '../actions';
import  axios from 'axios';
import config from '../config';
import Message from './Message';

const mapDispatchToProps = (dispatch) => {

    let actions = {login,requestAuth};
    return { ...actions, dispatch };

}

const mapStateToProps = (state) => {
    return {
        loginMsg: state.loginReducer.message,
        loginStatus : state.loginReducer.status,
        userDetails: state.loginReducer.userDetails
    };
}


class Login extends Component {

    state={
        userdata: {
            emailorusername: '',
            password: '',
        },
        emailorusernameValid: true,
        passwordValid: true,
        msg:false
    }

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){

        this.props.dispatch(this.props.requestAuth(this.state.userdata))
            .then(() => this.props.isAuthentic ? this.props.history.push('/home') : this.props.history.push('/login'));
    }

    componentDidUpdate()
    {
        if(this.props.loginStatus == true)
        {
            if(this.props.userDetails.role == 1){
                this.props.history.push("moviehalladminhome");
            }
            else if(this.props.userDetails.role == 2){
                this.props.history.push("admindashboard");
            }
            else{
                if(localStorage.getItem("userId")) {
                    let userTrace = {
                        user_id: localStorage.getItem("userId"),
                        user: JSON.parse(localStorage.getItem("userDetails")),
                        path: "login"
                    }
                    axios.post(config.API_URL + '/logs/user_journey', userTrace);
                }
                    this.props.history.push("/");

            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("Call to page ");
        if(this.validateUsername() == true)
        {
            if(this.validatePassword() == true)
            {
                this.props.dispatch(login(this.state));
            }
            else
            {
                this.setState({passwordValid: false})
            }
        }
        else
        {
            //this.state.usernameValid = false;
            this.setState({emailorusernameValid: false})
        }
    }

    validateUsername() {
        var username = this.state.userdata.emailorusername;
        if (username != '')
        {
            return (true)
        }
        return (false)
    }
    validatePassword(){
        var password = this.state.userdata.password;
        if (password != '')
        {
            return (true)
        }
        return (false)
    }
// componentWillReceiveProps(){
//   console.log("componentWillReceiveProps");
//   if(localStorage.getItem('jwtToken')){
//     this.props.history.push('/home');
//   }
// }

// componentWillRec(nextProps, nextState) {
//     if(localStorage.getItem('jwtToken')){
//         this.props.history.push('/home');
//     }
// }

//
// componentDidUpdate(nextProps, nextState) {
//     if(localStorage.getItem('jwtToken')){
//         this.props.history.push('/home');
//     }
// }


    render(){
        console.log("render");
        return(

            <div id="ModalExample" className="modal-signup modal" onClick={() => {
                let payload = {
                    page: "login"
                }
                axios.post(config.API_URL+'/logs',payload);
            }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src="images/fandangonow-logo.png" height="135" width="250"/>
                            <h3 className="modal-title text-xs-center">Sign In</h3>
                            <br/>
                            <br/>
                            <div >
                                {this.props.loginMsg && (
                                    <div className="alert alert-warning text-danger small" role="alert">
                                        {this.props.loginMsg}
                                    </div>
                                )}
                            </div>
                            <form role="form" method="POST" onSubmit = {this.handleSubmit} >
                                <div className="form-group">
                                    { this.state.emailorusernameValid ? null : <div className="text-input-error-wrapper text-left errormessage">Username is required.</div>}
                                    <input  className="form-control large-input" id="username" ref = "useroremail" name="useroremail" type="text" placeholder="Email or Username"
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        emailorusername: event.target.value
                                                    }
                                                });
                                            }}
                                            onFocus={(event) => {
                                                this.setState({emailorusernameValid: true, msg : false});
                                            }}/>
                                </div>
                                <div className="form-group">
                                    { this.state.passwordValid ? null : <div className="text-input-error-wrapper text-left errormessage">Password is required.</div>}
                                    <input  className="form-control large-input" id="password"  ref = "password" name="password" type="password"
                                            placeholder="Password"
                                            onChange={(event) => {this.setState({
                                                userdata: {
                                                    ...this.state.userdata,
                                                    password: event.target.value
                                                }
                                            });
                                            }}
                                            onFocus={(event) => {
                                                this.setState({passwordValid: true , msg: false});
                                            }}
                                    />
                                </div>

                                <div className="form-group">
                                    <div >
                                        <button id="signup_btn" type="submit" className="btn btn-info btn-large btn-submit large-input freelancer-font">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <span className="login-form-signup-link">
                            Dont have an account?
                            <a className="switch-to-login" href="signup">Sign Up</a>
                        </span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
