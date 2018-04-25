import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateCarousel from './DateCarousel';
import { getMovieHallsAndTimes } from '../actions';

  const mapDispatchToProps = (dispatch) => {
    let actions = {getMovieHallsAndTimes};
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
  }

  static defaultProps ={
    hallsWithSlot :[]
  }

  componentWillMount(){
    this.props.dispatch(this.props.getMovieHallsAndTimes(this.props.movie.movie_id))
  }

  render(){
    return(
      <div className = "col-md-7">
        <DateCarousel movie = {this.props.movie}/>

        {this.props.hallsWithSlot.map(hall =>
          <div class="theater__wrap">
              <div class="theater__header">
                <div class="theaters__promoted-amenity-wrap">
                  </div>
                  <div class="theater__name-wrap">
                    <h3 class="theater__name font-sans-serif font-lg font-300 uppercase">
                        <a class="color-light" href="/cinelux-almaden-cafe-and-lounge-AAFQQ/theater-page">{hall.movie_hall.movie_hall_name} Lounge</a>
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
                  <span class="btn showtime-btn showtime-btn--expired js-amenity" data-amenity-desc="Looks like this movie has already started – let’s try another showtime." data-amenity-name="Ticket Availability">09:00 AM</span>
              </li>
              <li class="theater__btn-list-item">
                <span class="btn showtime-btn showtime-btn--expired js-amenity" data-amenity-desc="Looks like this movie has already started – let’s try another showtime." data-amenity-name="Ticket Availability">12:00 PM</span>
              </li>
              <li class="theater__btn-list-item">
                <span class="btn showtime-btn showtime-btn--expired js-amenity" data-amenity-desc="Looks like this movie has already started – let’s try another showtime." data-amenity-name="Ticket Availability">3:00 PM</span>
              </li>
              <li class="theater__btn-list-item">
                <span class="btn showtime-btn showtime-btn--available" data-amenity-desc="Looks like this movie has already started – let’s try another showtime." data-amenity-name="Ticket Availability">6:00 PM</span>
              </li>

            </ol>
          </li>
        </ul>

    </div>
        )}

      </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieTimeList)
