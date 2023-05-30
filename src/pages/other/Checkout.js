import { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Form } from 'react-bootstrap';
import { use } from "i18next";
import { postRequestHandler } from "../../apiHandler/customApiHandler";

const Checkout = () => {
  const navigate = useNavigate();
   let cartTotalPrice = 0;
   let cartPriceForApi = 0;
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedOption, setSelectedOption] = useState('cod');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
    
  
    {cartItems.map((cartItem, key) => {
      const discountedPrice = getDiscountPrice(
        cartItem.price,
        cartItem.discount
      );
      const finalPrice = (
        cartItem.price * currency.currencyRate
      ).toFixed(2);
      const finalDisPrice = (
        discountedPrice * currency.currencyRate
      ).toFixed(2);

      discountedPrice != null
        ? (cartPriceForApi +=
          finalPrice * cartItem.quantity)
        : (cartPriceForApi +=
          finalDisPrice * cartItem.quantity);
        })}

        useEffect(()=>{
          setFinalPrice(cartPriceForApi)
        },[])


          // set cod order
          // "products": [{"id":"cli8t3qp1000hf9t0byi7o7m9", "quantity":5}],
          // "price": 1000,
          // "paymentMethod": "cod"
          
          const products = cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }));
          
          // const products= [{"id":`${cartItems[0].id}`, "quantity":cartItems[0].quantity}]
          const price= finalPrice
          const paymentMethod= selectedOption

          console.log("qttt", products);
  async function handleCodOrder() {
 
    try {
      const response = await postRequestHandler('/order/ordercod',{products, price, paymentMethod});
      // Handle the response data
      console.log("cod response", response);
      if(response.success){
        navigate("/orders")
      }
 
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  console.log("total", cartItems)
    
    return (
    <Fragment>
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
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);

                                 
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Delivery</li>
                            <li>Free Delivery</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div>
                      <Form>
                        <Form.Check
                          type="radio"
                          id="radio1"
                          label="Cash On Delivery"
                          name="options"
                          value="cod"
                          className="custom-radio"
                          checked={selectedOption === 'cod'}
                          onChange={handleOptionChange}
                        />
                        <Form.Check
                          type="radio"
                          id="radio2"
                          label="Pay Now"
                          name="options"
                          value="pNow"
                          className="custom-radio"
                          checked={selectedOption === 'pNow'}
                          onChange={handleOptionChange}
                        />

                      </Form>
                    </div>
                    <div className="place-order mt-25">
                      <button onClick={()=>{handleCodOrder()}} className="btn-hover">Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
