import React , {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

}

  const mapStateToProps = (state) => {
    return {
      loginMsg: state.loginReducer.loginMsg,
      loginStatus : state.loginReducer.loginStatus,
      username : state.loginReducer.username
    };
  }


class LandingPage extends Component {
  render(){

    return(
      <div>
        <Navbar></Navbar>
  

  <main>
    {/*Main layout*/}
    <div className="container">
      {/*First row*/}
      <div className="row wow fadeIn" data-wow-delay="0.2s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.2s'}}>
        <div className="col-md-12">
          {/*Card*/}
          <div className="card">
            {/*Card image*/}
            <div className="view overlay hm-white-slight">
              <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(28).jpg" className="img-fluid" alt />
              <a href="#">
                <div className="mask waves-effect waves-light" />
              </a>
            </div>
            {/*Card content*/}
            <div className="card-body text-center mb-3">
              {/*Title*/}
              <h3 className="card-title mt-2 pb-4">
                <strong>Card title</strong>
              </h3>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Button</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
      </div>
      {/*/.First row*/}
      {/*Second row*/}
      <div className="row mt-5 pt-4">
        {/*First columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card mb-r wow fadeIn" data-wow-delay="0.2s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.2s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*First columnn*/}
        {/*Second columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card mb-r wow fadeIn" data-wow-delay="0.4s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.4s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/17.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*Second columnn*/}
        {/*Third columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card wow fadeIn" data-wow-delay="0.6s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.6s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/19.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*Third columnn*/}
      </div>
      {/*/.Second row*/}
      {/*Third row*/}
      <div className="row mb-4">
        {/*First columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card mb-r wow fadeIn" data-wow-delay="0.2s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.2s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*First columnn*/}
        {/*Second columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card mb-r wow fadeIn" data-wow-delay="0.4s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.4s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*Second columnn*/}
        {/*Third columnn*/}
        <div className="col-lg-4">
          {/*Card*/}
          <div className="card mb-r wow fadeIn" data-wow-delay="0.6s" style={{visibility: 'visible', animationName: 'fadeIn', animationDelay: '0.6s'}}>
            {/*Card image*/}
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/12.jpg" alt="Card image cap" />
            {/*Card content*/}
            <div className="card-body">
              {/*Title*/}
              <h4 className="card-title">
                <strong>This is title</strong>
              </h4>
              {/*Text*/}
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-blue-grey btn-md waves-effect waves-light">Read more</a>
            </div>
          </div>
          {/*/.Card*/}
        </div>
        {/*Third columnn*/}
      </div>
      {/*/.Third row*/}
      {/*Pagination dark grey*/}
      <div className="row flex-center">
        <nav>
          <ul className="pagination pg-darkgrey">
            {/*Arrow left*/}
            <li className="page-item">
              <a className="page-link waves-effect waves-effect" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {/*Numbers*/}
            <li className="page-item active">
              <a className="page-link waves-effect waves-effect">1</a>
            </li>
            <li className="page-item">
              <a className="page-link waves-effect waves-effect">2</a>
            </li>
            <li className="page-item">
              <a className="page-link waves-effect waves-effect">3</a>
            </li>
            <li className="page-item">
              <a className="page-link waves-effect waves-effect">4</a>
            </li>
            <li className="page-item">
              <a className="page-link waves-effect waves-effect">5</a>
            </li>
            {/*Arrow right*/}
            <li className="page-item">
              <a className="page-link waves-effect waves-effect" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/*/Pagination dark grey*/}
    </div>
    {/*/.Main layout*/}
  </main>
  {/*Footer*/}
  <footer className="page-footer center-on-small-only">
    {/*Footer links*/}
    <div className="container">
      <div className="row mt-4">
        {/*First column*/}
        <div className="col-lg-3 col-md-6">
          <h5 className="title mb-3">
            <strong>About material design</strong>
          </h5>
          <p>Material Design for Bootstrap (MDB) is a powerful Material Design UI KIT for most popular HTML, CSS,
            and JS framework - Bootstrap.</p>
        </div>
        {/*/.First column*/}
        <hr className="w-100 clearfix d-sm-none" />
        {/*Second column*/}
        <div className="col-lg-2 col-md-6 ml-auto">
          <h5 className="title mb-3">
            <strong>First column</strong>
          </h5>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        {/*/.Second column*/}
        <hr className="w-100 clearfix d-sm-none" />
        {/*Third column*/}
        <div className="col-lg-2 col-md-6 ml-auto">
          <h5 className="title mb-3">
            <strong>Second column</strong>
          </h5>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        {/*/.Third column*/}
        <hr className="w-100 clearfix d-sm-none" />
        {/*Fourth column*/}
        <div className="col-lg-2 col-md-6 ml-auto">
          <h5 className="title mb-3">
            <strong>Third column</strong>
          </h5>
          <ul>
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div>
        {/*/.Fourth column*/}
      </div>
    </div>
    {/*/.Footer links*/}
    <hr />
    {/*Call to action*/}
    <div className="call-to-action">
      <h4 className="mb-5">Material Design for Bootstrap</h4>
      <ul>
        <li>
          <h5>Get our UI KIT for free</h5>
        </li>
        <li>
          <a target="_blank" href="https://mdbootstrap.com/getting-started/" className="btn btn-primary waves-effect waves-light" rel="nofollow">Sign up!</a>
        </li>
        <li>
          <a target="_blank" href="https://mdbootstrap.com/material-design-for-bootstrap/" className="btn btn-deep-orange waves-effect waves-light" rel="nofollow">Learn more</a>
        </li>
      </ul>
    </div>
    {/*/.Call to action*/}
    {/*Copyright*/}
    <div className="footer-copyright">
      <div className="container-fluid">
        © 2015 Copyright:
        <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
      </div>
    </div>
    {/*/.Copyright*/}
  </footer>
  {/*/.Footer*/}
  {/* SCRIPTS */}
  {/* JQuery */}
  {/* Bootstrap dropdown */}
  {/* Bootstrap core JavaScript */}
  {/* MDB core JavaScript */}
  <div className="hiddendiv common" />
</div>

    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
