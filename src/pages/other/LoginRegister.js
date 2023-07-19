import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { loginHandler, logoutHandler, postRequestHandler, putRequestHandler } from "../../apiHandler/customApiHandler";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';


const LoginRegister = () => {
  let { pathname } = useLocation();

  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // handle reg 
  async function handleRegistration() {
    setShow(true);
    try {
      const data = await postRequestHandler('/auth/signup', { email, phoneNumber, password });
      // Handle the response data
      if (data.success === true) {
        // window.location.reload()
        console.log("reg in", data)
        localStorage.setItem("uid", data.data.id)
        navigate("/verify")
      }
      setShow(false);
      console.log("reg response", data);
    } catch (error) {
      // Handle the error
      setShow(false);
      console.error(error);
    }
  }


  // handle login 
  let authorization = "application:secret";
  let grant_type = "password"
  async function handleLogin() {
    setShow(true);
    try {
      const data = await loginHandler('/auth/login', phoneNumber, password);
      // Handle the response data
      if (data.success === true) {
        navigate("/")
        console.log("logged in", data)
      }
      setShow(false);

      // else if (data.error.code === 401) {
      //   setShow(false)
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: `${data.errMsg}`,
      //     // footer: '<a href="">Why do I have this issue?</a>'
      //   })
      // }

      console.log("login response", data);
    } catch (error) {
      // Handle the error
      setShow(false);
      console.error(error);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   // text: `${error}`,
      //   text: `Server Error`,
      //   // footer: '<a href="">Why do I have this issue?</a>'
      // })
      // window.location.reload()

    }
  }
  // handle logout 
  // let accessTokenn= localStorage.getItem("accessToken")
  async function handleLogout() {

    try {
      const data = await logoutHandler('/auth/logout');
      
      if (data.success === true) {
        localStorage.removeItem("uid");
        window.location.reload()
        
      }
      console.log("logout response", data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  return (
    <Fragment>
      {/* <Modal class="spinner-border text-light" show={show}> */}
      {/* <Modal.Body style={{ backgroundColor: `transparent`, border:"none" }}>
          <h4>Backdrop Content</h4>
          <p>This is the backdrop content.</p>
        </Modal.Body> */}

      {/* </Modal> */}

      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Login Register", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="tel"
                                // name="phone"
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <input
                                type="password"
                                // name="user-password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  {/* <input type="checkbox" />
                                  <label className="ml-10">Remember me</label> */}
                                  <Link to={process.env.PUBLIC_URL + "/change-password"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                {localStorage.getItem("accessToken") !== null ?

                                  <button
                                    // type="submit"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleLogout();
                                    }}
                                  >
                                    
                                    {show ? <div class="spinner-border text-warning" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> : <span className="m-1">Logout</span>}
                                  </button>
                                  :
                                  <button
                                    className="d-flex align-items-center"
                                    // type="submit"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleLogin();
                                    }}
                                  >
                                    {show ? <div class="spinner-border text-warning" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> : <span className="m-1">Login</span>}
                                  </button>
                                }
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                // name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                type="tel"
                                // name="phone"
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <input
                                type="password"
                                // name="user-password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <button
                                  // type="submit" 
                                  onClick={(e) => {
                                    e.preventDefault(); handleRegistration()
                                  }}>

                                  {show ? <div class="spinner-border text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                  </div> : <span>Register</span>}
                                  
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
