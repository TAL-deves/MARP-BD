import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Modal } from 'react-bootstrap';

import { getRequestHandler, patchRequestHandler, postRequestHandler, putRequestHandler } from "../../apiHandler/customApiHandler";
import axios from "axios";

const MyAccount = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [age, setAge] = useState()
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [maritualStatus, setMaritualStatus] = useState("")
  const [additionalData, setAdditionalData] = useState()
  const [nomineeData, setNomineeData] = useState()
  // const [DOB , setDOB]=useState("")
  const [DOB, setDOB] = useState("1987-10-11T00:00:00.000Z")
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [showModal, setShowModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  
  // set get profile

  async function handleAuthCheck() {

    try {
      const data = await getRequestHandler('/auth/authcheck');
      // Handle the response data
      console.log("auth check response", data);
      if(data.error.code===401){
        localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      navigate("/")
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }



  // set new password 
  let accessToken = localStorage.getItem("accessToken")
  async function handleSetNewPassword() {

    try {
      const data = await patchRequestHandler('http://localhost:5001/user/profile/updatepassword', password);
      // Handle the response data
      console.log("new pass response", data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }


  // set update profile

  async function handleUpdateProfile() {

    try {
      const data = await postRequestHandler('/user/profile', {
        fullName,
        age,
        address,
        gender,
        maritualStatus,
        additionalData,
        nomineeData,
        DOB
      });
      // Handle the response data
      console.log("new update profile response", data);

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  // set get profile

  async function handleGetProfile() {

    try {
      const data = await getRequestHandler('/user/profile');
      // Handle the response data
      console.log("get profile response", data);
      setFullName(data.data.profile.fullName)
      setAge(data.data.profile.age)
      setAddress(data.data.profile.address)
      setGender(data.data.profile.gender)
      setMaritualStatus(data.data.profile.maritualStatus)
      setDOB(data.data.profile.DOB)
      setImage(data.data.profile.profilePhotoBucketURL)
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  
  // photo upload 
  async function handleUploadPhoto() {
    setShow(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);

      let data = await putRequestHandler(formData);
      if (data.success === true) {
        window.location.reload()
        setShow(false);
      }
      console.log("put request ----- ", data);
      //  window.location.reload()
    }

  }
  
  useEffect(() => {
    handleGetProfile()
    handleAuthCheck()
  }, [])

  // async function handleUpdateProfile() {

  //   try {
  //     const data = await postRequest('https://marpapi.lonewolfdays.site/user/profile');
  //     // Handle the response data
  //     console.log("new update profile response",data);

  //   } catch (error) {
  //     // Handle the error
  //     console.error(error);
  //   }
  // }

  // Handle date selection
  const handleDateChange = (event) => {
    const selectedDate = event.target.value + ":00.000Z";
    setDOB(selectedDate);

  };




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
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-50">
          <div className="container">
            <div className="text-center m-5 d-flex flex-column align-items-center" >
              {image ?
                <img height="300px" width="300px" src={image} alt="" />
                :
                <img height="300px" width="300px" src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" />
              }
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    Select Image
                  </div>
                  <input type="file" accept=".jpg,.jpeg,.png,.gif" onChange={handleChange}                  
                  />
                  {/* <div className="text-center m-2">
                    {selectedFile?
                    <img height="200px" width="200px" src={selectedFile.name} alt="" />:
                    <img height="200px" width="200px" src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" />
                    }
                  </div> */}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalClose}>
                    Close
                  </Button>
                  
                  {show ? <div class="spinner-border text-warning" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> : <Button variant="primary" onClick={handleUploadPhoto}>Upload</Button>}
                  
                </Modal.Footer>
              </Modal>
              {image ?
                <Button className="m-2" onClick={handleModalOpen}>Change Image</Button>
                :
                <Button className="m-2" onClick={handleModalOpen}>Upload Image</Button>
              }

            </div>
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Full Name</label>
                                <input value={fullName} type="text" onChange={(e) => setFullName(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Age</label>
                                <input value={age} type="number" onChange={(e) => setAge(parseInt(e.target.value))} />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Address</label>
                                <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                              </div>
                            </div>
                            {/* <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Image</label>
                                <input type="file" accept=".jpg,.jpeg,.png,.gif" onChange={(e) => setImage(e.target.value)} />
                              </div>
                            </div> */}
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Gender</label>
                                <input value={gender} type="text" onChange={(e) => setGender(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Marital Status</label>
                                <input value={maritualStatus} type="text" onChange={(e) => setMaritualStatus(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Nominee Data</label>
                                <input value={nomineeData} type="text" onChange={(e) => setNomineeData(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Additional Data</label>
                                <input value={additionalData} type="text" onChange={(e) => setAdditionalData(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Date of Birth</label>
                                <input value={DOB} type="datetime-local" onChange={handleDateChange} />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button onClick={() => { handleUpdateProfile() }}>Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password</label>
                                <input type="password"
                                  onChange={(e) => setPassword(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password Confirm</label>
                                <input type="password"
                                  onChange={(e) => setConfirmPassword(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button onClick={() => { handleSetNewPassword() }}>Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> Modify your address book entries
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="entries-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-info text-center">
                                  <p>John Doe</p>
                                  <p>Paul Park </p>
                                  <p>Lorem ipsum dolor set amet</p>
                                  <p>NYC</p>
                                  <p>New York</p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-edit-delete text-center">
                                  <button className="edit">Edit</button>
                                  <button>Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
