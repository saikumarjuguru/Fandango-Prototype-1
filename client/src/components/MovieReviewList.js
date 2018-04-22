import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getReviewsOfMovie} from '../actions';
import Rating from './Rating';

const mapDispatchToProps = (dispatch) => {

    let actions = {getReviewsOfMovie};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      movieReviewers : state.movieReducer.movieReviewers,
      movieReviewersErrorMessage : state.movieReducer.movieReviewersErrorMessage
    };
  }


class MovieReviewList extends Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.movieReviewers.length !== this.props.movieReviewers.length){
      this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid))
    }
  }

  componentDidMount(){
    this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid))
  }


  static defaultProps = {
    movieReviewers :[]
  }



  render(){
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return(
      <div class="tab-pane active" id="comments-logout">
        <ul class="media-list">
        {this.props.movieReviewers.map(reviewers =>

          <li class="media">
            <div class="media-body">
              <div class="well well-sm well-review">
                  <h4 class="media-heading text-uppercase reviews">{reviewers.username} </h4>
                    {reviewers.star!== null ? <Rating rating = {reviewers.star} disable = "true"/> : null }
                    {/*<span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>*/}
                  <ul class="media-date text-uppercase reviews list-inline pull-right">
                    <li class="dd">{new Date(reviewers.review_date).getDate()}</li>
                    <li class="mm">{months[new Date(reviewers.review_date).getMonth()]}</li>
                    <li class="aaaa">{new Date(reviewers.review_date).getFullYear()}</li>
                  </ul>
                  <p class="media-comment">
                    {reviewers.comment}
                  </p>
              </div>
            </div>

          </li>
        )}


        </ul>
      </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieReviewList)
