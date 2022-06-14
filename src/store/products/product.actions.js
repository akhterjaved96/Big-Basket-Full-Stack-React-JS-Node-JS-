// main actions
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SERVER_URLS} from "../../config/config";
import axios from "axios";
import * as userUtil from "../../modules/util/userUtil";
import * as tokenUtil from '../../modules/util/tokenUtil';


// PUBLIC - GET all Products
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/products/all`;
    let response = await axios.get(serverURL);
    return response.data;
});

// PUBLIC - GET a Product
export const getProduct = createAsyncThunk("getProduct", async (productId) => {
    let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/products/${productId}`;
    let response = await axios.get(serverURL);
    return response.data;
});

// PRIVATE - Create a Product
export const createProduct = createAsyncThunk("createProduct", async (product) => {
    if (userUtil.isLoggedIn()) {
        tokenUtil.setAuthToken(userUtil.getToken());
        let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/products/`;
        let response = await axios.post(serverURL, product);
        return response.data;
    }
});

// PRIVATE - Update a Product
export const updateProduct = createAsyncThunk("updateProduct", async (payload) => {
    if (userUtil.isLoggedIn()) {
        tokenUtil.setAuthToken(userUtil.getToken());
        const {product, productId} = payload;
        let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/products/${productId}`;
        let response = await axios.put(serverURL, product);
        return response.data;
    }
});

// PRIVATE - Delete a Product
export const deleteProduct = createAsyncThunk("deleteProduct", async (productId, {dispatch}) => {
    if (userUtil.isLoggedIn()) {
        tokenUtil.setAuthToken(userUtil.getToken());
        let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/products/${productId}`;
        let response = await axios.delete(serverURL);
        if (response) {
            dispatch(getAllProducts()); // get all products once deletion is success
        }
        return response.data;
    }
});
