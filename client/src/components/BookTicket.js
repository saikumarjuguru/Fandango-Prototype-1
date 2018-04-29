import React, {Component} from 'react';
import { connect } from 'react-redux';
import { book} from '../actions';
import Message from './Message';
import Stepper from 'react-stepper-horizontal'; //https://devarchy.com/react/react-stepper-horizontal
import config from '../config.js';
import axios from 'axios';
import { stat } from 'fs';
import Navbar from './Navbar';
import {Redirect} from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {

    let actions = {book};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
      console.log(state.moviehallReducer.hallAndSlotdetail);

    return {

        booking : state.billingReducer.booking,
        movie : state.moviehallReducer.hallAndSlotdetail

    };
  }


class BookTicket extends Component {

    //price, total seats, movie_id,hall_id  will come from backend or from previous step

  constructor(props){
    super(props);
    let credit_card_number="";
    let cvv = "";
    let expiration_date = "";
    let save = 0;
    let date="";
    let time="";
    
   

    this.state = {
        user:"",
        activeStep :0,
        price:this.props.movie!=null?this.props.movie.moviehall.movie_hall.ticket_price:"Not Available",
        amountDue: 0,
        error:"" ,
        cred_error:"",
        exp_error:"",
        number_of_seats:"",
        credit_card_number:"",
        cvv:"",
        expiration_date:"",
        save:0,
        screen_number:"",
        screen_id:"",
        login:false,
        availability:""
    }

  }
componentWillMount() {
      if(localStorage.getItem("userId")) {
          let userTrace = {
              user_id: localStorage.getItem("userId"),
              user: JSON.parse(localStorage.getItem("userDetails")),
              path: "booking"
          }
          axios.post(config.API_URL + '/logs/user_journey', userTrace);
      } 
      if(!localStorage.getItem("userId")){
        this.setState({login:true});
    }
    let temp = this.props.movie.date;
      temp = temp.getUTCFullYear() + '-' +
                ('00' + (temp.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + temp.getUTCDate()).slice(-2);
    axios.get(config.API_URL+"/movie_hall/get-screen-capacities/"+this.props.movie.movie.movie_id+"/"+this.props.movie.moviehall.movie_hall.movie_hall_id+"/"+this.props.movie.slot+'/'+temp).then((response)=>{
        this.setState({
            availability:response.data.message
        });
        
    }).catch((err)=>{
        console.log(err);
    });

}


componentDidMount(){
    
    let self=this;
      axios.get(config.API_URL+"/users/"+localStorage.getItem("userId"))
          .then((response)=>{
            console.log(response);
            let data = response.data.message;
            this.credit_card_number = data.credit_card_number;
            //this.cvv = data.cvv;
            this.expiration_date = data.expiration_date;
          });
   

}
componentWillRec(nextProps, nextState) {
    if(localStorage.getItem('jwtToken')){
        this.props.history.push('/home');
    }
}


componentDidUpdate(nextProps, nextState) {
    if(localStorage.getItem('jwtToken')){
        this.props.history.push('/home');
    }
}

incrementStep(){

    if(this.refs.number_of_seats.value == ""){
        this.setState({error :"Please enter the number of seats."});
        return;
    } else {
        this.date = this.props.movie.date;
        this.date = this.date.getUTCFullYear() + '-' +
                ('00' + (this.date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + this.date.getUTCDate()).slice(-2);
        console.log("price",this.state.price);
        console.log("date",this.date);
        console.log("slot",this.props.movie.slot);
        switch(this.props.movie.slot){
            case 'slot1': this.time = '9:00 AM';
            break;
            case 'slot2':this.time='12:00 PM';
            break;
            case 'slot3': this.time='03:00 PM';
            break;
            case 'slot4': this.time = '06:00 PM';
            break;

        }
        axios.get(config.API_URL+'/movie_hall/check-available-seats/'+this.props.movie.movie.movie_id+'/'+this.props.movie.moviehall.movie_hall.movie_hall_id+'/'+this.props.movie.slot+'/'+this.refs.number_of_seats.value+'/'+this.date).then((response)=>{
            console.log(response);
            let data = response.data;
            if(data.success===true){
                let increment = this.state.activeStep + 1;
                let temp =  this.state.price * this.refs.number_of_seats.value;
                let due = temp + temp*0.5;
                this.setState({
                    amountDue:due,
                    number_of_seats: this.refs.number_of_seats.value,
                    screen_number: data.message.screen_number,
                    screen_id:data.message.screen_id,
                    activeStep : increment
                });
            } else {
                this.setState({error:this.refs.number_of_seats.value+" seats not available!"});
                return;
            }
          });
    }
  
}
gotoPayment(){
    var pattern = new RegExp("^((0[1-9])|(1[0-2]))\/(\d{4})$");
    //var pattern = new RegExp("^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$");
    if(this.refs.credit_card_number.value=="" || this.refs.credit_card_number.value.length<16 || this.refs.credit_card_number.value.length>16){
        this.setState({cred_error:"Please enter a valid credit card number"});
        return;
    } else {
        this.setState({cred_error:""});
    }
    if(this.refs.date.value=="" || pattern.test(this.refs.date.value)){
        this.setState({exp_error:"Please enter expiration date"});
        return;
    } else{
        this.setState({exp_error:""});
    }
    if(this.refs.cvv.value=="" || this.refs.cvv.value.length>3|| this.refs.cvv.value.length<3){
        this.setState({cvv_error:"Please enter a valid cvv"});
        return;
    } else{
        this.setState({cvv_error:""});
    }
    //if all okay then pay
    let increment = this.state.activeStep + 1;
    this.setState({
        activeStep : increment,
        cred_error:"",
        exp_error:"",
        cvv_error:"",
        credit_card_number: this.refs.credit_card_number.value,
        cvv:this.refs.cvv.value,
        expiration_date: this.refs.date.value

    });
}
decrementStep(){
    let decrement = this.state.activeStep - 1;
    this.setState({
        activeStep : decrement
    });
}

makePayment() {


    let increment = this.state.activeStep + 1;
    let payload = {
        movie_id:this.props.movie.movie.movie_id,
        movie_hall_id:this.props.movie.moviehall.movie_hall.movie_hall_id,
        slot:this.props.movie.slot,
        screen_number:this.state.screen_number,
        screen_id:this.state.screen_id,
        amount: this.state.amountDue,
        tax: 0.5,
        user_id: localStorage.getItem("userId"),
        show_time:this.time,
        number_of_seats: this.state.number_of_seats,
        credit_card_number: this.state.credit_card_number,
        expiration_date: this.state.expiration_date,
        save:this.save

    }
    this.props.dispatch(book(payload));
    this.setState({
        activeStep : increment
    });
}

check(){

    if(document.getElementById("customCheck1").checked){
        this.save = 1;
    } else{
        this.save=0;
    }
    console.log(this.save);
}

render(){
    if(this.state.login){
        return <Redirect to="/login"/>
    }

  return(
    <div>
        <Navbar/>
    <div className="container-fluid booking_container" onClick={() => {
        let payload = {
            page: "booking"
        }
        axios.post(config.API_URL+'/logs',payload);
        let componentData = {
            component: "booking"
        }
        axios.post(config.API_URL+'/logs/component_click',componentData);
    }}>
    <div className="row">
        <div className="col-sm-8">
            <div className="card">
            <div className="card-header">
            <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'},{title: 'Step Three'},{title: 'Step Four'}] } activeStep={ this.state.activeStep } activeColor={"#ffc107"} completeColor={"#ffc107"}/>
            </div>
            <form>
            {this.state.activeStep==0?
            <div className="card-body">
                <h5 className="card-title">SELECT NUMBER OF SEATS</h5>
                <p className="card-text"><b>Availability:</b> {this.state.availability}</p>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Enter Number Of Seats</label>
                    <input type="number" ref="number_of_seats" className="form-control" id="exampleFormControlFile1" min="1" max="50"required/>
                    {this.state.error!=""?<small id="emailHelp" className="form-text text-muted error">{this.state.error}</small>:""}
                </div>
                <p>Tax: 0.5</p>
                {/* <p>Amount Due: ${this.state.amountDue}</p> */}
                <a onClick={this.incrementStep.bind(this)} className="btn btn-warning">Payment ></a>
                {/* <a onClick={this.decrementStep.bind(this)} className="btn btn-primary pay_back">Back</a> */}
            </div>
            :""}
            {this.state.activeStep==1?
            <div className="card-body">
                <h5 className="card-title">ENTER CREDIT CARD DETAILS</h5>
                <p className="card-text">Your details are safe with us</p>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Credit Card Number</label>
                    <input type="number" ref="credit_card_number" className="form-control" id="exampleFormControlInput1" defaultValue={this.credit_card_number}/>
                    {this.state.cred_error!=""?<small id="emailHelp" className="form-text text-muted error">{this.state.cred_error}</small>:""}
                </div>
                <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="exampleFormControlInput1">Expiration Date</label>
                    <input type="text" ref="date" className="form-control" id="exampleFormControlInput1" placeholder="mm/yy" defaultValue={this.expiration_date}/>
                    {this.state.exp_error!=""?<small id="emailHelp" className="form-text text-muted error">{this.state.exp_error}</small>:""}

                </div>
                <div className="form-group col-sm-2">
                    <label htmlFor="exampleFormControlInput1">CVV</label>
                    <input type="number" ref="cvv" className="form-control" id="exampleFormControlInput1" min="1" max="3"/>
                    {this.state.cvv_error!=""?<small id="emailHelp" className="form-text text-muted error">{this.state.cvv_error}</small>:""}
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                            <input type="checkbox" onChange={this.check.bind(this)} className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Check to save credit card details</label>
                        </div>
                    </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-8">
                    <a href="#" onClick={this.gotoPayment.bind(this)} className="btn btn-warning ">Confirm Payment ></a>
                    <a onClick={this.decrementStep.bind(this)} className="btn btn-warning pay_back ">Back</a>
                    </div>
                </div>
            </div>
            :""}
            {this.state.activeStep==2?
            <div className="card-body">
                <h5 className="card-title">PAYMENT</h5>
                <p className="card-text">An amount of ${this.state.amountDue} will be deducted from your account</p>
                <a onClick={this.makePayment.bind(this)} className="btn btn-warning ">Proceed</a>
                <a onClick={this.decrementStep.bind(this)} className="btn btn-warning pay_back ">Back</a>
            </div>
            :""}
             {this.state.activeStep==3?
            <div className="card-body">
                <h5 className="card-title" align="center"><b>CONFIRMATION</b></h5>
                {this.props.booking==true?
                <p className="card-text confirmation"align="center">
                CONGRATULATIONS! YOU HAVE A BOOKING ON {this.date} AT {this.time} FOR {this.props.movie.movie.title} AT SCREEN NO {this.state.screen_number}
                </p>: <p className="card-text confirmation confirmation_error"align="center">Your payment could not be processed. Please try again.</p>}
            </div>
            :""}
            </form>
            </div>
        </div>
        <div className="col-sm-4 img_card">
            <div className="card">
            <img className="card-img-top" src={this.props.movie.movie.photos} alt="Card image cap"/>
            <div className="card-body">
                <h3 className="movie_name">{this.props.movie.movie.title}</h3>
                <p className="movie_description">{this.props.movie.movie.movie_characters}</p>
                <span className="type">
                    <b>Type:</b>
                    {this.props.movie.movie.type.map(type =>
                    type+", ")} <b>Length:</b> {this.props.movie.movie.movie_length} minutes
                </span>
                <p className="hall_name">{this.props.movie.moviehall.movie_hall.movie_hall_name}</p>
                <p className="address">{this.props.movie.moviehall.movie_hall.city}</p>
            </div>
            </div>
        </div>
    </div>
    </div>
    </div>

  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTicket);
