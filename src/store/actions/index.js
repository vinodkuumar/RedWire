import * as api from '../api';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId,token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token
  }
}

export const registerUser = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAx3HQexDskPQ_pb_h2o2xMQ9Ea8u0tx9I',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
        const errorResData = await response.json()
        const errorId = errorResData.error.message;
        let message = 'Something Went Wrong'
        if(errorId === 'EMAIL_EXISTS'){
            message = 'This email exists already'
        }
        throw new Error(message)
    }  
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId,resData.idToken))
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
  };
};

export const loginUser = (email,password) => {
  return async dispatch => {
      const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAx3HQexDskPQ_pb_h2o2xMQ9Ea8u0tx9I',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true
              })
          }
      )
      if(!response.ok){
          const errorResData = await response.json()
          console.log(errorResData)
          const errorId = errorResData.error.message
          console.log(errorId)
          let message = 'Something Went Wrong'
          if(errorId === 'EMAIL_NOT_FOUND'){
              message = 'This email could not be found'
          }
          else if(errorId === 'INVALID_PASSWORD'){
              message = 'This password is not valid'
          }
          throw new Error(message);
      }
      const resData = await response.json()
      console.log(resData)
      dispatch(authenticate(resData.localId,resData.idToken))
      const expirationDate = new Date(
          new Date().getTime() + parseInt(resData.expiresIn) * 1000
      )
      saveDataToStorage(resData.idToken,resData.localId,expirationDate)
  }
}

const saveDataToStorage = (token,userId,expirationDate) => {
  AsyncStorage.setItem(
      'userData',
      JSON.stringify({
          token: token,
          userId: userId,
          expiryDate: expirationDate.toISOString()
      })
  )
}

export const autoSignIn = () => ({
    type: 'AUTH_USER',
    payload: api.autoSignIn()
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
    payload: api.logoutUser()
})

export const updateUserData = (values,user) => ({
    type: 'UPD_USER_DATA',
    payload: api.updateUserData(values,user)
})

export const clearAuthError = () => ({
    type: 'CLEAR_AUTH_ERROR'
})

export const fetchArticles = () => {
    return async dispatch => {
      //login to fetch data using api
      const result = await fetch(
        'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=864022f18f974c47b1d42a483cbdff25',
      );
      const resultData = await result.json()
    //  console.log('news data = ',resultData);
  
      dispatch({
        type: 'FETCH_ARTICLES',
        payload: resultData,
      });
    };
  };

const MAX_RESULT = 15;
const PLAYLIST_ID = "PLcDaXGnNU58bmEbkYNUHsrLMF6a_AqjF9";
const API_KEY= "AIzaSyBVBzOASEl7eq50CM085LUoMYEnDP6WMCI"

  export const fetchVideos = () => {
      return async dispatch => {
          const result = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${PLAYLIST_ID}&maxResults=${MAX_RESULT}&part=snippet%2CcontentDetails&key=${API_KEY}`
              );
          const resultData = await result.json()
        //   console.log('videos data = ',resultData);
          dispatch ({
              type: 'FETCH_VIDEOS',
              payload: resultData
          })
      }
  }

  export const toggleFavourites = url => {
    return {
      type: 'TOGGLE_FAVOURITES',
      payload: url
    }
  }