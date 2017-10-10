import { combineReducers } from 'redux';

import home from '../containers/Home/reducer';

const rootReducer = combineReducers({
  home,
});

export default rootReducer;
