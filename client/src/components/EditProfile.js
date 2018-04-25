import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signup} from '../actions';
import Message from './Message';
import axios from "axios/index";
import config from "../config";
import Collapsible from 'react-collapsible';

const mapDispatchToProps = (dispatch) => {

    let actions = {signup};
    return { ...actions, dispatch };

}

const mapStateToProps = (state) => {
    return {

    };
}


class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userdata:[],
            emailValid: true,
            state: true,
            zipCode: true,
            creditCardNoValid: '',
            expirationDateValid: '',
            stateAB: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
            stateFN: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {

        console.log(this.state.userdata);
        if (this.validateEmail() == true) {
            if (this.validateUsername() == true) {
                if (this.validatePassword() == true) {
                    this.props.dispatch(signup(this.state));
                }
                else {
                    this.setState({passwordValid: false})
                }
            }
            else {
                //this.state.usernameValid = false;
                this.setState({usernameValid: false})
            }
        }
        else {
            this.setState({emailValid: false})
        }
    };

    gotoUpdate(){
        var pattern = new RegExp("^((0[1-9])|(1[0-2]))\/(\d{4})$");
        //var pattern = new RegExp("^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$");
        // if(this.refs.date.value=="" || pattern.test(this.refs.date.value)){
        //     this.setState({exp_error:"Please enter expiration date"});
        //     return;
        // } else{
        //     this.setState({exp_error:""});
        // }
        // if(this.refs.cvv.value=="" || this.refs.cvv.value.length>3|| this.refs.cvv.value.length<3){
        //     this.setState({cvv_error:"Please enter a valid cvv"});
        //     return;
        // } else{
        //     this.setState({cvv_error:""});
        // }
        // //if all okay then pay
        // let increment = this.state.activeStep + 1;
        // this.setState({
        //     activeStep : increment,
        //     cred_error:"",
        //     exp_error:"",
        //     cvv_error:"",
        //     credit_card_number: this.refs.credit_card_number.value,
        //     cvv:this.refs.cvv.value,
        //     expiration_date: this.refs.date.value
        //
        // });
    }

    validateEmail() {
        var emailId = this.state.userdata.email;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
            return (true)
        }
        return (false)
    }

    validateUsername() {
        var username = this.state.userdata.username;
        if (username != '') {
            return (true)
        }
        return (false)
    }

    validatePassword() {
        var password = this.state.userdata.password;
        if (password != '' && password.length >= 6 && /\d/.test(password)) {
            return (true)
        }
        return (false)
    }

    componentDidMount(){
        let self=this;
        axios.get(config.API_URL+"/users/"+1)
            .then((response)=>{
                console.log(response);
                self.setState({userdata : response.data.message})
            });
        console.log("USER DETAILS");
        console.log(this.state.userdata);
        console.log(self.state.userdata);
    }

    render() {
        console.log("render");
        return (
            <div className="container">
                <h1 className="page-header align-items-center">Edit Profile</h1>
                <div>
                    <Collapsible trigger="Update Profile" triggerOpenedClassName="btn btn-warning form-control collapsibleFont" triggerClassName="btn btn-warning form-control collapsibleFont">
                        <div className="row">
                            <div className="col-md-12">
                                <br/>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">First name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="first-name" defaultValue={this.state.userdata.first_name} placeholder="Please Enter first name" type="text"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Address:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="address" defaultValue={this.state.userdata.address} placeholder="Please Enter Address" type="text"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">State:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="state" defaultValue={this.state.userdata.state} placeholder="Please Enter State" type="text"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Phone No:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="phone" defaultValue={this.state.userdata.phone} placeholder="Please Enter Phone Number" type="number"/>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="last-name" defaultValue={this.state.userdata.last_name} placeholder="Please Enter Last name" type="text"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">City:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="city" defaultValue={this.state.userdata.city} placeholder="Please Enter City" type="text"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Zip Code:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="zip_code" defaultValue={this.state.userdata.zipcode} placeholder="Please Enter Zip Code" type="number"/>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="email" defaultValue={this.state.userdata.email} placeholder="Please Enter Email Address" type="text"/>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Collapsible>
                    <br/>
                    <Collapsible trigger="See My Bookings" triggerOpenedClassName="btn btn-primary form-control" triggerClassName="btn btn-primary form-control">
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                    </Collapsible>
                </div>
            </div>

        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
