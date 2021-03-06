import { AUTHENTICATE } from "../api";

const INITIAL_STATE = {
  // user: [],
  // isAuth: false,
  // error: null,
  token: null,
  userId: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      }
    // case 'AUTH_USER':
    //   return {...state, ...action.payload};
    // case 'LOGOUT_USER':
    //   return {...state, user: [], isAuth: false};
    // case 'CLEAR_AUTH_ERROR':
    //   return {...state, error: null};
    case 'UPD_USER_DATA':
      return {...state, ...action.payload};
    default:
      return state;
  }
}
