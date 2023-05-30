import axios from "axios";
import encryptData from "./utils/encryption";
import decryptData from "./utils/decryption";

const encryption = process.env.REACT_APP_PUBLIC_ENCRYPTION || "TRUE";
const baseURL = process.env.REACT_APP_PUBLIC_APIPOINT || "https://marpapi.techanalyticaltd.com"

const caxios = axios.create({
  baseURL: baseURL,
});

caxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;

    if (encryption === "TRUE") {
      if (config.method === "put" || config.method === "PUT") {
        config.data = { data: config.data };
      } else {
        config.data = { data: encryptData(config.data) };
      }
    } else {
      config.data = { data: config.data };
    }

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
    if (encryption === "TRUE") {
      response.data.encoded = JSON.parse(decryptData(response.data.encoded));
    } else {
      response.data.encoded = response.data.encoded;
    }

    return response.data.encoded;
  },
  (error) => {
    error.response.data.encoded =
      encryption === "TRUE"
        ? JSON.parse(decryptData(error.response.data.encoded))
        : error.response.data.encoded;

    //! YOU CAN DIRECTLY HANDLE ERRORS HERE!!!
    // handleCommonErrors(error.response.data.encoded);

    return error.response.data.encoded;
  }
);

export default caxios;
