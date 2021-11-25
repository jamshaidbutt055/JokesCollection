import { Jokes } from "../constants/jokes.constants";

const initialState = { queryResult: [] };

export const jokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Jokes.GET_SEARCH_RESULTS:
      return {
        ...state,
        queryResult: action.payload,
      };
    case Jokes.GET_RANDOM_RESULTS:
      return {
        ...state,
        queryResult: action.payload,
      };
    default:
      return state;
  }
};
