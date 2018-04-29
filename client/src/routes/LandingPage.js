import React , {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import config from '../config';
import 'react-bootstrap-typeahead/css/Typeahead.css';


import Navbar from '../components/Navbar';

const mapDispatchToProps = (dispatch) => {
  let actions = {};
  return { ...actions, dispatch };
}

const mapStateToProps = (state) => {
  return {
    loginMsg: state.loginReducer.loginMsg,
    status : state.loginReducer.loginStatus,
    username : state.loginReducer.username
  };
}


class LandingPage extends Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      activeFilters: {
        type: null,
        genre: []
      }
    }
  }

  getMovies() {
    return axios.post(config.API_URL+'/admin/searchmovie', {
      searchtext: ""
    });
  }

  componentDidMount() {
    this.getMovies().then((response) => {
      this.setState({
        movies: response.data.message
      });
    })
  }

  componentWillMount(){

    if(localStorage.getItem("userId")) {
        let userTrace = {
            user_id: localStorage.getItem("userId"),
            user : JSON.parse(localStorage.getItem("userDetails")),
            path: "home"
        }
        axios.post(config.API_URL + '/logs/user_journey', userTrace);
    }
  }

  handleFilters() {
    let { activeFilters } = this.state;
    let { type, genre } = activeFilters;
    let filteredMovies;
    debugger
    // this.getMovies().then((response) => {
    //   let movies = response.data.message;
    //   filteredMovies = movies.filter((movie) => {
    //     debugger
    //     if(type && genre) {
    //       if(type === 'now-showing') {
    //         return Date.parse(movie.release_date) < Date.parse(new Date()) && movie.genre.toLowerCase() === genre;
    //       } else {
    //         return Date.parse(movie.release_date) > Date.parse(new Date()) && movie.genre.toLowerCase() === genre;
    //       } 
    //     } else if(!type && genre) {
    //       return  movie.genre.toLowerCase() === genre;
    //     } else if(type && !genre) {
    //       if(type === 'now-showing') {
    //         return Date.parse(movie.release_date) < Date.parse(new Date());
    //       } else {
    //         return Date.parse(movie.release_date) > Date.parse(new Date());
    //       } 
    //     }


        // if(!this.state.activeFilters.genre && this.state.activeFilters.type) {

        //   if(this.state.activeFilters.type === 'now-showing') {
        //     return 
        //     if(new Date(movie.release_date) < new Date) {
        //       return movie;
        //     }
        //   } else {

        //   }

        // } else if(this.state.activeFilters.genre && !this.state.activeFilters.type) {

        //     return movie.genre.toLowerCase() === this.state.activeFilters.type;

        // } else if(this.state.activeFilters.genre && this.state.activeFilters.type) {

        //   return

        // } else {
        //   return null;
        // }
    //   });
    //   debugger
    //   this.setState({
    //     movies: filteredMovies
    //   });
    // });
  }

  handleFilterButton(type, e) {
    e.preventDefault();
    this.setState({
      activeFilters: {
        type: type
      }
    });
    this.handleFilters();
    // let nowShowing = [];
    // let comingSoon = [];

    // this.getMovies().then((response) => {
    //   response.data.message.forEach((movie) => {
    //     if(new Date(movie.release_date) < new Date) {
    //       nowShowing.push(movie);
    //     } else {
    //       comingSoon.push(movie);
    //     }
    //   });
    //   if(type === 'now-showing') {
    //     this.setState({
    //       movies: nowShowing,
    //       activeFilter: 'now-showing'
    //     })
    //   } else if(type === 'coming-soon') {
    //     this.setState({
    //       movies: comingSoon,
    //       activeFilter: 'coming-soon'
    //     })
    //   }
    // });
  }

  handleGenre(e) {
    // e.preventDefault();
    let { genre } = this.state.activeFilters;

    if(e.target.checked && !genre.includes(e.target.value)) {
      genre.push(e.target.value);
    } else if(!e.target.checked && genre.includes(e.target.value)) {
      genre.splice(genre.indexOf(e.target.value), 1);
    }
    debugger
    this.setState({
      activeFilters: {
        genre: genre
      }
    });
  }

  render(){
    let {movies, activeFilters} = this.state;
    let {genre} = activeFilters;
    debugger
    let buttonStyle = {
      fontSize: 12,
      borderRadius: 0
    }
    
    return(
      <div className="container-fluid" onClick={() => {
        let payload;
        if(localStorage.getItem('userId')) {
          payload = {
              page: "home"
          }
        } else {
          payload = {
              page: "landingpage"
          }
        }
        axios.post(config.API_URL+'/logs',payload);
      }}>

        <Navbar movies={this.state.movies}></Navbar>

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="images/infinity_wars_banner.jpg" alt="Avengers" width="1080" height="480" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/gangster_squad_banner.jpg" alt="Ganngster Squad" width="1080" height="480" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/into_the_storm_banner.jpg" alt="Into The Storm" width="1080" height="480" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>

        <br/>

        <div className="container-fluid text-center">
          <div className="btn-group" role="group">
            <button type="button" className={(activeFilters.type === 'now-showing') ? "active btn btn-outline-danger" : "btn btn-outline-danger" } onClick={this.handleFilterButton.bind(this, 'now-showing')}>NOW SHOWING</button>
            <button type="button" className={(activeFilters.type === 'coming-soon') ? "active btn btn-outline-danger" : "btn btn-outline-danger" }  onClick={this.handleFilterButton.bind(this, 'coming-soon')}>COMING SOON</button>
          </div>
        </div>

        <br/><br/><br/>

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h4>Genre</h4>
              <div className="list-group">
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre.includes("drama")) ? true : false} value="drama" onClick={this.handleGenre.bind(this)} />
                      Drama
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre) ? genre.includes("comedy") : false} value="comedy" onClick={this.handleGenre.bind(this)} />
                      Comedy
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre) ? genre.includes("action") : false} value="action" onClick={this.handleGenre.bind(this)} />
                      Action
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre) ? genre.includes("romance") : false} value="romance" onClick={this.handleGenre.bind(this)} />
                      Romance
                    </label>
                  </div>
                </a>
                 <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre) ? genre.includes("horror") : false} value="horror" onClick={this.handleGenre.bind(this)} />
                      Horror
                    </label>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row">


                { movies.length > 0 && movies.map((movie) => {
                  let movieDetailURL = `/movieDetails/${movie.movie_id}`;
                  if(movie.photos) {
                    return (
                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                          <a href="#"><img className="card-img-top" src={movie.photos} alt /></a>
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to={movieDetailURL}>{movie.movie_name}</Link>                            
                            </h5>
                            <h5>$24.99</h5>
                          </div>
                          <Link className="btn btn-secondary btn-block btn-lg" style={buttonStyle} to={movieDetailURL}>BOOK NOW</Link>
                        </div>
                      </div>
                    )
                  }})
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
