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

const initState = {
  movies: [],
  actors: [],
  producers: [],
};

export default function moviesReducer(state = initState, { type, payload }) {
  switch (type) {
    case GET_MOVIES: {
      return { ...state, movies: payload };
    }
    case ADD_MOVIE: {
      return { ...state, movies: [...state.movies, payload] };
    }
    case EDIT_MOVIE: {
      let temp = movies.filter((e) => {
        if (e._id == payload.movie._id) {
          return payload.movie;
        } else {
          return e;
        }
      });
      return { ...state, movies: [...temp] };
    }
    case GET_ACTORS: {
      return { ...state, actors: [...payload] };
    }
    case ADD_ACTOR: {
      return { ...state, actors: [...state.actors, payload] };
    }
    case GET_PRODUCERS: {
      return { ...state, producers: [...payload] };
    }
    case ADD_PRODUCER: {
      return { ...state, producers: [...state.producers, payload] };
    }
    default:
      return state;
  }
}
