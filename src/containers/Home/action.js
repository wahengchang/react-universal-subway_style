export const ACTION_VAR = 'ACTION_VAR';
export const FETCH_DATA = 'FETCH_DATA';
export const DUMMY = 'DUMMY';
export const JWT_VERIFY = 'JWT_VERIFY';
export const FETCHED_JWT = 'FETCHED_JWT';

export const fetchData = () => {
  const data = 'Subway Style';
  return { type: ACTION_VAR, data };
};

export const jwtDispatch = () => ({ type: JWT_VERIFY });

export const asyncAction = list =>
  (dispatch) => {
    dispatch({ type: ACTION_VAR, data: list });
    return null;
  };
