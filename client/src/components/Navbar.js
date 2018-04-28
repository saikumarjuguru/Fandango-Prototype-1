import React , {Component} from 'react';

class Navbar extends Component {

	render() {
		let borderRadiusZero = {
			borderRadius: 0
		}

    let marginR50 = {
      marginRight: 50
    }

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
              <input type="text" className="form-control typeahead border-success" placeholder="Search for Movie" data-provide="typeahead" autoComplete="off" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-success bg-white">
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

export default Navbar;