import _ from 'lodash';
import { FETCH_DATA, FETCHED_JWT } from './action';

const initState = {
  message: 'React Universal',
};

const home = (state = initState, action) => {
  switch (action.type) {
    case FETCHED_JWT:
      return _.assign({}, state, { jwtdata: action.data });
    case FETCH_DATA:
      return _.assign({}, state, { data: action.data });
    default:
      return state;
  }
};

export default home;
