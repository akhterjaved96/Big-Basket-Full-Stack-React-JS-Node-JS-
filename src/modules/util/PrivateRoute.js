import React from 'react';
import {Navigate} from 'react-router-dom';
import * as userUtil from '../util/userUtil';

function PrivateRoute({children}) {
    const auth = userUtil.isLoggedIn();
    return auth ? children : <Navigate to="/users/login"/>;
}

export default PrivateRoute;