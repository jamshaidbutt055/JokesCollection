import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";
import { Jokes } from "../constants/jokes.constants";

export const getRandomResult = (options) => {
  return (dispatch) => {
    try {
      axiosInstance
        .get(options.type + "/random", {
          params: options.params,
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: Jokes.GET_RANDOM_RESULTS,
              payload: [response.data],
            });
          }
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
};

export const getSearchResult = (options) => {
  return (dispatch) => {
    try {
      axiosInstance
        .get(options.type + "/search", {
          params: options.params,
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: Jokes.GET_SEARCH_RESULTS,
              payload:
                response.data[options.type === "gif" ? "images" : options.type],
            });
          }
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
};
