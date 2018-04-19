import * as actionType from './ActionType';
import fileDownload from 'react-file-download';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function login(state){
    return function (dispatch) {
      let temp = {
        "username" : state.useroremail,
        "password": state.password
      }

      return axios.post("http://localhost:5000/login", temp).then((response) => {
        if( response.data.token){
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('username', response.data.username);
          dispatch({type:actionType.LOGIN_SUCCESS, payload: response.data})
			  }
      }).catch((err) => {
         dispatch({type:actionType.LOGIN_FAIL, payload: err.response.data})
      })
    }
}


export function registerUser(userdata) {
    return function (dispatch) {
        return axios.post("http://localhost:5000/registerUser", userdata)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('userId', res.data.userId);
                    dispatch({type: "SIGNUP_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERROR", payload: err.message})
            })
    }
}

//booking ticket [needs to be modified]
export function book(state){
    return function (dispatch) {
      let temp = {
        "username" : state.useroremail,
        "password": state.password
      }

      return axios.post("http://localhost:5000/login", temp).then((response) => {
        if( response.data.token){
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('username', response.data.username);
          dispatch({type:actionType.LOGIN_SUCCESS, payload: response.data})
			  }
      }).catch((err) => {
         dispatch({type:actionType.LOGIN_FAIL, payload: err.response.data})
      })
    }
}





