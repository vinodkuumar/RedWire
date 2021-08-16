import {combineReducers} from 'redux';
import auth from './auth_reducers';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  auth,
  news: newsReducer,
});

export default rootReducer;
