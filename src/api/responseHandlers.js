import Swal from "sweetalert2";

let customAlert = (code, message, text) => {
  Swal.fire({
    title: `${code} - ${message}`,
    text: text,
    icon: "error",
    confirmButtonText: "Done",
  })
};

const handleCommonErrors = (error) => {
  switch (error.error.code) {
    case 401:
      // Unauthorized
      // Handle unauthorized error
      customAlert(
        error.error.code,
        error.error.message,
        "Please check all credentials",
        "link"
      );

      break;
    case 404:
      // Not Found
      // Handle not found error
      alert(`${error.error.code} - ${error.error.message}\n${error.errMsg}`);
      break;
    case 500:
      // Internal Server Error
      // Handle internal server error
      alert(`${error.error.code} - ${error.error.message}\n${error.errMsg}`);
      break;
    default:
      // Handle other errors
      alert(`${error.error.code} - ${error.error.message}\n${error.errMsg}`);
      break;
  }
};

const handleSuccessResponse = (response) => {
  //   console.log("inside response ---", (response.encoded.success));
  if (response.encoded.success) {
    const { accessToken, refreshToken, user } = response.encoded.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", user.username);
  }
};

export { handleCommonErrors, handleSuccessResponse };
