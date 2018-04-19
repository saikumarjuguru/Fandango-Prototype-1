import * as actionType from '../actions/ActionType';

const defaultState = {

}

export function billingReducer(state = defaultState, action){

  const newState = {...state};
  switch(action.type){

    case actionType.BOOKING_SUCCESS : newState.booking = action.payload.message;
                                    // newState.loginMsg = "Success!";
                                    // newState.username=action.payload.username;
                                    return newState;

    case actionType.BOOKING_FAIL : newState.booking = action.payload.message;
                                 return newState;

    default :  return newState;


  }

}
