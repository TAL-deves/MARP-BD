import React, { useEffect, useState } from 'react'
import { getRequestHandler } from '../../apiHandler/customApiHandler';

function HomeCategory() {
    const [category, setCategory]= useState()
      // handle reg 
  async function handleGetCategory() {
    try {
      const data = await getRequestHandler('/category/allcategories' );
      // Handle the response data
      setCategory(data.data.categoryList)
      
      const doubledNumbers = data.data.categoryList.map((number) => number.name);

      console.log("doubledNumbers", doubledNumbers);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(()=>{handleGetCategory()},[])
  return (
    <div>
       {/* {category.map((cat) => {
              return (
                <li >
                  <div>
                  {cat}
                  </div>
                </li>
              );
            })} */}
    </div>
  )
}

export default HomeCategory
