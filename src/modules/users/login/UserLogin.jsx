import React, {useEffect, useState} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import {Link, useNavigate} from "react-router-dom";
import * as userActions from "../../../store/users/user.actions";
import * as userReducer from "../../../store/users/user.reducer";
import {useDispatch, useSelector} from "react-redux";
import * as userUtil from '../../util/userUtil';

const UserLogin = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    // get data from store
    let userState = useSelector((store) => {
        return store[userReducer.USER_FEATURE];
    })


    let [user, setUser] = useState({
        email: '',
        password: ''
    });

    let [userError, setUserError] = useState({
        emailError: '',
        passwordError: ''
    });

    let validateEmail = (event) => {
        setUser({...user, email: event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError, emailError: 'Enter a proper Email'})
            : setUserError({...userError, emailError: ''});
    }

    let validatePassword = (event) => {
        setUser({...user, password: event.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError, passwordError: 'Enter a proper Password'})
            : setUserError({...userError, passwordError: ''});
    }

    let isEmpty = () => {
        for (let value of Object.values(user)) {
            if (value === "") {
                return true;
            }
        }
        return false;
    };

    let submitLogin = (event) => {
        event.preventDefault();
        if (!isEmpty()) {
            dispatch(userActions.loginUser(user)).then(() => {
                navigate('/products/list');
            });
        }
    };

    return (
        <>
            <NavBar/>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">Login Here</p>
                            <p className="fst-italic text-title">Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Animi delectus deserunt enim ipsa minima omnis quasi, quis totam. A ad asperiores
                                debitis dolores esse, explicabo neque nisi quisquam ratione tenetur.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={submitLogin}>
                                <div className="mb-2">
                                    <input
                                        name="email"
                                        value={user.email}
                                        onChange={validateEmail}
                                        type="email"
                                        className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`}
                                        placeholder="Email"/>
                                    {userError.emailError.length > 0 ?
                                        <small className="text-danger">{userError.emailError}</small> : ''}
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="password"
                                        value={user.password}
                                        onChange={validatePassword}
                                        type="password"
                                        className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`}
                                        placeholder="Password"/>
                                    {userError.passwordError.length > 0 ?
                                        <small className="text-danger">{userError.passwordError}</small> : ''}
                                </div>
                                <div className="mb-2">
                                    <input type="submit" value="Login" className="btn btn-warning btn-sm"/>
                                    <Link to={'/'} className="btn btn-dark btn-sm ms-2">Cancel</Link>
                                </div>
                                <small>
                                    Don't have an Account ? <Link to="/users/register"
                                                                  className="font-weight-bold text-danger">Register</Link>
                                </small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default UserLogin;