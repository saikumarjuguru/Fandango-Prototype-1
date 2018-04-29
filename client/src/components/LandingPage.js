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
      filteredMovies: [],
      activeFilters: {
        type: "",
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
      }, () => {
        this.handleFilters();
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
    let filteredMovies = this.state.movies
    let { activeFilters, movies } = this.state;

    if(activeFilters.type === 'now-showing') {
      filteredMovies = movies.filter((movie) => {
        return Date.parse(movie.release_date) < Date.parse(new Date());
      });
    } else if(activeFilters.type === 'coming-soon') {
      filteredMovies = movies.filter((movie) => {
        return Date.parse(movie.release_date) > Date.parse(new Date());
      });
    }

    if(activeFilters.genre && activeFilters.genre.length > 0) {
      filteredMovies = filteredMovies.filter((movie) => {
        return activeFilters.genre.includes(movie.genre.toLowerCase());
      });
    }

    this.setState({
      filteredMovies: filteredMovies
    });
  }

  handleFilterButton(type, e) {
    this.setState({
      activeFilters: {
        type: type,
        genre: (this.state.activeFilters.genre) ? this.state.activeFilters.genre : []
      }
    },() => {
      this.handleFilters()
    });
  }

  handleGenre(e) {
    let genre = this.state.activeFilters.genre;

    if(e.target.checked && !genre.includes(e.target.value)) {
      genre.push(e.target.value);
    } else if(!e.target.checked && genre.includes(e.target.value)) {
      genre.splice(genre.indexOf(e.target.value), 1);
    }

    this.setState({
      activeFilters: {
        type: (this.state.activeFilters.type) ? this.state.activeFilters.type : "",
        genre: genre
      }
    }, () => {
      this.handleFilters();
    });

  }

  render(){
    let {movies, activeFilters, filteredMovies} = this.state;
    let {genre} = activeFilters;
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
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("drama")) ? true : false} value="drama" onClick={this.handleGenre.bind(this)} />
                      Drama
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("comedy")) ? true : false} value="comedy" onClick={this.handleGenre.bind(this)} />
                      Comedy
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("action")) ? true : false} value="action" onClick={this.handleGenre.bind(this)} />
                      Action
                    </label>
                  </div>
                </a>
                <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("romance")) ? true : false} value="romance" onClick={this.handleGenre.bind(this)} />
                      Romance
                    </label>
                  </div>
                </a>
                 <a className="list-group-item">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("horror")) ? true : false} value="horror" onClick={this.handleGenre.bind(this)} />
                      Horror
                    </label>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row">

                { filteredMovies.length > 0 && filteredMovies.map((movie, index) => {
                  let movieDetailURL = `/movieDetails/${movie.movie_id}`;
                  if(movie.photos) {
                    return (
                      <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <div className="card h-100">
                          <a href="#"><img className="card-img-top" src={movie.photos} /></a>
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to={movieDetailURL}>{movie.movie_name}</Link>                            
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">Duration - {movie.movie_length} min</h6>
                            <p><span class="badge badge-info">{movie.rating}</span></p>
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
