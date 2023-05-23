// axios-handler.js

import axios from "axios";
import encryptData from "./utils/encryption";
import decryptData from "./utils/decryption";
import { handleCommonErrors } from "./responseHandlers";

const encryption = "TRUE";

// Create a new instance of axios
const caxios = axios.create({
  baseURL: "https://marpapi.lonewolfdays.site",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
caxios.interceptors.request.use(
  (config) => {
    // Modify the request config here, if needed

    config.data =
      encryption === "TRUE"
        ? { data: encryptData(config.data) }
        : { data: config.data };

    return config;
  },
  (error) => {
    // Handle request errors here, if needed
    return Promise.reject(error);
  }
);

// Add a response interceptor
caxios.interceptors.response.use(
  (response) => {
    // Handle response data here, if needed

    response.data.encoded =
      encryption === "TRUE"
        ? JSON.parse(decryptData(response.data.encoded))
        : response.data.encoded;
    return response.data;
  },
  (error) => {
    // Handle response errors here, if needed

    error.response.data.encoded =
      encryption === "TRUE"
        ? JSON.parse(decryptData(error.response.data.encoded))
        : error.response.data.encoded;

    handleCommonErrors(error.response.data.encoded);

    return error.response.data;
  }
);
// Export the configured axios instance
export default caxios;
