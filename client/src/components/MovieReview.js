import React, {Component} from 'react';
import { getReviewsOfMovie,submitMovieComment} from '../actions';
import { connect } from 'react-redux';
import Rating from './Rating';
import MovieReviewList from './MovieReviewList';
import $ from 'jquery';
import axios from "axios/index";
import config from "../config";

const mapDispatchToProps = (dispatch) => {

    let actions = {submitMovieComment,getReviewsOfMovie};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      submitCommentState : state.movieReducer.submitCommentState
    };
  }


class MovieReview extends Component{

  constructor(props){
    super(props)
    this.state={
      commentError : false,
      submitCommentState : false,
      comment :'',
      star :null
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleSubmitCommentState = this.handleSubmitCommentState.bind(this);
    this.handleClickData = this.handleClickData.bind(this);
    this.getStar = this.getStar.bind(this);
  }

  getStar(star){
      this.setState({
        star : star
      })
  }

  handleClickData(){
    let componentData = {
                          component: "editprofile"
                        }
    axios.post(config.API_URL+'/logs/component_click',componentData);
  }

  handleSubmitComment(){
    let comment = this.refs.comment.value;
    let star = this.state.star;
    let userid = localStorage.getItem("userId");
    if(comment === '' && star ===null ){
      this.setState({
        commentError :true
      })
    }else{
      this.props.dispatch(this.props.submitMovieComment(this.props.movieid, userid,comment,star))
      .then(()=>this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid)))
      .then(() => this.setState({
        submitCommentState : this.props.submitCommentState,
        commentError : false
      }))
    }
  }

  handleSubmitCommentState(e){
    e.preventDefault();
    this.setState({
      submitCommentState: false,
      comment :''
    })
  }

  render(){

    return(
      <div className="comment-tabs col-md-7" onClick={this.handleClickData}>
        <ul className="nav nav nav-pills nav-fill dark-orange" id="movietabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" href="#reviews" role="tab" data-toggle="tab">
              <h4 class="reviews text-capitalize">Reviews</h4>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#add-comment" role="tab" data-toggle="tab" onClick={this.handleSubmitCommentState.bind(this)}>
              <h4 class="reviews text-capitalize">Add Review</h4>
            </a>
          </li>
        </ul>
        <hr/>
        <div className="tab-content">
          <div role="tabpanel" class="tab-pane fade-in active" id="reviews">
            <MovieReviewList movieid = {this.props.movieid} />
          </div>

          <div role="tabpanel" class="tab-pane fade" id="add-comment">
            {this.state.submitCommentState ?
            <div id="proposal-panel">
              <div className="BidProposal-alert alert alert-success">
                <strong>Your comment has been posted successfully!</strong>
              </div>
            </div>
            : null}

            {this.state.commentError ?
            <div id="proposal-panel">
              <div className="BidProposal-alert alert alert-success">
                <strong>Enter either a comment or a star !</strong>
              </div>
            </div>
            : null}


            <div  className="form-horizontal" id="commentForm" >
              <div className="form-group">
                <div className="row">
                  <div className="offset-md-2 col-md-8">
                    <strong className ="comment" >My Review</strong>
                    <strong className="pull-right comment">
                      <div className = "rating-review">
                        <Rating movieid = {this.props.movieid} addStar = {this.getStar}/>
                      </div>
                    </strong>
                      <textarea  ref = "comment"  className="form-control" name="addComment" id="addComment" rows="5">{this.state.comment}</textarea>
                      <button className="mt-4 form-control btn btn-success btn-circle text-uppercase"  id="submitComment" onClick = {this.handleSubmitComment}><span class="glyphicon glyphicon-send"></span> submit review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieReview)
