import React, {Component} from 'react';
import { getReviewsOfMovie } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {

    let actions = {getReviewsOfMovie};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      movieReviewers : state.movieReducer.movieReviwers,
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

  static defaultProps = {
    movieReviewers :[]
  }

  render(){
    return(

      <div class="comment-tabs">
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#comments-logout" role="tab" data-toggle="tab"><h4 class="reviews text-capitalize">Reviews</h4></a></li>
                <li><a href="#add-comment" role="tab" data-toggle="tab"><h4 class="reviews text-capitalize">Add Review</h4></a></li>
            </ul>
            <div class="tab-content">
                  <div class="tab-pane active" id="comments-logout">
                    <ul class="media-list">
                    {this.props.movieReviewers.map(reviewers =>

                      <li class="media">
                        <div class="media-body">
                          <div class="well well-lg">
                              <h4 class="media-heading text-uppercase reviews">{reviewers.username} </h4>

                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                              <ul class="media-date text-uppercase reviews list-inline pull-right">
                                <li class="dd">22</li>
                                <li class="mm">09</li>
                                <li class="aaaa">2014</li>
                              </ul>
                              <p class="media-comment">
                                {reviewers.comment}rtrtrt
                              </p>
                          </div>
                        </div>

                      </li>
                    )}


                    </ul>
                  </div>
                  <div class="tab-pane" id="add-comment">
                    <form action="#" method="post" class="form-horizontal" id="commentForm" role="form">
                        <div class="form-group">
                            <label for="email" class="col-sm-2 control-label">Review Comments</label>
                            <div class="col-sm-10">
                              <textarea class="form-control" name="addComment" id="addComment" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button class="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment"><span class="glyphicon glyphicon-send"></span> Summit comment</button>
                            </div>
                        </div>
                    </form>
                  </div>

            </div>
      </div>




    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MovieReviewList)
