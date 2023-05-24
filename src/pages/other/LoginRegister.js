import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { loginHandler, logoutHandler, postRequestHandler } from "../../apiHandler/customApiHandler";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail]= useState("")
  const [phoneNumber, setPhoneNumber] =useState("")
  const [password, setPassword]= useState("")

  // handle reg 
  async function handleRegistration() {
    try {
      const data = await postRequestHandler('https://marpapi.lonewolfdays.site/auth/signup',{email, phoneNumber, password} );
      // Handle the response data
      
      console.log("reg response",data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }


  // handle login 
  let authorization= "application:secret";
  let grant_type="password"
  async function handleLogin() {
    try {
      const data = await loginHandler('/auth/login', phoneNumber, password );
      // Handle the response data
      // localStorage.setItem("accessToken", data.data.accessToken)
      // localStorage.setItem("refreshToken", data.data.refreshToken)
      // localStorage.setItem("user", data.data.user)
       navigate("/")
      console.log("reg response",data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  // handle logout 
  // let accessTokenn= localStorage.getItem("accessToken")
    async function handleLogout() {
      
      try {
        const data = await logoutHandler('/auth/logout' );
        // Handle the response data
        // localStorage.removeItem("accessToken")
        // localStorage.removeItem("refreshToken")
        // localStorage.removeItem("user")
        console.log("logout response",data);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }


  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login Register", path: process.env.PUBLIC_URL + pathname }
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
                                type="number"
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
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/change-password"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                {localStorage.getItem("accessToken")!==null?
                               
                                <button 
                                // type="submit"
                                onClick={(e)=>{
                                  e.preventDefault();
                                  handleLogout();
                                }}
                                >
                                  <span>Logout</span>
                                </button>
                                 : 
                                <button 
                                // type="submit"
                                onClick={(e)=>{
                                  e.preventDefault();
                                  handleLogin();
                                }}
                                >
                                  <span>Login</span>
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
                                type="number"
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
                                onClick={(e)=>{
                                  e.preventDefault();handleRegistration()}}>
                                  <span>Register</span>
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
