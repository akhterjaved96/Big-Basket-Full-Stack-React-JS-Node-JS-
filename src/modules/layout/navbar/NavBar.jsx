import React from 'react';
import {Link} from "react-router-dom";
import * as userUtil from '../../util/userUtil';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../store/users/user.reducer";


const NavBar = () => {
    let dispatch = useDispatch();

    let clickLogOut = () => {
        dispatch(logoutUser());
    };


    return (
        <>
            <nav className="navbar navbar-dark bg-success navbar-expand-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand text-main fw-bold fst-italic">
                    <i className="fa fa-shopping-cart"/> Big Basket</Link>
                    <div className="navbar-collapse collapse">
                        {
                            userUtil.isLoggedIn() &&
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item px-2">
                                    <Link to="/products/list" className="nav-link">Product List</Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link to="/products/admin/" className="nav-link">Admin</Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link to="/about" className="nav-link">About</Link>
                                </li>
                            </ul>
                        }

                        {
                            userUtil.isLoggedIn() &&
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item px-2">
                                        <Link to="/" className="nav-link" onClick={clickLogOut}>
                                            <i className="fa fa-sign-out-alt"/> Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
};
export default NavBar;