import {SESSION_STORAGE_KEYS} from "../../config/config";

export const isLoggedIn = () => {
    return sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_TOKEN);
};

export const getToken = () => {
    return sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_TOKEN);
};

