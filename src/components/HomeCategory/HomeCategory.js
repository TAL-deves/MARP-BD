import React, { useEffect, useState } from 'react'
import { getRequestHandler } from '../../apiHandler/customApiHandler';

function HomeCategory() {
  const [category, setCategory] = useState()
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? category.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === category.length - 1 ? 0 : prevIndex + 1));
  };
  // handle category
  async function handleGetCategory() {
    try {
      const data = await getRequestHandler('/category/allcategories');
      // Handle the response data
      setCategory(data.data.categoryList)

      // const doubledNumbers = data.data.categoryList.map((number) => 
      // number.name

      // );

      console.log("doubledNumbers", data.data.categoryList);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(() => { handleGetCategory() }, [])
  return (
    <div>
      {category ?
      
        <>
          {category.map((cat) => {
            console.log("mapping", cat)
            return (
              <div className="card-slider">
                
                {/* <div className="card">
                  <img src={cat.productImages[0]} alt={cat.name} />
                  
                  <h3>{cat.name}</h3>
                </div> */}
               
              </div>
            );
          })}
        </>
        :
        <></>}
    </div>
  )
}

export default HomeCategory
