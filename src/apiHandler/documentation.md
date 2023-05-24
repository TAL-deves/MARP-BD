### Instructions:
- donwload the whole folder
- install axios, crypto-js ``` npm i axios crypto-js ```
- in the .env file add these  
    ``` 
    process.env.NEXT_PUBLIC_ENCRYPTION;
    process.env.NEXT_PUBLIC_APIPOINT; 
    ```
- in the axiosInstanace.js file ``` encryption, baseURL ``` needs to be available. encryption can be either "TRUE" or "FALSE"
- the customApiHandler.js file contains all the get, post, put, delete, patch request handlers.
- available functions: getRequestHandler(url), postRequestHandler(url, body), loginHandler(url, phoneNumber, password), logoutHandler(url)

### Scope of improvement:
- Error handler can be implemented

example:
```
  const checkGet = async () => {
    let data = await getRequestHandler("/");
  };

  const checkPost = async () => {
    let data = await postRequestHandler("/auth/signup", {
      email: "manas@gmail.com",
      phoneNumber: "01515212628",
      password: "111111",
    });
  };

  const checkLogin = async () => {
    let url = "/auth/login";
    let phoneNumber = "015555555";
    let password = "111111";

    let data = await loginHandler(url, phoneNumber, password);

  };

  const checkAuth = async () => {
    let data = await getRequestHandler("/auth/authcheck");
  };
  const checkLogout = async () => {
    let data = await logoutHandler("/auth/logout");
  };

```
