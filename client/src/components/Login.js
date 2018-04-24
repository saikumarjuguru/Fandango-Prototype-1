import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login,requestAuth} from '../actions';
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

    componentWillReceiveProps(nextProps)
    {
        this.setState({msg:true})
        if(nextProps.loginStatus == true)
        {
            if(nextProps.userDetails.role == 1){
                nextProps.history.push("moviehalladminhome");
            }
            else if(nextProps.userDetails.role == 2){
                // nextProps.history.push(""); // add fandango admin home page link
            }
            else{
                nextProps.history.push("/home");
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
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

            <div id="ModalExample" className="modal-signup modal ">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src="images/fandangonow-logo.png" height="135" width="250"/>
                            <h3 className="modal-title text-xs-center">Sign In</h3>
                            <br/>
                            <br/>
                            {this.state.msg ? <div className="alert alert-danger">
                                {this.props.loginMsg}
                            </div> : null}
                            <form role="form" method="POST" onSubmit = {this.handleSubmit} >
                                <div className="form-group">
                                    { this.state.emailorusernameValid ? null : <div className="text-input-error-wrapper text-left errormessage">Please enter valid email address.</div>}
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
                                    { this.state.passwordValid ? null : <div className="text-input-error-wrapper text-left errormessage">Password must contain more than 6 character with digit.</div>}
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
                                            Log In
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <span className="login-form-signup-link">
                            Dont have an account?
                            <a className="switch-to-login">Sign Up</a>
                        </span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
