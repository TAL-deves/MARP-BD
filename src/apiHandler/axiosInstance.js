import axios from "axios";
import encryptData from "./utils/encryption";
import decryptData from "./utils/decryption";
import { errorCode } from "./errorHandler";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const encryption = process.env.REACT_APP_PUBLIC_ENCRYPTION || "FALSE";
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
      } 
      // else {
      //   console.log("config.data", config.data)
      //   config.data = {data: config.data };
      //   console.log("config.data 2", config.data)
      // }
      
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
        } 
        else {
          response.data.encoded = response.data.encoded;
        }
        
        
    return response.data.encoded;
  },
  (error) => {

    

    //! YOU CAN DIRECTLY HANDLE ERRORS HERE!!!
    // handleCommonErrors(error.response.data.encoded);
   
    // console.log("axios error", error.response.data.encoded.errMsg)
    // const navigate = useNavigate();
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: `${error.response.data.encoded.errMsg}`,
      // footer: '<a href="">Why do I have this issue?</a>'
    }).then((res)=>{
      if(res.isConfirmed){
        // window.location.reload()
        // navigate("/")
      }
    })
    return error.response.data.encoded;
  }
);

export default caxios;
