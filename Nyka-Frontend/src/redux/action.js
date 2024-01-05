import { ADDPRODUCTS_FAILURE, ADDPRODUCTS_REQUEST, ADDPRODUCTS_SUCCESS, GETTPRODUCTS_FAILURE, GETTPRODUCTS_REQUEST, GETTPRODUCTS_SUCCESS } from "./actionTypes";


export const getProductsFun = () => (dispatch) => {
    dispatch({ type: GETTPRODUCTS_REQUEST });
  
    fetch("https://nyka-fw27-290.onrender.com/products/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        dispatch({type: GETTPRODUCTS_SUCCESS, payload:res.products})
       })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GETTPRODUCTS_FAILURE });
      });
  };


export const addProductFun = (data) => (dispatch) => {
    dispatch({ type: ADDPRODUCTS_REQUEST });
  
    fetch("https://nyka-fw27-290.onrender.com/products/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        dispatch({type: ADDPRODUCTS_SUCCESS})
       })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ADDPRODUCTS_FAILURE });
      });
  };

