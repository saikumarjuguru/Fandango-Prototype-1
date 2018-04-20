import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../actions';

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
  }

  componentWillMount(){
      let movieID  = "1";
      this.props.dispatch(this.props.getMovieDetail(movieID));
  }

  render(){
    return(

        <div className ="container">
      { this.props.moviefetcherror !== undefined ?
        <div>
                  <section class="subnav">
            <div class="row">
              <div class="width-100">
                <h1 class="subnav__title heading-style-1 heading-size-xl">
                      Avengers: Infinity War
                </h1>
                  <ul class="subnav__link-list">
                      <li class="subnav__link-item"><a class="subnav__link" href="/avengers-infinity-war-199925/movie-overview">Overview</a></li>
                      <li class="subnav__link-item"><a class="subnav__link" href="/avengers-infinity-war-199925/movie-times">Movie Times + Tickets</a></li>
                      <li class="subnav__link-item"><a class="subnav__link" href="/avengers-infinity-war-199925/plot-summary">Synopsis</a></li>
                      <li class="subnav__link-item"><a class="subnav__link" href="/avengers-infinity-war-199925/movie-reviews">Movie Reviews</a></li>
                      <li class="subnav__link-item"><a class="subnav__link" href="https://www.fandango.com/movie-trailer/avengers:infinitywar-trailer/199925">Trailers</a></li>
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
                  <li class="movie-details__release-date">April 27, 2018</li>
                  <li>PG-13,  2 hr 29 min</li>
                  <li>Action/Adventure</li>
                  <li>Sci-Fi/Fantasy</li>
                  <li></li>
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

          <div>
          <video width="400" controls>
            <source src="./videos/sample.mp4" type="video/mp4"/>
            {/*<source src="mov_bbb.ogg" type="video/ogg"/>*/}
            Your browser does not support HTML5 video.
          </video>
          </div>

          </div>
        </div>
      </div> : <div>{this.props.moviefetcherror}</div>}

        </div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
