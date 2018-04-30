import React , {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';

class Footer extends Component {

	render() {
    let isAuthenticated = localStorage.getItem('userId') ? true : false;

		return(
			
      <footer className="page-footer font-small bg-dark text-white pt-4 mt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-4">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                <img src="/images/fadango-header.png" width="210px"/>
              </h5>
              <p>Rack up 150 VIP+ Points for every ticket you buy. Unlock a reward for every 600 points you earn. Reap the rewards – the choice is yours: get movies to stream on FandangoNOW, discounts on Fandango tickets or FanShop movie gear.</p>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-md-2 mx-auto">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Experience + Explore</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Movies In Theaters</a>
                </li>
                <li>
                  <a href="/">Movie Actors and Actresses</a>
                </li>
                <li>
                  <a href="/">Mobile</a>
                </li>
                <li>
                  <a href="/">Special Offers</a>
                </li>
                <li>
                  <a href="/">Gift Cards</a>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-md-2 mx-auto">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Editorial Features</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Indie Movie Guide</a>
                </li>
                <li>
                  <a href="/">Summer Movie Guide</a>
                </li>
                <li>
                  <a href="/">Family Guide</a>
                </li>
                <li>
                  <a href="/">Movie News</a>
                </li>
              </ul>
            </div>
            <hr className="clearfix w-100 d-md-none" />
            <div className="col-md-2 mx-auto">
              <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Videos</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Movie Trailers</a>
                </li>
                <li>
                  <a href="/">Weekend Ticket</a>
                </li>
                <li>
                  <a href="/">Frontrunners</a>
                </li>
                <li>
                  <a href="/">Mom's Movie Minute</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        { !isAuthenticated && 
          <div>
            <hr />
            <div className="text-center py-3">
              <ul className="list-unstyled list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="mb-1">Register for free</h5>
                </li>
                <li className="list-inline-item">
                  <Link className="btn btn-danger" to="/signup">SIGN UP!</Link>
                </li>
              </ul>
            </div>
          </div>
        }
        <hr />
        <div className="text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a className="btn btn-primary" href="/"><i className="fa fa-facebook" /></a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-info" href="/"><i className="fa fa-twitter" /></a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-danger" href="/"><i className="fa fa-google" /></a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-warning" href="/"><i className="fa fa-snapchat-ghost" /></a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-success" href="/"><i className="fa fa-vine" /></a>
            </li>
          </ul>
          <br/><br/>
        </div>
      </footer>

      
		)
	}
}

export default withRouter(Footer);

