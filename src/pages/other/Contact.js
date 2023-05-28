import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
// import api from "../../api/api"
//  import {api, delRequest, getRequest, login, postRequest, putRequest } from '../../api/api';
import { useEffect } from "react";
import { useSSR } from "react-i18next";
import { useState } from "react";

const Contact = () => {
  let { pathname } = useLocation();
   const [name, setName]= useState('')
   const [mail, setMail]= useState('')
   const [subject, setSubject]= useState('')
   const [message, setMessage]= useState('')


   const handleName = (event) => {
    setName(event.target.value);
  }

  const handleMail = (event) => {
    setMail(event.target.value);
  }

  const handleSubject = (event) => {
    setSubject(event.target.value);
  }

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

//   const fetchData = async () => {
//     try {
//       let postdata = { name: name,email: mail,subject: subject,message: message}; 
//       const data = await api("POST", "https://marpbangladeshapi.up.railway.app/email", postdata);
//       console.log(data);
//       setName("");
//       setMail("");
//       setSubject("");
//       setMessage("");
//     } catch (error) {
//       alert(`Error: ${error.code}\nMessage: ${error.message}`);
//     }
//   };


  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of MARP Bangladesh."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
            <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=gulshan%201,%20progress%20tower&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
            </div>
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+8801215478954</p>
                      <p>+8801215478956</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:yourname@email.com">
                          abc@email.com
                        </a>
                      </p>
                      <p>
                        <a href="https://yourwebsitename.com">
                          abc.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" value={name} onChange={handleName} type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" value={mail}type="email" onChange={handleMail} />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          value={subject}
                          onChange={handleSubject}
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                          value={message}
                          onChange={handleMessage}
                        />
                        <button className="submit" onClick={(e)=>{e.preventDefault()
                        // fetchData()
                        }}>
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
