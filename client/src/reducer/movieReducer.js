import * as actionType from '../actions/ActionType';

const defaultState = {
  moviefetcherror : undefined,
  movieReviewersErrorMessage : undefined
}

export function movieReducer(state = defaultState, action){

  const newState = {...state};

  switch(action.type){

    case actionType.GET_MOVIE_DETAIL_SUCCESS : newState.moviedetail = action.payload.movie;  return newState;;
    case actionType.GET_MOVIE_DETAIL_FAILURE : newState.moviefetcherror = action.payload.message ;   return newState;
    case actionType.GET_MOVIE_REVIEWERS_SUCCESS : newState.movieReviwers = action.payload.movieReviewers ;   return newState;
    case actionType.GET_MOVIE_REVIEWERS_FAILURE : newState.movieReviewersErrorMessage = action.payload.message ;   return newState;
    default : return newState;

  }

}
