import caxios from "./customAxios";
import { handleCommonErrors, handleSuccessResponse } from "./responseHandlers";
import Swal from "sweetalert2";

export const login = async (
  authUsername,
  authPass,
  grantType,
  phoneNumber,
  password
) => {
  //   const bdPhoneNumberRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
  const bdPhoneNumberRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  const passwordRegex = /^.{6,}$/;

  // if (!bdPhoneNumberRegex.test(phoneNumber)) {
  //   Swal.fire({
  //     title: `Validation Error!`,
  //     text: "Invalid phone number. Please enter a valid Bangladeshi phone number.",
  //     icon: "error",
  //     confirmButtonText: "Done",
  //   });
  //   return;
  // }

  if (!passwordRegex.test(password)) {
    Swal.fire({
      title: `Validation Error!`,
      text: "Password must be at least 6 characters long.",
      icon: "error",
      confirmButtonText: "Done",
    });
    return;
  }
  let loginData = await caxios.post("/auth/login", {
    authorization: `${authUsername}:${authPass}`,
    grant_type: grantType,
    phoneNumber: phoneNumber,
    password: password,
  });

  handleSuccessResponse(loginData);

  return loginData;
};

export const getRequest = async (url) => {
  return capi("get", url, null);
};

export const postRequest = async (url, body) => {
  return capi("post", url, body);
};

export const putRequest = async (url, body) => {
  return capi("put", url, body);
};
export const patchRequest = async (url, body) => {
  return capi("patch", url, body);
};

export const delRequest = async (url, body) => {
  return capi("delete", url, body);
};

const capi = async (method, url, body) => {
  let config = {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    data: {
      ...body,
    },
  };
  let capiData = await caxios.request(config);

  return capiData;
};
