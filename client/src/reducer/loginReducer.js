import * as actionType from '../actions/ActionType';

const defaultState = {
    status :false,
    message :"",
    userId : "fandando",
    userDetails:"",
    isAuthentic: false

}

export function loginReducer(state = defaultState, action){

    const newState = {...state};
    switch(action.type){

        case actionType.LOGIN_SUCCESS : newState.status = action.payload.success;
            newState.message = action.payload.message;
            newState.userId=action.payload.userDetails.user_id;
            newState.userDetails = action.payload.userDetails;
            return newState;

        case actionType.LOGIN_FAIL : newState.status = action.payload.success;
            newState.message = action.payload.message;
            return newState;

        case 'authSuccess':
            newState.isAuthentic= true;
            return newState;

        case 'authFailed':
            newState.isAuthentic= false;
            return newState;

        case 'logoutSuccess':
            newState.status = false;
            newState.isAuthentic= false;
            return newState;

        case 'logoutFailed':
            newState.isAuthentic= true;
            return newState;

        default :  return newState;
    }

}
