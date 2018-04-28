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

              <div className="card text-white bg-dark mb-3">
                <div class="card-header reviews">
                  {reviewers.comment} <div className = "offset-9">{reviewers.star!== null ? <Rating rating = {reviewers.star} disable = "true"/> : null }</div>

                    <ul class="media-date  reviews list-inline pull-right">
                      written by {reviewers.username} on &nbsp;
                      {new Date(reviewers.review_date).getDate()}-
                      {months[new Date(reviewers.review_date).getMonth()]}-
                     {new Date(reviewers.review_date).getFullYear()}
                    </ul>
                </div>
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
