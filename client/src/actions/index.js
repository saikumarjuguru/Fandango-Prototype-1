import * as actionType from './ActionType';
import fileDownload from 'react-file-download';
import axios from 'axios';
import config from '../config.js';
//axios.defaults.withCredentials = true;

export function login(state){
    return function (dispatch) {
        let temp = {
            "username" : state.userdata.emailorusername,
            "password": state.userdata.password
        }

        return axios.post(config.API_URL+"/login", temp).then((response) => {
            if( response.data.value){
                localStorage.setItem('userId', response.data.value.userDetails.user_id);
                dispatch({type:actionType.LOGIN_SUCCESS, payload: response.data.value})
            }
        }).catch((err) => {
            dispatch({type:actionType.LOGIN_FAIL, payload: err.response.data})
        })
    }
}


export function signup(userdata) {
    return function (dispatch) {
        return axios.post(config.API_URL+"/signup", userdata)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('userId', res.data.user_id);
                    dispatch({type: "SIGNUP_SUCCESS", payload: res.data})
                }
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERROR", payload: err.response.data})
            })
    }
}

export function requestAuth(state){
    return function (dispatch) {
        let temp = {
        };
        return axios.post(config.API_URL+"/auth", temp).then((response) => {
            dispatch({type:"authSuccess", payload: response.data})
        }).catch((err) => {
            dispatch({type:"authFailed", payload: err.response.data})
        })
    }
}

export function requestLogout(state){
    return function (dispatch) {
        return axios.get(config.API_URL+"/logout").then((response) => {
            dispatch({type:"logoutSuccess", payload: response.data})
        }).catch((err) => {
            dispatch({type:"logoutFailed", payload: err.response.data})
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


export function submitMovieComment(movieid,userid,comment){
  let data ={
    movieid : movieid,
    comment : comment,
    userid :userid
  }
  return function (dispatch) {
    return axios.post("http://localhost:5000/movie/review", data).then((response) => {
      if(response.data){
        dispatch({type:actionType.SUBMIT_MOVIE_COMMENT_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.SUBMIT_MOVIE_COMMENT_FAILURE, payload: err.response.data})
    })
  }
}

export function getMovieHallsAndTimes(movieid){
  return function (dispatch) {
    return axios.get("http://localhost:5000/movie_hall"+ movieid).then((response) => {
      if(response.data){
        dispatch({type:actionType.GET_MOVIE_HALL_TIMES_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.GET_MOVIE_HALL_TIMES_FAILURE, payload: err.response.data})
    })
  }
}
