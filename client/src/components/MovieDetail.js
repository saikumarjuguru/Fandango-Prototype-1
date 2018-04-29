import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../actions';
import Rating from './Rating';
import MovieReview from './MovieReview';
import MovieTimeList from './MovieTimeList'

const mapDispatchToProps = (dispatch) => {

    let actions = {getMovieDetail};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      moviefetcherror : state.movieReducer.moviefetcherror,
      moviedetail : state.movieReducer.moviedetail
    };
  }

class MovieDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      showOverview :true,
      showReview : false,
      showMovieTimes : false,
    }
    this.showMovieReviews = this.showMovieReviews.bind(this);
    this.showOverview =  this.showOverview.bind(this);
    this.showMovieTimes = this.showMovieTimes.bind(this);
  }

  static defaultProps = {
    moviedetail :{
      release_date :'',
      type :[],
      trailer_link : '',
      movie_id: ''
    }
  }

  componentDidMount(){
    let {match} = this.props;
    this.props.dispatch(this.props.getMovieDetail(match.params.id));
  }

  showMovieReviews(){
    this.setState({
      showOverview: false,
      showReview : true,
      showMovieTimes : false
    })
  }

  showMovieTimes(){
    this.setState({
      showOverview: false,
      showReview : false,
      showMovieTimes : true
    })
  }

  showOverview(){
    this.setState({
      showOverview: true,
      showReview : false,
      showMovieTimes : false
    })
  }

  render(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return(

        <div className ="container">
      { this.props.moviefetcherror === undefined ?
        <div>
                  <section class="subnav">
            <div class="row">
              <div class="width-100">
                <h1 class="subnav__title heading-style-1 heading-size-xl">
                      {this.props.moviedetail.title}
                </h1>
                  <ul class="subnav__link-list">
                      <li class="subnav__link-item"><a class="subnav__link"  onClick = {this.showOverview}>Overview</a></li>
                      <li class="subnav__link-item"><a class="subnav__link" onClick = {this.showMovieTimes}>Movie Times + Tickets</a></li>
                      <li class="subnav__link-item"><a class="subnav__link"  onClick = {this.showMovieReviews}>Movie Reviews</a></li>

                </ul>

                            </div>
                        </div>
                      </section>
        <div class="mop__layout row">
                <section class="movie-details col-md-4">
                <a class="movie-details__mop-link" href="#">
                    <img class="movie-details__movie-img visual-thumb" src={this.props.moviedetail.photos} alt="Avengers: Infinity War Movie Poster"/>
                </a>
                <ul class="movie-details__detail">
                  <li>Release Date</li>
                  <li class="movie-details__release-date">{new Date(this.props.moviedetail.release_date).getDate()} {months[new Date(this.props.moviedetail.release_date).getMonth()]} {new Date(this.props.moviedetail.release_date).getFullYear()}</li>
                  <li>{this.props.moviedetail.rating},  {this.props.moviedetail.movie_length}</li>
                  { this.props.moviedetail.type.map( movietype =>
                    <li>{movietype}</li>
                  )}
                    Average Rating <Rating rating = {this.props.moviedetail.avg_rating} disable = "true"/>
                  <li class="js-rotten-tomatoes"></li>
                </ul>
                <ul class="movie-details__film-formats">
                    <h3 class="movie-details__film-formats-header">SEE IT IN</h3>
                    <li class="movie-details__format"><span class="movie-details__format-logo">35MM</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">Digital 3D</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">IMAX</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">IMAX 3D</span></li>
                 </ul>


                </section>

    {this.state.showOverview ?
          <div className="col-md-8">
            <iframe width="700" height="450"  src={this.props.moviedetail.trailer_link+'?autoplay=1'}></iframe>

        </div> :  null }
        {this.state.showReview ? <MovieReview  movieid = {this.props.moviedetail.movie_id}/> :  null }
        {this.state.showMovieTimes ? <MovieTimeList movie = {this.props.moviedetail} /> : null}
          </div>
      </div> : <div>{this.props.moviefetcherror}</div>}

        </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
