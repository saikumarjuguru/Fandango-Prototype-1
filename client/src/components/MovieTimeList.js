import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateCarousel from './DateCarousel';
import { getMovieHallsAndTimes,getHallAndTimeDetailsForBooking } from '../actions';
import { withRouter } from 'react-router-dom';

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
  }


  static defaultProps ={
    hallsWithSlot :[]
  }

  componentWillMount(){
    let date = new Date();
    let formatDate = date.getFullYear() + '-' +(date.getMonth() + 1)+ '-' + date.getDate()
    this.props.dispatch(this.props.getMovieHallsAndTimes(this.props.movie.movie_id, formatDate));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.hallsWithSlot !== undefined){
      this.setState({
        hallsWithSlot :nextProps.hallsWithSlot,
        hallsWithSlotForFilter : nextProps.hallsWithSlot
      })
    }
  }

  onDateSelect(date){
    let formatDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear()
    this.state.date = date
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
          if(hall.movie_hall.ticket_price > res && hall.movie_hall.ticket_price< max) {
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
          if (hall.movie_hall.ticket_price < res  && hall.movie_hall.ticket_price> min) {
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
      <div className = "col-md-8">

        <DateCarousel  onDateSelect = {this.onDateSelect} movie = {this.props.movie}/>
        <div className = "pull-right"><strong>Price Range </strong>Min:
          <span className = "display-inline"><select   onChange={this.filter1Change} >
                  <option> 8$</option>
                  <option> 9$</option>
                  <option> 10$</option>
          </select></span>
        &nbsp; - &nbsp;  Max:
          <span className = "display-inline"><select   onChange={this.filter2Change} >
                  <option> 13$</option>
                  <option> 14$</option>
                  <option> 15$</option>
          </select></span>
        </div>
        <br/>
        <br/>
        {this.state.hallsWithSlotForFilter !== undefined && this.state.hallsWithSlotForFilter.length >0 ?
        <div>
            {this.state.hallsWithSlotForFilter.map(hall =>
                  <div class="theater__wrap" style = {{display :hall.display}}>
                      <div class="theater__header">
                        <div class="theaters__promoted-amenity-wrap">
                          </div>
                          <div class="theater__name-wrap">
                            <h3 class="theater__name font-sans-serif font-lg font-300 uppercase">
                                <a class="color-light" href="#">{hall.movie_hall.movie_hall_name} Lounge</a>
                                <span  class="color-light pull-right" >$ {hall.movie_hall.ticket_price}</span>
                            </h3>
                          </div>
                          <div class="theater__address-wrap">
                            <span> {hall.movie_hall.city}</span>
                    </div>
              </div>
                <ul class="theater__showtimes font-sans-serif-alt">
                  <li class="theater__showtimes-variant theater__showtimes-variant--last-li">
                    <h3 class="theater__tick-headline font-serif">
                        <span class="icon icon-ticket"></span>
                          Select a movie time to buy Standard Showtimes
                    </h3>
                    <ol class="theater__btn-list">
                      <li class="theater__btn-list-item">
                          <span class={hall.slot1Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                            onClick={()=> {hall.slot1Available ? this.handleSlot1(hall) : null}}>
                            09:00 AM</span>
                      </li>
                      <li class="theater__btn-list-item">
                        <span class={hall.slot2Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                          onClick={()=> {hall.slot2Available ? this.handleSlot2(hall) : null}}>
                          12:00 PM</span>
                      </li>
                      <li class="theater__btn-list-item">
                        <span class={hall.slot3Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                          onClick={()=> {hall.slot3Available ? this.handleSlot3(hall) : null}}>
                          3:00 PM</span>
                      </li>
                      <li class="theater__btn-list-item">
                        <span class={hall.slot4Available ? 'btn showtime-btn showtime-btn--available' :'btn showtime-btn showtime-btn--expired js-amenity'}
                          onClick={()=> {hall.slot4Available ? this.handleSlot4(hall) : null}}>
                          6:00 PM</span>
                      </li>

                    </ol>
                  </li>
                </ul>

            </div>
                )}
      </div> :  <strong className="text-warning">No results found!</strong>}

      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MovieTimeList));
