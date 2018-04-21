import * as actionType from '../actions/ActionType';

const defaultState = {

}

export function billingReducer(state = defaultState, action){
 console.log(action.payload);
  const newState = {...state};
  switch(action.type){
    
    case actionType.BOOKING_SUCCESS : newState.booking = action.payload.success;
                                    return newState;

    case actionType.BOOKING_FAIL : newState.booking = action.payload.success;
                                 return newState;

    default :  return newState;


  }

}
