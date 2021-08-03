import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { searchTypeReducer } from '../adapters/redux';
import { SearchType } from '../entities';

export type StateType = {
  searchType: SearchType;
};

const reducers = {
  searchType: searchTypeReducer,
};

/**
 * Function to configure store
 *
 * @returns
 */
export const configureStore = () => {
  const middleware: any = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  return createStore(combineReducers(reducers), applyMiddleware(...middleware));
};
