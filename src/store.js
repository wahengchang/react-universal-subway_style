import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const sagaMiddleware = createSagaMiddleware();

export default (initState) => {
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  return store;
};
