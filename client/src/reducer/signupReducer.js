import * as actionType from '../actions/ActionType';

const defaultState = {
    status :false,
    message :"",
    userId : "fandando",
    userDetails:""
}

export function signupReducer(state = defaultState, action){

    const newState = {...state};
    switch(action.type){

        case actionType.SIGNUP_SUCCESS :
            newState.status = action.payload.success;
            newState.message = action.payload.message;
            newState.userId=action.payload.userId;
            newState.userDetails = action.payload.userDetails[0];
            return newState;

        case actionType.SIGNUP_ERROR :
            newState.status = action.payload.success;
            newState.message = action.payload.message;
            return newState;

        default :  return newState;


    }

}
