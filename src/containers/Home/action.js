export const ACTION_VAR = 'ACTION_VAR';
export const FETCH_DATA = 'FETCH_DATA';
export const DUMMY = 'DUMMY';

export const fetchData = () => {
  const data = 'Subway Style';
  return { type: ACTION_VAR, data };
};

export const asyncAction = list =>
  (dispatch) => {
    dispatch({ type: ACTION_VAR, data: list });
    return null;
  };
