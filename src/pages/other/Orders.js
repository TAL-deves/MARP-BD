import React, { Fragment, useEffect, useState } from 'react'
import { getRequestHandler } from '../../apiHandler/customApiHandler';

import { Tab, Nav, Breadcrumb, Container } from 'react-bootstrap';
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';
import { useLocation, useNavigate } from 'react-router-dom';

function Orders() {
  let { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState('tab1');
  const [orderList, setOrderList] = useState();
  const [checkOrder, setCheckOrder] = useState()
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
    // set auth check
    async function handleAuthCheck() {

      try {
        const data = await getRequestHandler('/auth/authcheck');
        // Handle the response data
        console.log("auth check response", data);
        if (data.error.code === 401) {
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
  // handle orders 
  async function handleGetOrders() {
    try {
      const data = await getRequestHandler('/userorders/all');
      // Handle the response data
      setOrderList(data.data)
      console.log("orders", data.data)
      if (data.data.legth === 0) {
        setCheckOrder(false)
      }
      else {
        setCheckOrder(true)
      }
    } catch (error) {
      // Handle the error
      console.error(error);
      // navigate("/login-register")
    }
  }

  useEffect(() => { 
    handleAuthCheck()
    handleGetOrders()

   }, [])

  return (

    <Fragment>
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
          {orderList ?
            <div >

              <div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Order Status</th>
                      <th>Order Number</th>
                      <th>Product</th>
                      <th>Quantity</th>

                      {/* Add more table headers for each attribute you want to display */}
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map((order, index) => {

                      let amount = 0

                      return (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.createdAt}</td>
                          <td>{order.orderStatus}</td>
                          <td>{order.orderNumber}</td>
                          <td>
                            <ol>
                              {order.CartItems.map((item) => {
                                amount += parseInt(item.quantity)
                                return (
                                  <>
                                    <li>{item.Product.name}</li>
                                  </>
                                )
                              })}
                            </ol>
                          </td>
                          {/* {order.CartItems.map((item) => 
            { 
              amount+=parseInt(item.quantity)
            }
        )} */}
                          <td>{amount}</td>

                        </tr>

                      )

                    })

                    }
                  </tbody>
                </table>
              </div>

            </div>
            :
            <div className='d-flex align-items-center justify-content-center' style={{ height: "10vh" }}>
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>}
        </Container>
        
      </LayoutOne>
    </Fragment>

  )
}

export default Orders
