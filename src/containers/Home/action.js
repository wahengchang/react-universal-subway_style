export const FETCH_DATA = 'FETCH_DATA';
export const FETCHED_JWT = 'FETCHED_JWT';

export const fetchData = () => {
  const data = 'Subway Style';
  return { type: FETCH_DATA, data };
};
