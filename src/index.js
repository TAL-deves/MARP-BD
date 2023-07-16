// import React from "react";
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from "./App";
// import { store } from "./store/store";
// import PersistProvider from "./store/providers/persist-provider";
// import { setProducts } from "./store/slices/product-slice"
// // import products from "./data/products.json";
// import products from "./helpers/mockerro.json";
// import 'animate.css';
// import 'swiper/swiper-bundle.min.css';
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "./assets/scss/style.scss";
// import "./i18n";



// store.dispatch(setProducts(products));

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//     <Provider store={store}>
//       <PersistProvider>
//         <App />
//       </PersistProvider>
//     </Provider>
// );


import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { PersistProvider } from 'react-persist-store';





import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice"
// import products from "./data/products.json";
// import products from "./helpers/mockerro.json";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import { getRequestHandler } from './apiHandler/customApiHandler';

const Root = () => {
  const [isRendered, setIsRendered] = useState(false);
  
  async function fetchData() {
    try {
      const products = await getRequestHandler('https://marpapi.techanalyticaltd.com/product/');
      // Handle the response data
      // console.log("index.js products from api",products);
      store.dispatch(setProducts(products.data.allProducts));
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
    const container = document.getElementById('root');
    const root = createRoot(container);
    setIsRendered(true);

    return () => {
      root.unmount();
    };
  }, []);

  // store.dispatch(setProducts(products));

  return isRendered ? (
    // <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <Provider store={store} >
      <PersistProvider>
        <App />
        {/* {store && store.data ? <App /> : null} */}
      </PersistProvider>
    </Provider>
    // </div>
  ) : null;
};

render(<Root />, document.getElementById('root'));









// function Index() {
//   async function fetchData() {
//     try {
//       const products = await axios.getRequest('https://marpapi.lonewolfdays.site/product/');
//       // Handle the response data
//       store.dispatch(setProducts(products));
//       console.log("index.js products from api",products.data);
//     } catch (error) {
//       // Handle the error
//       console.error(error);
//     }
//   }
  
//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Index

