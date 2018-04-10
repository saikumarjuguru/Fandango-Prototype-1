import * as actionType from '../actions/ActionType';

const defaultState = {
  loginStatus :false,
  loginMsg :"",
  username : "fandando"
}

export function loginReducer(state = defaultState, action){

  const newState = {...state};
  switch(action.type){

    case actionType.LOGIN_SUCCESS : newState.loginStatus = action.payload.success;
                                    newState.loginMsg = "Success!";
                                    newState.username=action.payload.username;
                                    return newState;

    case actionType.LOGIN_FAIL : newState.loginStatus = action.payload.success;
                                 newState.loginMsg = action.payload.message;
                                 return newState;

    default :  return newState;


  }

}
