import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateCarousel from './DateCarousel';
import { getMovieHallsAndTimes,getHallAndTimeDetailsForBooking } from '../actions';
import { withRouter } from 'react-router-dom';
import config from "../config";
import axios from "axios/index";

  const mapDispatchToProps = (dispatch) => {
    let actions = {getMovieHallsAndTimes,getHallAndTimeDetailsForBooking};
    return { ...actions, dispatch };
  }

  const mapStateToProps = (state) => {
    return {
      hallsWithSlot : state.moviehallReducer.hallsWithSlot
    };
  }


class MovieTimeList extends Component{

  constructor(props){
    super(props);
    let hallsWithSlot = this.props.hallsWithSlot;
    hallsWithSlot.map(p =>
      p.display= ""
    );
    this.state={
      hallsWithSlot : hallsWithSlot,
      hallsWithSlotForFilter : hallsWithSlot,
      date : new Date(),
      min : '8',
      max : '15'
    }
    this.onDateSelect = this.onDateSelect.bind(this);
    this.handleSlot1 = this.handleSlot1.bind(this);
    this.handleSlot2 = this.handleSlot2.bind(this);
    this.handleSlot3 = this.handleSlot3.bind(this);
    this.handleSlot4 = this.handleSlot4.bind(this);
    this.filter1Change =this.filter1Change.bind(this);
    this.filter2Change = this.filter2Change.bind(this);
    this.handleClickData = this.handleClickData.bind(this);
  }


  static defaultProps ={
    hallsWithSlot :[]
  }

  handleClickData(){
    let componentData = {
                          component: "editprofile"
                        }
    axios.post(config.API_URL+'/logs/component_click',componentData);
  }

  componentWillMount(){
    let date = new Date();
    let formatDate = date.getFullYear() + '-' +(date.getMonth() + 1)+ '-' + date.getDate()
    this.props.dispatch(this.props.getMovieHallsAndTimes(this.props.movie.movie_id, formatDate));
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.movie.movie_id !== this.props.movie.movie_id) || (nextProps.hallsWithSlot.length !== this.props.hallsWithSlot.length)){
      var date = this.state.date;
      let formatDate = date.getFullYear() + '-' +(date.getMonth() + 1)+ '-' + date.getDate()
      this.props.dispatch(this.props.getMovieHallsAndTimes(nextProps.movie.movie_id,formatDate));
    }
    if(nextProps.hallsWithSlot !== undefined){
      this.setState({
        hallsWithSlot :nextProps.hallsWithSlot,
        hallsWithSlotForFilter : nextProps.hallsWithSlot
      })
    }
  }

  onDateSelect(date){
    let formatDate = date.getFullYear() + '-' +(date.getMonth() + 1)+ '-' + date.getDate()
    this.setState({
      date : date
    })
    this.props.dispatch(this.props.getMovieHallsAndTimes(this.props.movie.movie_id, formatDate));
  }

  handleSlot1(hall){
    let data = {
      moviehall : hall,
      slot : 'slot1',
      movie : this.props.movie,
      date : this.state.date
    }
    this.props.dispatch(this.props.getHallAndTimeDetailsForBooking(data))
    this.props.history.push("/book");
  }

  handleSlot2(hall){
    let data = {
      moviehall : hall,
      slot : 'slot2',
      movie : this.props.movie,
      date : this.state.date
    }
    this.props.dispatch(this.props.getHallAndTimeDetailsForBooking(data))
    this.props.history.push("/book");
  }

  handleSlot3(hall){
    let data = {
      moviehall : hall,
      slot : 'slot3',
      movie : this.props.movie,
      date : this.state.date
    }
    this.props.dispatch(this.props.getHallAndTimeDetailsForBooking(data))
    this.props.history.push("/book");
  }

  handleSlot4(hall){
    let data = {
      moviehall : hall,
      slot :'slot4',
      movie : this.props.movie,
      date : this.state.date
    }
    this.props.dispatch(this.props.getHallAndTimeDetailsForBooking(data))
    this.props.history.push("/book");
  }

  filter1Change(event){
    var selectedHalls = [];
    var elem = event.target.value;
    var res = elem.slice(0, -1);
    var max = this.state.max;
    this.state.hallsWithSlot.map( hall =>  {
          if((hall.movie_hall.ticket_price >= res) && (hall.movie_hall.ticket_price <= max)) {
              hall.display= "";
              selectedHalls.push(hall);
          }else{
              hall.display= "none";
          }
       }
    );

    this.setState({
      hallsWithSlotForFilter : selectedHalls,
      min : res
    })
  }

  filter2Change(event){
    var selectedHalls = [];
    var elem = event.target.value;
    var res = elem.slice(0, -1)
    var min = this.state.min;
    this.state.hallsWithSlot.map( hall =>  {
          if (hall.movie_hall.ticket_price <= res  && hall.movie_hall.ticket_price >= min) {
              hall.display= "";
              selectedHalls.push(hall);
          }else{
              hall.display= "none";
          }
       }
    );

    this.setState({
      hallsWithSlotForFilter : selectedHalls,
      max : res
    })
  }

  render(){
    return(
      <div className = "col-md-8" onCLick = {this.handleClickData}>
        <DateCarousel  onDateSelect = {this.onDateSelect} movie = {this.props.movie}/>
        <div className = "m-5 mt-lg-4 pull-right">
          <strong>Price Range </strong>Min:
          <span className = "display-inline">
            <select  className = "form-control" onChange={this.filter1Change} >
              <option> 8$</option>
              <option> 9$</option>
              <option> 10$</option>
            </select>
          </span>
          &nbsp; - &nbsp;  Max:
          <span className = "display-inline">
            <select className="form-control"  onChange={this.filter2Change} >
              <option> 13$</option>
              <option> 14$</option>
              <option> 15$</option>
            </select>
          </span>
        </div>
        <br/>
        <br/>
        {this.state.hallsWithSlotForFilter !== undefined && this.state.hallsWithSlotForFilter.length >0 ?
        <div className = "mt-5">
          {this.state.hallsWithSlotForFilter.map(hall =>
          <div className="theater__wrap" style = {{display :hall.display}}>
            <div className="theater__header">
              <div className="theaters__promoted-amenity-wrap">
              </div>
              <div className="theater__name-wrap">
                <div className="row w-100">
                  <div className="col-md-6">
                    <h3 className="theater__name font-sans-serif font-lg font-300 uppercase">
                      <a className="color-light text-white">{hall.movie_hall.movie_hall_name}</a>
                    </h3>
                  </div>
                  <div className="col-md-6">
                    <h3 className="theater__name font-sans-serif font-lg font-300 uppercase">
                      <span className="color-light pull-right" >$ {hall.movie_hall.ticket_price}</span>
                    </h3>
                  </div>
                  <div className="col-md-12">
                    <span> {hall.movie_hall.city}</span>
                  </div>
                </div>
              </div>
              <div className="theater__address-wrap">
              </div>
            </div>
            <ul className="theater__showtimes font-sans-serif-alt">
              <li class="theater__showtimes-variant theater__showtimes-variant--last-li">
                <h3 class="theater__tick-headline font-serif">
                  <span class="icon icon-ticket"></span>
                  Select a movie time to buy Standard Showtimes
                </h3>
                <ol className="theater__btn-list">
                  <li className="theater__btn-list-item">
                    {hall.slot1Available!== undefined ? <span className={hall.slot1Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                    onClick={()=> {hall.slot1Available ? this.handleSlot1(hall) : null}}>
                    12:00 PM</span> : null}
                  </li>
                  <li className="theater__btn-list-item">
                    {hall.slot2Available!== undefined ?
                    <span className={hall.slot2Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                    onClick={()=> {hall.slot2Available ? this.handleSlot2(hall) : null}}>
                    03:00 PM</span> : null}
                  </li>
                  <li className="theater__btn-list-item">
                    {hall.slot3Available!== undefined ?
                    <span className={hall.slot3Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                    onClick={()=> {hall.slot3Available ? this.handleSlot3(hall) : null}}>
                    06:00 PM</span> : null}
                  </li>
                  <li className="theater__btn-list-item">
                    {hall.slot4Available!== undefined ?
                    <span className={hall.slot4Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                    onClick={()=> {hall.slot4Available ? this.handleSlot4(hall) : null}}>
                    09:00 PM</span> : null}
                  </li>
                </ol>
              </li>
            </ul>
          </div>
          )}
        </div>
        :  <strong className="text-warning">No results found!</strong>}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MovieTimeList));
