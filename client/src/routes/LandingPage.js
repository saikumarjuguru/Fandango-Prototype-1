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
      activeFilter: ""
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
            user: localStorage.getItem("userDetails"),
            path: "home"
        }
        axios.post(config.API_URL + '/logs/user_journey', userTrace);
    }
    else
    {
        let userTrace = {
            user_id: localStorage.getItem("userId"),
            user: localStorage.getItem("userDetails"),
            path: "landingpage"
        }
        axios.post(config.API_URL + '/logs/user_journey', userTrace);
    }
  }

handleFilterButton(type, e) {
    e.preventDefault();
    let nowShowing = [];
    let comingSoon = [];

    this.getMovies().then((response) => {
      response.data.message.forEach((movie) => {
        if(new Date(movie.release_date) < new Date) {
          nowShowing.push(movie);
        } else {
          comingSoon.push(movie);
        }
      });
      if(type === 'now-showing') {
        this.setState({
          movies: nowShowing,
          activeFilter: 'now-showing'
        })
      } else if(type === 'coming-soon') {
        this.setState({
          movies: comingSoon,
          activeFilter: 'coming-soon'
        })
      }
    });
  }

  render(){
    let {movies, activeFilter} = this.state;
    let buttonStyle = {
      fontSize: 12,
      borderRadius: 0
    }
    
    return(
      <div className="container-fluid landingpage">
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
            <button type="button" className={(activeFilter === 'now-showing') ? "active btn btn-outline-danger" : "btn btn-outline-danger" } onClick={this.handleFilterButton.bind(this, 'now-showing')}>NOW SHOWING</button>
            <button type="button" className={(activeFilter === 'coming-soon') ? "active btn btn-outline-danger" : "btn btn-outline-danger" }  onClick={this.handleFilterButton.bind(this, 'coming-soon')}>COMING SOON</button>
          </div>
        </div>

        <br/><br/><br/>

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h4 className="my-4">Filters</h4>
              <div className="list-group">
                <a href="#" className="list-group-item">Category 1</a>
                <a href="#" className="list-group-item">Category 2</a>
                <a href="#" className="list-group-item">Category 3</a>
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


                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100">
                    <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt /></a>
                    <div className="card-body">
                      <h4 className="card-title">
                        <a href="#">Item Two</a>
                      </h4>
                      <h5>$24.99</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">★ ★ ★ ★ ☆</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
