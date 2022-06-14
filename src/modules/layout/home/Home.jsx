import React from 'react';
import {Link, Navigate} from "react-router-dom";
import * as userUtil from '../../util/userUtil';

const Home = () => {

    return (
        <>
            {
                userUtil.isLoggedIn() ? <Navigate to={'/products/list'}/> : <>
                    <div className="landing">
                        <div className="wrapper">
                            <div
                                className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
                                <p className="display-1 text-main">
                                <i className="fa fa-shopping-cart"/> Big Basket</p>
                                <div>
                                    <Link to={'/users/login'} className="btn btn-warning m-1">Login</Link>
                                    <Link to={'/users/register'} className="btn btn-danger m-1">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
};
export default Home;