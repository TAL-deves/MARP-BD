const CryptoJS = require("crypto-js");

// Define the encryption key and IV
const keyString = process.env.KEY_STRING || "thisIsAverySpecialSecretKey00000";
const IV = process.env.IV || "1583288699248111";

// Convert the key and IV to CryptoJS format
const key = CryptoJS.enc.Utf8.parse(keyString);
const iv = CryptoJS.enc.Utf8.parse(IV);

// Encryption function
const encryptData = (data) => {
//   console.log("data ----- ", data);
  const response = JSON.stringify(data);

  // Encrypt the request body using AES encryption
  const encrypted = CryptoJS.AES.encrypt(response, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Convert the encrypted data to a Base64-encoded string
  const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
//   console.log("encryptedBase64 ----- ", encryptedBase64);
  return encryptedBase64;
};

// export default encryptData;
module.exports = encryptData