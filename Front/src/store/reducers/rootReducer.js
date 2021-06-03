import { combineReducers } from 'redux';
import userReducer from './userReducer';
import trailReducer from './trailReducer';
import reviewReducer from './reviewReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trail: trailReducer,
  review: reviewReducer,
  loading: loadingReducer,
});

export default rootReducer;
