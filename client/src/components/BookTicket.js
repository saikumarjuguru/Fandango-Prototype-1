import React, {Component} from 'react';
import { connect } from 'react-redux';
import { book} from '../actions';
import Message from './Message';
import Stepper from 'react-stepper-horizontal'; //https://devarchy.com/react/react-stepper-horizontal

const mapDispatchToProps = (dispatch) => {

    let actions = {book};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
        username : state.loginReducer.username
    };
  }


class BookTicket extends Component {

    //price, total seats, movie_id,hall_id  will come from backend or from previous step
  
  constructor(props){
    super(props);
   
    this.state = {
        activeStep :0,
        total_seats : 50,
        price:5,
        amountDue: 0,
        error:"" 
    }
    
  }


componentWillReceiveProps(){
  console.log("componentWillReceiveProps");
  if(localStorage.getItem('jwtToken')){
    this.props.history.push('/home');
  }
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
    }
    if(this.refs.number_of_seats.value>this.state.total_seats){
        //alert(this.refs.number_of_seats.value+" seats not available!");
        this.setState({error:this.refs.number_of_seats.value+" seats not available!"});
        return;
    }
    let increment = this.state.activeStep + 1;
    this.setState({
        activeStep : increment
    });
    
}
decrementStep(){
    let decrement = this.state.activeStep - 1;
    this.setState({
        activeStep : decrement
    });
}
calculateAmount(){
    this.setState({error:""});
    if(this.refs.number_of_seats.value>this.state.total_seats){
        this.setState({error:this.refs.number_of_seats.value+" seats not available!"});
        return;
    } else {
        let due = this.state.price * this.refs.number_of_seats.value;
        this.setState({
            amountDue:due
        });
    }
    
}
makePayment() {
    
    let increment = this.state.activeStep + 1;
    this.setState({
        activeStep : increment
    });
}


render(){
    
  return(

    <div className="container booking_container">
    <div className="row">
        <div className="col-sm-8">
            <div className="card">
            <div className="card-header">
            <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'},{title: 'Step Three'}] } activeStep={ this.state.activeStep } />
            </div>
            <form>
            {/* {this.state.activeStep==0?
            <div className="card-body">
                <h5 className="card-title">SELECT DATE AND SHOWTIME</h5>
                <p className="card-text">You're a guaranteed ticket away from the perfect movie night.</p>
                <div className="form-group">
                <label htmlFor="inputState">Select Show Time</label>
                <select id="inputState" ref="show_time" className="form-control">
                    <option defaultValue>Choose...</option>
                    <option value="">02:00 PM</option>
                    <option value="">04:00 PM</option>
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Select Date</label>
                    <input type="date" ref="date" className="form-control" id="exampleFormControlInput1"/>
                </div>
                <a href="#" onClick={this.incrementStep.bind(this)} className="btn btn-primary">Select Number Of Seats ></a>
            </div>
            :""} */}
            {this.state.activeStep==0?
            <div className="card-body">
                <h5 className="card-title">SELECT NUMBER OF SEATS</h5>
                <p className="card-text">Number Of Seats Left: {this.state.total_seats}</p>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Enter Number Of Seats</label>
                    <input type="number" onChange={this.calculateAmount.bind(this)} ref="number_of_seats" className="form-control-file" id="exampleFormControlFile1" min="1" max="50"required/>
                    {this.state.error!=""?<small id="emailHelp" className="form-text text-muted">{this.state.error}</small>:""}
                </div>
                <p>Amount Due: ${this.state.amountDue}</p>
                <a onClick={this.incrementStep.bind(this)} className="btn btn-primary">Confirm and Pay ></a>
                {/* <a onClick={this.decrementStep.bind(this)} className="btn btn-primary pay_back">Back</a> */}
            </div>
            :""}
            {this.state.activeStep==1?
            <div className="card-body">
                <h5 className="card-title">PAYMENT</h5>
                <p className="card-text">An amount of ${this.state.amountDue} will be deducted from your account</p>
                <a onClick={this.makePayment.bind(this)} className="btn btn-primary">Proceed</a>
                <a onClick={this.decrementStep.bind(this)} className="btn btn-primary pay_back">Back</a>
            </div>
            :""}
             {this.state.activeStep==2?
            <div className="card-body">
                <h5 className="card-title" align="center"><b>CONFIRMATION</b></h5>
                <p className="card-text confirmation"align="center">Congratulations! You have a booking on "date" at "time" for "movie name"</p>
            </div>
            :""}
            </form>
            </div>
        </div>
        <div className="col-sm-4 img_card">
            <div className="card">
            <img className="card-img-top" src=".../public/images/fandangonow-logo.png" alt="Card image cap"/>
            <div className="card-body">
                <h3 className="movie_name">Movie Name</h3>
                <p className="movie_description">Movie Description</p>
                <span className="type">type,duration</span>
                <p className="hall_name">Movie Hall Name</p>
                <p className="address">Movie Hall Address</p>
                
            </div>
            </div>
        </div>
    </div>
    </div>

  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTicket);
