import { combineReducers } from 'redux';

import home from '../containers/Home/reducer';

/*
// cross data handling between two reducers
crossSliceReducer = (state, action) => {
  switch(action.type) {
    case "SOME_SPECIAL_ACTION" : {
      return {
        home : handleSpecialCaseForA(state.a, action, state.b),
        another : sliceReducerB(state.b, action),
      }
    }
    default : return state;
  }
}

// Updating data between 2 levels of reducer states or use https://github.com/acdlite/reduce-reducers
rootParentReducer = (state, action) => {
  const intermediateState = rootReducer(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
}
*/

const rootReducer = combineReducers({ home });

export default rootReducer;
