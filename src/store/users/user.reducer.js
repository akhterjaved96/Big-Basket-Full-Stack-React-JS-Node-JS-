import {createSlice} from "@reduxjs/toolkit";
import * as userActions from './user.actions';
import {SESSION_STORAGE_KEYS} from "../../config/config";

export const USER_FEATURE = "userFeature";

let initialState = {
    loading: false,
    user: {},
    errorMessage: null,
    token: "",
    isAuthenticated: false
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        logoutUser: (state, action) => {
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_TOKEN);
            state.token = "";
            state.isAuthenticated = false;
            state.user = {};
        }
    },
    extraReducers: (builder) => {
        // Register a User
        builder.addCase(userActions.registerUser.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.registerUser.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(userActions.registerUser.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "User registration is failed"
        })
            // Login a User
            .addCase(userActions.loginUser.pending, (state) => {
                state.loading = true;
            }).addCase(userActions.loginUser.fulfilled, (state, action) => {
            sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_TOKEN, action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
        }).addCase(userActions.loginUser.rejected, (state, action) => {
            state.token = "";
            state.user = {};
            state.isAuthenticated = false;
            state.loading = false;
            state.errorMessage = "User login is failed"
        })
            // get user info
            .addCase(userActions.getUserInfo.pending, (state) => {
                state.loading = true;
            }).addCase(userActions.getUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        }).addCase(userActions.getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.user = {};
            state.errorMessage = "Unable to get user Info"
        })
    }
});
export const {logoutUser} = userSlice.actions;