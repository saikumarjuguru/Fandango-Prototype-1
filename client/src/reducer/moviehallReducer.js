import * as actionType from '../actions/ActionType';

const defaultState = {
}

export function moviehallReducer(state = defaultState, action){

  const newState = {...state};

  switch(action.type){
    case actionType.GET_MOVIE_HALL_TIMES_SUCCESS : newState.hallsWithSlot = action.payload.hallWithSlot; return newState;
    case actionType.GET_MOVIE_HALL_TIMES_FAILURE : newState.hallsWithSlot = action.payload.hallWithSlot; return newState;
    case actionType.GET_DETAIILS_REQUIRED_FOR_BOOKING : newState.hallAndSlotdetail = action.data
    default : return newState;
  }

}
