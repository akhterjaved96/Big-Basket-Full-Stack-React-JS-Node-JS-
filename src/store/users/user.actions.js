// main actions
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SERVER_URLS} from "../../config/config";
import axios from "axios";
import * as userUtil from "../../modules/util/userUtil";
import * as tokenUtil from '../../modules/util/tokenUtil';

// PUBLIC - Register a User
export const registerUser = createAsyncThunk("registerUser", async (user) => {
    let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/users/register`;
    let response = await axios.post(serverURL, user);
    return response.data;
});

// PUBLIC - Login a User
export const loginUser = createAsyncThunk("loginUser", async (user, {dispatch}) => {
    let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/users/login`;
    let response = await axios.post(serverURL, user);
    return response.data;
});

// PRIVATE - Get User Info
export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
    if (userUtil.isLoggedIn()) {
        tokenUtil.setAuthToken(userUtil.getToken());
        let serverURL = `${SERVER_URLS.EXPRESS_SERVER_URL}/users/`;
        let response = await axios.get(serverURL);
        return response.data;
    }
});

