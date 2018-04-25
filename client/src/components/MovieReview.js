import React, {Component} from 'react';
import { getReviewsOfMovie,submitMovieComment} from '../actions';
import { connect } from 'react-redux';
import Rating from './Rating';
import MovieReviewList from './MovieReviewList';

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
      comment :''
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleSubmitCommentState = this.handleSubmitCommentState.bind(this);
  }


  handleSubmitComment(){
    let comment = this.refs.comment.value;
    let userid = 1; //needs to be changed
    if(comment === ''){
      this.setState({
        commentError :true
      })
    }else{
      this.props.dispatch(this.props.submitMovieComment(this.props.movieid, userid,comment))
      .then(()=>this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid)))
      .then(() => this.setState({
        submitCommentState : this.props.submitCommentState
      }))
    }
  }

  handleSubmitCommentState(){
    this.setState({
      submitCommentState: false,
      comment :''
    })
  }

  render(){

    return(

      <div class="comment-tabs col-md-7">
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#comments-logout" role="tab" data-toggle="tab"><h4 class="reviews text-capitalize">Reviews</h4></a></li>
                <li><a href="#add-comment" role="tab" data-toggle="tab" onClick = {this.handleSubmitCommentState}><h4 class="reviews text-capitalize">Add Review</h4></a></li>
            </ul>

            <div class="tab-content">
                  <MovieReviewList movieid = {this.props.movieid} />
                  <div class="tab-pane" id="add-comment">
                  {this.state.submitCommentState ? <div id="proposal-panel">
                  <div className="BidProposal-alert alert alert-success">
                          <strong>Your comment has been posted successfully!</strong>
                    </div>
                </div> : null}
                    <div  class="form-horizontal" id="commentForm" >
                        <div class="form-group">
                            <strong for="email" className ="pull-left comment col-sm-2" >Review Comments</strong>
                            <strong  class="pull-right comment col-sm-3">Star
                              <div className = "rating-review"><Rating movieid = {this.props.movieid}/></div>
                            </strong>

                          <br/>
                            <div class="col-sm-7">
                              <textarea  ref = "comment"  class="form-control" name="addComment" id="addComment" rows="5">{this.state.comment}</textarea>
                                <button class="mt-4 form-control btn btn-success btn-circle text-uppercase"  id="submitComment" onClick = {this.handleSubmitComment}><span class="glyphicon glyphicon-send"></span> Summit comment</button>
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
