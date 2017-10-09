import _ from 'lodash';
import { ACTION_VAR, FETCH_DATA } from './action';

const initState = {
  message: 'React Universal',
};

let ctr = 0;

const home = (state = initState, action) => {
  switch (action.type) {
    case ACTION_VAR:
      return _.assign({}, state, { data: action.data });
    case FETCH_DATA:
      return _.assign({}, state, { list: action.data });
    case 'INCREMENT': {
      ctr += 1;
      return _.assign({}, state, { counter: ctr });
    }
    default:
      return state;
  }
};

export default home;
