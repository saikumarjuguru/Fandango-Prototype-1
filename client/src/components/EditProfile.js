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

        let userdata = "";

        this.state = {
            userdata:[],
            emailValid: true,
            stateValid: true,
            zipCodeValid: true,
            phoneValid : true,
            creditCardNoValid: '',
            expirationDateValid: '',
            profile_image:null,
            stateAB: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
            stateFN: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
            collapsible1Open : false,
            collapsible2Open: false,
            ProfileUpdateMsg: false,

        }
        this.gotoUpdate = this.gotoUpdate.bind(this);
        let stateab = [];
        this.state.stateAB.map(state => {
            stateab.push(state.toLowerCase());
        })
        console.log(stateab);

    }

    gotoUpdate(){

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.userdata.email))) {
            this.setState({emailValid : false})
            return;
        }
        else{this.setState({emailValid : true})}

        let valid = false
        if (this.state.userdata.state!="") {
            for(var i=0;i<this.state.stateAB.length ; i++)
            {
                if(this.state.stateAB[i].toLowerCase() == this.state.userdata.state.toLowerCase() || this.state.stateFN[i].toLowerCase() == this.state.userdata.state.toLowerCase())
                {
                    valid = true;
                }
            }
            if(valid != true)
            {
                this.setState({stateValid : false})
                return;
            }
            else
            {
                this.setState({stateValid : true})
            }
        }
        else{this.setState({stateValid : true})}

        var phoneno = /^\d{10}$/;
        if(!(phoneno.test(this.state.userdata.phone))){
            this.setState({phoneValid : false});
            return;
        }
        else{this.setState({phoneValid : true})}

        var zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if(!(zip.test(this.state.userdata.zipcode))){
            this.setState({zipCodeValid : false})
            return;
        }
        else{this.setState({zipCodeValid : true})}





        let self = this;
        const formData = new FormData();
        formData.append('first_name',this.state.userdata.first_name);
        formData.append('last_name', this.state.userdata.last_name);
        formData.append('email', this.state.userdata.email);
        formData.append('phone', this.state.userdata.phone);
        formData.append('address', this.state.userdata.address);
        formData.append('city', this.state.userdata.city);
        formData.append('state', this.state.userdata.state);
        formData.append('zipcode', this.state.userdata.zipcode);
        formData.append('profile_image', this.state.profile_image);


        var url = config.API_URL+"/users/"+1;
        axios.post(url, formData, { withCredentials: true, contentType: 'multipart/form-data' })
            .then((response)=>{
                if(response.data.statusCode===200){
                    console.log(response.data);
                    //window.location="/login";
                    self.setState({
                        userdata:response.data.message,
                        collapsible1Open:false,
                        ProfileUpdateMsg:true
                    })
                } else {
                    self.setState({logout:true});

                }
            }).catch(function (error) {
            console.log(error);
        });
    }


    componentWillMount(){
        let self=this;
        axios.get(config.API_URL+"/users/"+1)
            .then((response)=>{
                console.log(response);
                self.setState({userdata : response.data.message})
                this.userdata = response.data.message
            });

        axios.get(config.API_URL+"/users/get_history/"+1)
            .then((response)=>{
                console.log(response);
                self.setState({userdata : response.data.message})
                this.userdata = response.data.message
            });


        console.log("USER DETAILS");
        console.log(this.state.userdata);
        console.log(self.state.userdata);
    }


    handleFile(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                profile_image: file,
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        console.log("render");
        return (


            <div className="container">

                <h1 className="page-header align-items-center">Edit Profile</h1>
                <div>
                    <Collapsible trigger="Update Profile" triggerOpenedClassName="btn btn-warning form-control collapsibleFont" triggerClassName="btn btn-warning form-control collapsibleFont" open={this.state.collapsible1Open}>
                        { this.state.ProfileUpdateMsg ? <div className="alert alert-info">
                            Profile has been updated successfully.
                        </div> : null}
                        <div className="row">
                            <div className="col-md-12">
                                <br/>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <label className="col-lg-3 control-label">Address:</label>
                                <div className="col-lg-8">
                                <div className="form-group">
                                    <label htmlFor="cover_photo" className="upload_btn">
                                    <input type="file" id="cover_photo" onChange={this.handleFile.bind(this)} />
                                    </label>
                                </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-3 control-label">First name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="first_name" value={this.state.userdata.first_name}
                                               placeholder="Please Enter first name" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           first_name: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Address:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="address" value={this.state.userdata.address} placeholder="Please Enter Address" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           address: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">State:</label>
                                    <div className="col-lg-8">
                                        {this.state.stateValid ? null : <small id="emailHelp" className="form-text text-muted">Please Enter Valid State</small>}
                                        <input className="form-control" ref="state" value={this.state.userdata.state} placeholder="Please Enter State" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           state: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Phone No:</label>
                                    <div className="col-lg-8">
                                        {this.state.phoneValid ? null : <small id="emailHelp" className="form-text text-muted">Please Enter Valid Phone number</small>}
                                        <input className="form-control" ref="phone" value={this.state.userdata.phone} placeholder="Please Enter Phone Number" type="number"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           phone: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="last-name" value={this.state.userdata.last_name} placeholder="Please Enter Last name" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           last_name: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">City:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" ref="city" value={this.state.userdata.city} placeholder="Please Enter City" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           city: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Zip Code:</label>
                                    <div className="col-lg-8">
                                        {this.state.zipCodeValid ? null : <small id="emailHelp" className="form-text text-muted">Please Enter Valid Zip Code (95110 OR 95110-1120)</small>}
                                        <input className="form-control" ref="zip_code" value={this.state.userdata.zipcode} placeholder="Please Enter Zip Code" type="number"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           zipcode: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        {this.state.emailValid ? null : <small id="emailHelp" className="form-text text-muted">Please Enter Valid Email</small>}
                                        <input className="form-control" ref="email" value={this.state.userdata.email} placeholder="Please Enter Email Address" type="text"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           email: event.target.value
                                                       }
                                                   });
                                               }}
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-1 col-md-offset-6">
                                    <button
                                    className="btn btn-primary btn-lg font-weight-bold"
                                    type="button"
                                    onClick={() => {this.gotoUpdate()}}>
                                    Set My Profile
                                </button></div>
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
