import {
  GET_MOVIES,
  GET_MOVIES_ERROR,
  ADD_MOVIE,
  EDIT_MOVIE,
  GET_ACTORS,
  ADD_ACTOR,
  GET_PRODUCERS,
  ADD_PRODUCER,
  GET_PRODUCERS_ERROR,
  GET_ACTORS_ERROR,
  ADD_MOVIE_ERROR,
  EDIT_MOVIE_ERROR,
  ADD_ACTOR_ERROR,
  ADD_PRODUCER_ERROR,
} from "./movies.types";
import axios from "axios";
const url = "https://imdb-pltu.onrender.com";

export const getMovies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/movies`);
    console.log(res.data);
    return dispatch({ type: GET_MOVIES, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const getActors = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/actors`);
    console.log("redux", res.data);
    return dispatch({ type: GET_ACTORS, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_ACTORS_ERROR });
  }
};

export const getProducers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/producers`);
    console.log("redux", res.data);
    return dispatch({ type: GET_PRODUCERS, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_PRODUCERS_ERROR });
  }
};

export const addMovie = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/movies`, data);
    console.log(res.data);
    return dispatch({ type: ADD_MOVIE, payload: res.data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: ADD_MOVIE_ERROR });
  }
};

export const editMovie = (data, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`${url}/movies/${id}`, data);
    console.log(res.data);
    return dispatch({ type: EDIT_MOVIE, payload: res.data });
  } catch (error) {
    return dispatch({ type: EDIT_MOVIE_ERROR });
  }
};

export const addActor = (actor) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/actors`, actor);
    console.log(res.data);
    return dispatch({ type: ADD_ACTOR, payload: res.data });
  } catch (error) {
    return dispatch({ type: ADD_ACTOR_ERROR });
  }
};

export const addProducer = (producer) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/producers`, producer);
    console.log(res.data);
    return dispatch({ type: ADD_PRODUCER, payload: res.data });
  } catch (error) {
    return dispatch({ type: ADD_PRODUCER_ERROR });
  }
};
