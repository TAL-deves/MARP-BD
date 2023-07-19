import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import { getRequestHandler } from '../../apiHandler/customApiHandler';

import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories,product , uniqueSubcategories, getSortParams }) => {
  // console.log("categories",categories)
  // console.log("subcategories",uniqueSubcategories)
  const [subCategories, setSubcategories]= useState([])
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                  getSortParams("category", "");
                  setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              
              return (<>
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
                {/* {subCategories} */}
                </>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
