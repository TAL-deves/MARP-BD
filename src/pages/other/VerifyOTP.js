import React, { Fragment, useState } from 'react'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import { Breadcrumb, Container, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { postRequestHandler } from '../../apiHandler/customApiHandler';
import Swal from 'sweetalert2';

function VerifyOTP() {
  let { pathname } = useLocation();
  const [OTP, setOTP] = useState()
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  let userId= localStorage.getItem("uid");
  // post OTP 
  async function handlePostOTP() {
    setShow(true)
    try {
        const response = await postRequestHandler('/auth/verification', { userId, OTP });
        // Handle the response data
        console.log("billing address response", response);
        if (response.success) {
          
          Swal.fire(
            
  'OTP Verified',
  'Please login!',
  'success'
          ).then((res)=>{
            if(res.isConfirmed){
              navigate("/login-register")
            }
          })
        }
        setShow(false)

    } catch (error) {
        // Handle the error
        console.error(error);
        setShow(false)
    }
}


   // resend OTP 
   async function handleResendOTP() {
    setShow(true)
    try {
        const response = await postRequestHandler('/auth/resendOTP', { userId, OTP });
        // Handle the response data
        console.log("billing address response", response);
        if (response.success) {
          

        }
        setShow(false)

    } catch (error) {
        // Handle the error
        console.error(error);
        setShow(false)
    }
}

  return (
    <Fragment>
      {show && (
        <div className="backdrop">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <SEO
        titleTemplate="About us"
        description="About page of MARP Bangladesh."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Order", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <div style={{height:"40vh"}}>
            <div className="billing-info">
              <label>Type your OTP sent to your email</label>
              <input
                value={OTP} type="number" onChange={(e) => setOTP(parseInt(e.target.value))} />
            </div>
            <style>
                                        {`
          .place-order > button {
            font-weight: 500;
            line-height: 1;
        
            z-index: 9;
        
            display: block;
        
            width: 100%;
            padding: 18px 20px;
        
            text-align: center;
            letter-spacing: 1px;
            text-transform: uppercase;
        
            color: #fff;
            border: none;
            border-radius: 50px;
            background: none;
            background-color: #6eab49;
            &:hover {
              background-color: #333;
            }
          }
        `}
                                    </style>
                                    <div className="place-order mt-25">
                                    <p onClick={handleResendOTP} style={{cursor:"pointer", color:"blue"}}>Resend OTP</p>
                                        <button
                                        onClick={() =>{handlePostOTP() }} className="btn-hover"
                                            disabled={!OTP}>Submit</button>
                                    </div>
                                    
          </div>
        </Container>
      </LayoutOne>
    </Fragment>
  )
}

export default VerifyOTP
