import { ADDPRODUCTS_FAILURE, ADDPRODUCTS_REQUEST, ADDPRODUCTS_SUCCESS, GETTPRODUCTS_FAILURE, GETTPRODUCTS_REQUEST, GETTPRODUCTS_SUCCESS } from "./actionTypes"


const intialState={
    loading:false,
    token:"",
    message:"",
    error:false,
    user:'',
    isLoggedIn:false,
    products:[]
}
 
export const reducer= (state = intialState, { type, payload }) =>{
   switch (type) {

    case GETTPRODUCTS_REQUEST || ADDPRODUCTS_REQUEST:
        return {...state, loading:true}
    case GETTPRODUCTS_FAILURE || ADDPRODUCTS_FAILURE:
        return {...state, loading:false, error:true}
    case GETTPRODUCTS_SUCCESS:
        return {...state, loading:false, error:false, products:payload || []}
    case ADDPRODUCTS_SUCCESS:
        return {...state, loading:false, error:false}
    
    default:
        return state
   }
}