import React, { Fragment, useEffect, useState } from 'react'
import { deleteRequestHandler, getRequestHandler, postRequestHandler } from '../../apiHandler/customApiHandler'
import { Breadcrumb, Spinner } from 'react-bootstrap'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import { useLocation, useNavigate } from 'react-router-dom'

function BillingAddress() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [companyName, setCompanyName] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [zipCode, setZipCode] = useState()
    const [show, setShow] = useState(false)
    const [gotData, setGotData] =useState()
    const navigate = useNavigate();
    let { pathname } = useLocation();
    // billing address 
    async function handleBillingAddress() {
        setShow(true)
        try {
            const response = await postRequestHandler('/user/profile/billing', { firstName, lastName, companyName, address, city, country, zipCode });
            // Handle the response data
            console.log("billing address response", response);
            if (response.success) {
                 navigate("/checkout")
            }
            setShow(false)

        } catch (error) {
            // Handle the error
            console.error(error);
            setShow(false)
        }
    }

    // billing get address 
    async function handleGetBillingAddress() {
        setShow(true)
        try {
            const response = await getRequestHandler('/user/profile/billing');
            // Handle the response data
            console.log("billing get response", response);
            if (response.success) {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setAddress(response.data.address)
                setCountry(response.data.country)
                setCompanyName(response.data.companyName)
                setCity(response.data.city)
                setZipCode(response.data.zipCode)
                setGotData(true)
            }
            setShow(false)

        } catch (error) {
            // Handle the error
            console.error(error);
            setShow(false)
        }
    }

    // billing delete address 
    async function handleDeleteBillingAddress() {
        setShow(true)
        try {
            const response = await deleteRequestHandler('/user/profile/billing');
            // Handle the response data
            console.log("delete response bill", response)
            if (response.success) {
                navigate("/cart")
            }
            setShow(false)

        } catch (error) {
            // Handle the error
            console.error(error);
            setShow(false)
        }
    }


    useEffect(() => {
        handleGetBillingAddress()
    }, [])
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
                titleTemplate="Checkout"
                description="Checkout page of MARP Bangladesh."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
                    ]}
                />
                <div className="checkout-area pt-95 pb-100">
                    <div className="container">
                        <div>
                            <div className="col-lg-7">
                                <div className="billing-info-wrap">
                                    <h3>Billing Details</h3>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>First Name</label>
                                                {/* <input type="text" /> */}
                                                <input value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Last Name</label>
                                                <input value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>Address</label>
                                                <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-select mb-20">
                                                <label>Country</label>
                                                <select
                                                    style={{ height: "40px" }}
                                                    name="gender"
                                                    class="border"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}>
                                                    <option>Select Country</option>
                                                    <option value="Bangladesh">Bangladesh</option>
                                                    <option value="India">India</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>Company Name</label>
                                                <input
                                                    value={companyName}
                                                    className="billing-address"
                                                    type="text"
                                                    placeholder="Company Name"
                                                    onChange={(e) => setCompanyName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>City</label>
                                                <input value={city} type="text" onChange={(e) => setCity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="billing-info mb-20">
                                                <label>Zipcode</label>
                                                <input value={zipCode} type="number" onChange={(e) => setZipCode(e.target.value)} />
                                            </div>
                                        </div>

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
                                    {gotData ?
                                        <div className="place-order mt-25">
                                            <button
                                                onClick={() => { navigate("/checkout") }} className="btn-hover"
                                                >Next</button>
                                        </div>
                                        :
                                        <div className="place-order mt-25">
                                            <button
                                                onClick={() => { handleBillingAddress() }} className="btn-hover"
                                                disabled={!firstName || !lastName || !address || !country || !companyName || !city || !zipCode}>Submit</button>
                                        </div>}
                                    <div className="place-order mt-25">
                                        <button
                                            onClick={() => { handleDeleteBillingAddress() }} className="btn-hover"
                                        >Delete</button>
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

export default BillingAddress
