import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {Typeahead} from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      genreOptions: []
    }
    this.logOut = this.logOut.bind(this);
  } 
  logOut(){
    localStorage.clear();
    this.props.history.push('/');
    window.location.reload();
  }

  getMovies() {
    return axios.post(config.API_URL+'/admin/searchmovie', {
      searchtext: ""
    });
  }

  componentDidMount() {
    this.getMovies().then((response) => {
      let moviesOptions = response.data.message.filter((movie) => {
        return Date.parse(movie.release_date) < Date.parse(new Date());
      });
      this.setState({
        options: moviesOptions,
        genreOptions: moviesOptions.map(movie => movie.genre)
      })
    })
  }

  handleSelected(selected) {
    if(selected.length > 0) {
      this.props.history.push(`/movieDetails/${selected[0].movie_id}`)
    }
  }

	render() {
		let borderRadiusZero = {
			borderRadius: 0
		}
    let marginR50 = {
      marginRight: 50
    }

    let { options } = this.state;
    let { historyReact } = this.props;
    let isAuthenticated = localStorage.getItem('userId') ? true : false;

		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={borderRadiusZero}>
        <Link className="navbar-brand" to='/'>
        	<img src="/images/fadango-header.png" width="210px"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MOVIES
              </a>
              <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                { options && options.map((movie, index) => {
                  let url = `/movieDetails/${movie.movie_id}`;
                  return (
                    <Link key={index} className="dropdown-item text-white" to={url}>{movie.movie_name}</Link>
                  )
                })}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  href="https://www.cinemablend.com/news.php">
                MOVIE NEWS
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="input-group" style={marginR50}>
              <Typeahead
                labelKey="movie_name"
                onChange={this.handleSelected.bind(this)}
                options={options}
                placeholder="Search for Movie"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-primary bg-white">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
          { !isAuthenticated &&  <Link className="btn btn-outline-primary" to="/login">SIGN IN / SIGN UP</Link>}
          { isAuthenticated && <Link className="btn btn-outline-info" style={marginR50} to="/editprofile"><i class="fa fa-user-circle"></i></Link>}
          { isAuthenticated && <button className="btn btn-outline-danger" onClick={() => this.logOut()} >LOGOUT</button>}

        </div>
      </nav>
      
		)
	}
}

export default withRouter(Navbar);

