import axios from "axios";
import decryptData from "../utils/decryption";
import encryptData from "../utils/encryption";

class ErrorHandler extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const api = async (method, url, postdata) => {
  let data = {
    data: encryptData(postdata),
  };
  const config = {
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    let decoded = decryptData(response?.data?.encoded);
    return decoded;
  } catch (error) {
    if (error.response) {
      let decoded = JSON.parse(decryptData(error?.response?.data?.encoded));
      throw new ErrorHandler(decoded.error.message, decoded.error.code);
    } else {
      throw new ErrorHandler("Something went wrong", 500);
    }
  }
};

export default api;