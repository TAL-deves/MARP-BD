import React, { Fragment, useState } from 'react'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import { Breadcrumb } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { postRequestHandler } from '../../apiHandler/customApiHandler';

function ChangePassword() {
    let { pathname } = useLocation();
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword]= useState("")
      // set new password 
  async function handleSetNewPassword() {
    
    try {
      const data = await postRequestHandler('https://marpapi.techanalyticaltd.com/auth/logout',password );
      // Handle the response data
      
       console.log("new pass response",data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of MARP Bangladesh"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  
                   
                    <div className="single-my-account mb-20">
                      
                      <div>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Your Password</h4>
                              
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input 
                                  type="password" 
                                  onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" 
                                  onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button 
                                // type="submit"
                                onClick={()=>{handleSetNewPassword()}}
                                >Continue</button>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>

                   
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

export default ChangePassword
