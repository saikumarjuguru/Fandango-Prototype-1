import React, {Component} from 'react';
import { connect } from 'react-redux';
import { registerUser} from '../actions';
import Message from './Message';

const mapDispatchToProps = (dispatch) => {

    let actions = {registerUser};
    return { ...actions, dispatch };

}

const mapStateToProps = (state) => {
    return {
        // signupMsg: state.loginReducer.loginMsg,
        // signupStatus : state.loginReducer.loginStatus
    };
}


class Login extends Component {

    state={
        email: '',
        username: '',
        password: ''
    }

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
                email : this.refs.email.value,
                username : this.refs.username.value,
                password : this.refs.password.value
            });
        if(this.validateEmail() == true) {
            if(this.validateUsername() == true) {
                if(this.validatePassword() == true) {
        this.props.dispatch(registerUser(this.state));}
                else
                {
                    //this.state.passwordValid = false;
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


    componentDidUpdate(nextProps, nextState) {
        if(localStorage.getItem('jwtToken')){
            this.props.history.push('/home');
        }
    }


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
                            <Message  {...this.props}/>
                            <form role="form" method="POST" onSubmit = {this.handleSubmit} >
                                <div className="form-group">
                                    <input  className="form-control large-input" id="email" ref = "email" name="email" type="text" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input  className="form-control large-input" id="username"  ref = "username" name="username" type="text" placeholder="Username"/>
                                </div>
                                <div className="form-group">
                                    <input  className="form-control large-input" id="password"  ref = "password" name="password" type="password" placeholder="Password"/>
                                </div>

                                <div className="form-group">
                                    <div >
                                        <button id="signup_btn" type="submit" className="btn btn-info btn-large btn-submit large-input freelancer-font">
                                           Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <span className="login-form-signup-link">
                            Dont have an account?
                            <a className="switch-to-login">Sign In</a>
                        </span>
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
