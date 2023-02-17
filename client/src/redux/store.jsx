import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import moviesReducer from "./movies/movies.reducer";

export const store = legacy_createStore(
  combineReducers({ movies: moviesReducer }),
  applyMiddleware(thunk)
);
