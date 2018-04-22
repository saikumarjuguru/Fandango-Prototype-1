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

  componentWillMount(){
      let movieID  = "1";
      this.props.dispatch(this.props.getMovieDetail(movieID));
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
                      <li class="subnav__link-item vertical-dropdown"><a class="subnav__link" href="#">More</a>
                    <ul class="dropdown-nav">
                        <li class="subnav__link-item"><a class="subnav__link" href="https://www.fandango.com/avengers:infinitywar_199925/moviephotosposters">Photos + Posters</a></li>
                        <li class="subnav__link-item"><a class="subnav__link" href="/avengers-infinity-war-199925/cast-and-crew">Cast + Crew</a></li>
                    </ul>
                  </li>
                </ul>

                            </div>
                        </div>
                      </section>
        <div class="row mop__layout">
            <div class="mop__details-container col-md-12">
                <section class="movie-details col-md-4">
                <a class="movie-details__mop-link" href="/avengers-infinity-war-199925/movie-overview">
                    <img class="movie-details__movie-img visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/199925/AvengersInfinityWar-postera.jpg" alt="Avengers: Infinity War Movie Poster"/>
                </a>
                <ul class="movie-details__detail">
                  <li>Opens</li>
                  <li class="movie-details__release-date">{new Date(this.props.moviedetail.release_date).getDate()} {months[new Date(this.props.moviedetail.release_date).getMonth()]} {new Date(this.props.moviedetail.release_date).getFullYear()}</li>
                  <li>{this.props.moviedetail.rating},  {this.props.moviedetail.movie_length}</li>
                  { this.props.moviedetail.type.map( movietype =>
                    <li>{movietype}</li>
                  )}
                     <Rating movieid = {this.props.moviedetail.movie_id}/>
                  <li class="js-rotten-tomatoes"></li>
                </ul>
                <ul class="movie-details__film-formats">
                    <h3 class="movie-details__film-formats-header">SEE IT IN</h3>
                    <li class="movie-details__format"><span class="movie-details__format-logo">35MM</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">Digital 3D</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">IMAX</span></li>
                    <li class="movie-details__format"><span class="movie-details__format-logo">IMAX 3D</span></li>
                 </ul>

                 <div class="movie-showtimes" role="menu">
                   <h3><a class="movie-showtimes__all" href="/avengers-infinity-war-199925/movie-times">
                           SEE ALL THEATERS + MOVIE TIMES
                   </a></h3>
                 </div>

                </section>

    {this.state.showOverview ?
          <div>
            <video  width="640" height="360" controls autoplay>
            <source src={this.props.moviedetail.trailer_link} type="video/mp4"/>
            <object width="640" height="360" type="application/x-shockwave-flash" data="player.swf">
              <param name="movie" value="player.swf" />
              <param name="flashvars" value="autostart=true&amp;controlbar=over&amp;image=poster.jpg&amp;file=http://clips.vorwaerts-gmbh.de/VfE_flash.mp4" />
              <img src="poster.jpg" width="640" height="360" alt="Big Buck Bunny" title="No video playback capabilities, please download the video below" />
            </object>
            Your browser does not support HTML5 video.
          </video>
        </div> :  null }
        {this.state.showReview ? <MovieReview  movieid = {this.props.moviedetail.movie_id}/> :  null }
        {this.state.showMovieTimes ? <MovieTimeList movieid = {this.props.moviedetail.movie_id} /> : null}
          </div>
        </div>
      </div> : <div>{this.props.moviefetcherror}</div>}

        </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
