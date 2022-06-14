import {combineReducers} from "@reduxjs/toolkit";
import * as userReducer from './users/user.reducer';
import * as productReducer from './products/product.reducer';

const rootReducer = combineReducers({
    [userReducer.USER_FEATURE]: userReducer.userSlice.reducer,
    [productReducer.PRODUCT_FEATURE]: productReducer.productsSlice.reducer
})
export default rootReducer;