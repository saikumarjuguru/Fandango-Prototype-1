import * as actionType from './ActionType';
import fileDownload from 'react-file-download';
import axios from 'axios';
import config from '../config.js';
//axios.defaults.withCredentials = true;

export function login(state){
    return function (dispatch) {
      let temp = {
        "username" : state.useroremail,
        "password": state.password
      }

      return axios.post(config.API_URL+"/login", temp).then((response) => {
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


export function signup(userdata) {
    return function (dispatch) {
        return axios.post(config.API_URL+"/registerUser", userdata)
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
export function book(payload){
    return function (dispatch) {

      return axios.post(config.API_URL+"/billing", payload).then((response) => {
        if(response.data){
            console.log(response.data);
          dispatch({type:actionType.BOOKING_SUCCESS, payload: response.data})
			  }
      }).catch((err) => {
         dispatch({type:actionType.BOOKING_FAIL, payload: err.message})
      })
    }
}

export function getMovieDetail(movieID){
    return function (dispatch) {
        return axios.get("http://localhost:5000/movie/"+ movieID).then((response) => {
          if(response.data){
            dispatch({type:actionType.GET_MOVIE_DETAIL_SUCCESS, payload: response.data})
          }
        }).catch((err) => {
           dispatch({type:actionType.GET_MOVIE_DETAIL_FAILURE, payload: err.response.data})
        })
    }
}

export function starMovie(data){
    return function (dispatch) {
      return axios.post("http://localhost:5000/movie/star", data).then((response) => {
        if(response.data){
          dispatch({type:actionType.MOVIE_STAR_SUCCESS, payload: response.data})
        }
      }).catch((err) => {
         dispatch({type:actionType.MOVIE_STAR_FAILURE, payload: err.response.data})
      })
    }
}

export function getReviewsOfMovie(movieid){
  return function (dispatch) {
    return axios.get("http://localhost:5000/movie/review/"+ movieid).then((response) => {
      if(response.data){
        dispatch({type:actionType.GET_MOVIE_REVIEWERS_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.GET_MOVIE_REVIEWERS_FAILURE, payload: err.response.data})
    })
  }
}
