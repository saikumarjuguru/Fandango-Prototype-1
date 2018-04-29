import React , {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    let padding20 = {
      paddingTop: 20
    }

    return(
      <div className="container-fluid">
        <Navbar movies={this.state.movies}></Navbar>

        <main>
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

          <div className="container-fluid">
            <div className="row d-flex d-md-block flex-nowrap wrapper">
              <div className="col-md-2 float-left col-1 pr-0 collapse width show" id="sidebar">
                
              </div>
              <div className="col-md-10 float-left col px-5 pl-md-2 main">
                  <div className="row mt-5">
                    { movies.length > 0 && movies.map((movie) => {
                      return(
                        <div className="col-lg-3" style={padding20}>
                          <div className="card mb-r">
                            <img className="img-fluid" src={movie.photos} width="260" />
                            <div className="card-body">
                              <h4 className="card-title text-center">
                                <strong>{movie.movie_name}</strong>
                              </h4>
                            </div>
                              <button className="btn btn-secondary btn-block btn-lg" style={buttonStyle}>BOOK NOW</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
