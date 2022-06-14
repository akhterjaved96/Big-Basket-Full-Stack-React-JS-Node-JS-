import React, {useState} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as userActions from '../../../store/users/user.actions';

const UserRegister = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    let [userError, setUserError] = useState({
        nameError: '',
        emailError: '',
        passwordError: ''
    });

    let validateUsername = (event) => {
        setUser({...user, name: event.target.value});
        let regExp = /^[a-zA-Z0-9]{4,10}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError, nameError: 'Enter a proper Username'})
            : setUserError({...userError, nameError: ''});
    }

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

    let submitRegister = (event) => {
        event.preventDefault();
        if (!isEmpty()) {
            dispatch(userActions.registerUser(user)).then(() => {
                navigate('/users/login');
            });
        } else {
            //dispatch(alertActions.setAlert('Please fill in  the fields' , 'danger'));
        }
    };

    return (
        <>
            <NavBar/>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">Register Here</p>
                            <p className="fst-italic text-title">Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. A ab atque dolore ducimus, eligendi eum expedita laboriosam maiores molestias
                                officiis pariatur, placeat qui, quibusdam reiciendis sequi soluta ullam veniam
                                voluptatum!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={submitRegister}>
                                <div className="mb-2">
                                    <input
                                        name="name"
                                        value={user.name}
                                        onChange={validateUsername}
                                        type="text"
                                        className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`}
                                        placeholder="Name"/>
                                    {userError.nameError.length > 0 ?
                                        <small className="text-danger">{userError.nameError}</small> : ''}
                                </div>

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
                                    <input type="submit" value="Register" className="btn btn-danger btn-sm"/>
                                    <Link to={'/'} className="btn btn-dark btn-sm ms-2">Cancel</Link>
                                </div>
                                <small>
                                    Already have an Account ? <Link to="/users/login"
                                                                    className="font-weight-bold text-danger">Login</Link>
                                </small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default UserRegister;