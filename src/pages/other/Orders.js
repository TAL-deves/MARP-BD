import React, { Fragment, useEffect, useState } from 'react'
import { getRequestHandler } from '../../apiHandler/customApiHandler';

import { Tab, Nav, Breadcrumb, Container } from 'react-bootstrap';
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';
import { useLocation } from 'react-router-dom';

function Orders() {
  let { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState('tab1');
  const [orderList, setOrderList] = useState()
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // handle orders 
  async function handleGetOrders() {
    try {
      const data = await getRequestHandler('/userorders/all');
      // Handle the response data

      setOrderList(data.data)
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(() => { handleGetOrders() }, [])

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
              {/* <Nav variant="tabs" defaultActiveKey="tab1">
                <Nav.Item>
                  <Nav.Link eventKey="tab1" onClick={() => handleTabChange('tab1')}>
                    Orders List
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2" onClick={() => handleTabChange('tab2')}>
                    Order Category
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab3" onClick={() => handleTabChange('tab3')}>
                    Customer Review
                  </Nav.Link>
                </Nav.Item>
              </Nav> */}

              {/* <Tab.Content>
                <Tab.Pane eventKey="tab1" active={activeTab === 'tab1'}>
                  <div>
                    {orderList.map((list) => {
                      return (
                        <>
                          {list.CartItems.map((product)=>{
                            
                            console.log("cartitem details", product.Product.name)
                            return(
                              <>
                                <div class="card shadow border-light mb-3" >
                           
                            <div class="card-body text-success">
                              <img height="100px" width="100px" src={product.Product.productImages[0]} alt='' />
                              <h5 class="card-title">{product.Product.name}</h5>
                              <p class="card-text">{product.Product.shortDescription}</p>
                              <p class="card-text">৳{product.Product.price}</p>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          
                        </>)
                    })}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="tab2" active={activeTab === 'tab2'}>
                  Content for Tab 2
                </Tab.Pane>
                <Tab.Pane eventKey="tab3" active={activeTab === 'tab3'}>
                  Content for Tab 3
                </Tab.Pane>
              </Tab.Content> */}
<div>
                    {orderList.map((list) => {
                      return (
                        <>
                          {list.CartItems.map((product)=>{
                            
                            console.log("cartitem details", product.Product.name)
                            return(
                              <>
                                <div class="card shadow border-light mb-3" >
                            {/* <div class="card-header">Header</div> */}
                            <div class="card-body text-success">
                              <img height="100px" width="100px" src={product.Product.productImages[0]} alt='' />
                              <h5 class="card-title">{product.Product.name}</h5>
                              <p class="card-text">{product.Product.shortDescription}</p>
                              <p class="card-text">৳{product.Product.price}</p>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          
                        </>)
                    })}
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
