import React, { useEffect, useState } from 'react'
import { getRequestHandler } from '../../apiHandler/customApiHandler';

import { Tab, Nav } from 'react-bootstrap';

function Orders() {
  
  const [activeTab, setActiveTab] = useState('tab1');
  const [orderList, setOrderList]= useState()
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // handle orders 
  async function handleGetOrders() {
    try {
      const data = await getRequestHandler('/userorders/all');
      // Handle the response data
      console.log("ordersss", data.data)
      setOrderList(data.data)
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(()=>{handleGetOrders()},[])
  return (
    <div>
    <Nav variant="tabs" defaultActiveKey="tab1">
      <Nav.Item>
        <Nav.Link eventKey="tab1" onClick={() => handleTabChange('tab1')}>
        Tab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="tab2" onClick={() => handleTabChange('tab2')}>
          Tab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="tab3" onClick={() => handleTabChange('tab3')}>
          Tab 3
        </Nav.Link>
      </Nav.Item>
    </Nav>

    <Tab.Content>
      <Tab.Pane eventKey="tab1" active={activeTab === 'tab1'}>
        <div>
          {orderList.map((list)=>{
            return(
              <h3>{list.orderNumber}</h3>
            )
          })}
        </div>
      </Tab.Pane>
      <Tab.Pane eventKey="tab2" active={activeTab === 'tab2'}>
        Content for Tab 2
      </Tab.Pane>
      <Tab.Pane eventKey="tab3" active={activeTab === 'tab3'}>
        Content for Tab 3
      </Tab.Pane>
    </Tab.Content>
  </div>
  )
}

export default Orders
