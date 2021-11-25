import axios from "axios";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     'X-Requested-With': 'XMLHttpRequest',
  // },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // if (config.method !== "post")
    config.params["api-key"] = process.env.REACT_APP_API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

function interceptSuccess(response) {
  // success interception logic here
  return response;
}

function interceptError(error) {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    toast.error(error.response.data.message);
    console.log(error.response);
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log("Error", error.message);
  }

  return Promise.reject(error);
}

// interceptors
axiosInstance.interceptors.response.use(interceptSuccess, interceptError);

export default axiosInstance;
