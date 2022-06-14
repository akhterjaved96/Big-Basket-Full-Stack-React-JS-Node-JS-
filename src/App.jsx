import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./modules/layout/home/Home";
import UserLogin from "./modules/users/login/UserLogin";
import UserRegister from "./modules/users/register/UserRegister";
import About from "./modules/layout/about/About";
import PageNotFound from "./modules/layout/page-not-found/PageNotFound";
import PrivateRoute from "./modules/util/PrivateRoute";
import {useDispatch} from "react-redux";
import * as userUtil from './modules/util/userUtil';
import * as userActions from './store/users/user.actions';
import AddProduct from './modules/admin/add-product/AddProduct';
import ProductsAdmin from './modules/admin/products-admin/ProductsAdmin';
import EditProduct from './modules/admin/edit-product/Editroduct';
import ProductsList from './modules/products/productsList/ProductsList';
import ViewProduct from './modules/products/viewProduct/ViewProduct';

let App = () => {

    let dispatch = useDispatch();

    useEffect(() => {
        if (userUtil.isLoggedIn()) {
            dispatch(userActions.getUserInfo());
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} exact={true} element={<Home/>}/>
                    <Route path={'/products/list'} exact={true} element={
                        <PrivateRoute>
                            <ProductsList/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/list/:productId'} exact={true} element={
                        <PrivateRoute>
                            <ViewProduct/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/admin/'} exact={true} element={
                        <PrivateRoute>
                            <ProductsAdmin/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/add/'} exact={true} element={
                        <PrivateRoute>
                            <AddProduct/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/products/edit/:productId'} exact={true} element={
                        <PrivateRoute>
                            <EditProduct/>
                        </PrivateRoute>
                    }/>
                    <Route path={'/users/login'} exact={true} element={<UserLogin/>}/>
                    <Route path={'/users/register'} exact={true} element={<UserRegister/>}/>
                    <Route path={'/about'} exact={true} element={
                        <PrivateRoute>
                            <About/>
                        </PrivateRoute>
                    }/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
