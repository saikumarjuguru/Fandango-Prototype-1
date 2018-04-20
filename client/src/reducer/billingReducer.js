import * as actionType from '../actions/ActionType';

const defaultState = {

}

export function billingReducer(state = defaultState, action){
 
  const newState = {...state};
  switch(action.type){
    
    case actionType.BOOKING_SUCCESS : newState.booking = action.payload.success;
                                    return newState;

    case actionType.BOOKING_FAIL : newState.booking = action.payload;
                                 return newState;

    default :  return newState;


  }

}
