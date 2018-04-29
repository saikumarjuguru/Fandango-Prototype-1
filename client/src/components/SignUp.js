import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signup} from '../actions';
import Message from './Message';
import config from "../config";
import axios from "axios/index";

const mapDispatchToProps = (dispatch) => {
    let actions = {signup};
    return { ...actions, dispatch };
}
const mapStateToProps = (state) => {
    return {
        signupMsg: state.signupReducer.message,
        signupStatus : state.signupReducer.status
    };
};
class SignUp extends Component {

    state={
        userdata: {
            email: '',
            username: '',
            password: '',
        },
        emailValid: true,
        usernameValid: true,
        passwordValid: true,
        msg:false
    }

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({msg:true})
        if(nextProps.signupStatus == true)
        {
            nextProps.history.push("/login");
        }
    }

    componentWillMount() {
        let userTrace = {
            user_id: localStorage.getItem("userId"),
            user: localStorage.getItem("userDetails"),
            path: "signup"
        }
        axios.post(config.API_URL + '/logs/user_journey', userTrace);
    }

    handleSubmit(e){

        console.log(this.state.userdata);
        if(this.validateEmail() == true)
        {
            if(this.validateUsername() == true)
            {
                if(this.validatePassword() == true)
                {
                    this.props.dispatch(signup(this.state.userdata));
                }
                else
                {
                    this.setState({passwordValid: false})
                }
            }
            else
            {
                //this.state.usernameValid = false;
                this.setState({usernameValid: false})
            }
        }
        else {
            this.setState({emailValid: false})
        }
    };
    validateEmail() {
        var emailId = this.state.userdata.email;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))
        {
            return (true)
        }
        return (false)
    }
    validateUsername() {
        var username = this.state.userdata.username;
        if (username != '')
        {
            return (true)
        }
        return (false)
    }
    validatePassword(){
        var password = this.state.userdata.password;
        if (password != '' && password.length >= 6 && /\d/.test(password))
        {
            return (true)
        }
        return (false)
    }




    // componentWillReceiveProps(){
    //     console.log("componentWillReceiveProps");
    //     if(localStorage.getItem('jwtToken')){
    //         this.props.history.push('/home');
    //     }
    // }
    //
    // componentWillRec(nextProps, nextState) {
    //     if(localStorage.getItem('jwtToken')){
    //         this.props.history.push('/home');
    //     }
    // }


    // componentDidUpdate(nextProps, nextState) {
    //     if(localStorage.getItem('jwtToken')){
    //         this.props.history.push('/home');
    //     }
    // }


    render(){
        console.log("render");
        return(

            <div id="ModalExample" className="modal-signup modal " onClick={() => {
                let payload = {
                    page: "signup"
                }
                axios.post(config.API_URL+'/logs',payload);
            }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src="images/fandangonow-logo.png" height="135" width="250"/>
                            <h3 className="modal-title text-xs-center">Sign Up</h3>
                            <br/>
                            <br/>
                            { this.state.msg ? <div className="alert alert-danger">
                                {this.props.signupMsg}
                            </div> : null}
                            <div role="form">
                                <div className="form-group">
                                    { this.state.emailValid ? null : <div className="text-input-error-wrapper text-left errormessage">Please enter valid email address.</div>}
                                    <input  className="form-control large-input" id="email" ref = "email" name="email" type="text" placeholder="Email"
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        email: event.target.value
                                                    }

                                                });
                                            }}
                                            onFocus={(event) => {this.setState({emailValid: true, msg : false});}}/>
                                </div>
                                <div className="form-group">
                                    { this.state.usernameValid ? null : <div className="text-input-error-wrapper text-left errormessage">Please enter username.</div>}
                                    <input  className="form-control large-input" id="username"  ref = "username" name="username" type="text" placeholder="Username"
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        username: event.target.value
                                                    }
                                                });
                                            }}
                                            onFocus={(event) => {
                                                this.setState({usernameValid: true, msg : false});
                                            }}/>
                                </div>
                                <div className="form-group">
                                    { this.state.passwordValid ? null : <div className="text-input-error-wrapper text-left errormessage">Password must contain more than 6 character with digit.</div>}
                                    <input  className="form-control large-input" id="password"  ref = "password" name="password" type="password" placeholder="Password"
                                            onChange={(event) => {this.setState({
                                                userdata: {
                                                    ...this.state.userdata,
                                                    password: event.target.value
                                                }
                                            });
                                            }}
                                            onFocus={(event) => {
                                                this.setState({passwordValid: true, msg : false});
                                            }}/>
                                </div>

                                <div className="form-group">
                                    <div >
                                        <button id="signup_btn" type="submit" className="btn btn-info btn-large btn-submit large-input freelancer-font" onClick = {this.handleSubmit}>
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span className="login-form-signup-link">
                            Dont have an account?
                            <a className="switch-to-login" href="login">Sign In</a>
                        </span>
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
