import * as actionType from '../actions/ActionType';

const defaultState = {
  moviefetcherror : undefined,
  movieReviewersErrorMessage : undefined,
  submitCommentState : false
}

export function movieReducer(state = defaultState, action){

  const newState = {...state};

  switch(action.type){

    case actionType.GET_MOVIE_DETAIL_SUCCESS : newState.moviedetail = action.payload.movie;  return newState;;
    case actionType.GET_MOVIE_DETAIL_FAILURE : newState.moviefetcherror = action.payload.message ;   return newState;
    case actionType.GET_MOVIE_REVIEWERS_SUCCESS : newState.movieReviewers = action.payload.movieReviewers ;
                                                  return newState;
    case actionType.SUBMIT_MOVIE_COMMENT_SUCCESS : newState.submitCommentState = action.payload.success ;   return newState;
    default : return newState;

  }

}
