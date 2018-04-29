import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {Typeahead} from 'react-bootstrap-typeahead';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      options: []
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
        options: response.data.message
      })
    })
  }

  handleSelected(selected) {
    this.props.history.push(`/movieDetails/${selected[0].movie_id}`)
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
    let {isAuthenticated} = localStorage.getItem('userId') ? true : false;

		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={borderRadiusZero}>
        <a className="navbar-brand">
        	<img src="images/fadango-header.png" width="210px"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MOVIES
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MOVIE TIMES + TICKETS
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MOVIE NEWS
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
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
          { isAuthenticated &&  <button className="btn btn-outline-primary bg-white">SIGN IN</button>}
          { !isAuthenticated && <button className="btn btn-outline-danger bg-white">LOGOUT</button>}
        </div>
      </nav>
      
		)
	}
}

export default withRouter(Navbar);

