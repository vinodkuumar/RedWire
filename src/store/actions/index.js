import * as api from '../api';

export const registerUser = (values) => ({
    type: 'AUTH_USER',
    payload: api.registerUser(values)
})

export const loginUser = (values) => ({
    type: 'AUTH_USER',
    payload: api.loginUser(values)
})

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
        'https://newsapi.org/v2/everything?q=tesla&from=2021-07-16&sortBy=publishedAt&apiKey=864022f18f974c47b1d42a483cbdff25',
      );
      const resultData = await result.json()
      console.log('news data = ',resultData);
  
      dispatch({
        type: 'FETCH_ARTICLES',
        payload: resultData,
      });
    };
  };