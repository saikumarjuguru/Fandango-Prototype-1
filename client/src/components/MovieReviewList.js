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

  componentDidUpdate(prevProps) {
    let {match} = this.props;
    if((prevProps.movieid !== this.props.movieid)){
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
      <div className="tab-pane active" id="comments-logout">
      {this.props.movieReviewers !== undefined && this.props.movieReviewers.length >0 ?
        <ul className="media-list">
          {this.props.movieReviewers.map(reviewers =>

          <li className="media">
            <div className="media-body">

              <div className="card text-white bg-dark mb-3">
                <div className="card-header reviews">
                  {reviewers.comment} <div className = "offset-9">{reviewers.star!== null ? <Rating rating = {reviewers.star} disable = "true"/> : null }</div>

                    <ul className="media-date  reviews list-inline pull-right">
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


      </ul> : <div>  <strong className="text-warning">{this.props.movieReviewersErrorMessage}</strong></div>}
      </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieReviewList)
