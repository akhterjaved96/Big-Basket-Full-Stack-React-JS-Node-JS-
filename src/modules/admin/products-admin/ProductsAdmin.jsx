import React, { useEffect } from 'react';
import NavBar from "../../layout/navbar/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as userReducer from '../../../store/users/user.reducer';
import { Link } from "react-router-dom";
import * as productActions from "../../../store/products/product.actions";
import * as productReducer from "../../../store/products/product.reducer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../layout/spinner/Spinner";

const ProductsAdmin = () => {
    const dispatch = useDispatch();

    let userState = useSelector((state) => {
        return state[userReducer.USER_FEATURE];
    });

    let productState = useSelector((state) => {
        return state[productReducer.PRODUCT_FEATURE];
    })

    let { user } = userState;
    let { loading, errorMessage, productList } = productState;

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, []);

    let clickDeleteProduct = (productId) => {
        //console.log(productId);
        if (productId) {
            dispatch(productActions.deleteProduct(productId));
        }
        // toast.success('Product deleted Successfully!!', {
        //     position: "top-right",
        // });
    };

    return (
        <>
            <NavBar />
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 fw-bold">
                                {/* <i className="fa fa-shopping-cart"/>  */}Products Details
                               
                                </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus molestiae
                                omnis quis! Autem commodi cum, doloremque ducimus et illo incidunt ipsa laboriosam magni
                                natus nostrum nulla odio omnis praesentium recusandae, sit soluta ullam voluptatem?</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading && productList.length === 0 &&
                <Spinner />
            }
            {
                Object.keys(user).length > 0 && user.isAdmin ? <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Link to={'/products/add'} className="btn btn-success float-end">
                                    <i className="fa fa-plus"></i> New Product</Link>
                            </div>
                        </div>
                        {
                            !loading && productList.length > 0 &&
                            <div className="row mt-3">
                                <div className="col">
                                    <table className="table table-success table-striped text-center table-hover">
                                        <thead className="table-main table-dark text-white">
                                            <tr>
                                                <th>SNO</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productList.map(product => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td>{product._id.substring(product._id.length - 6)}</td>
                                                            <td>
                                                                <img src={product.image} alt="" className="table-img" />
                                                            </td>
                                                            <td>{product.name}</td>
                                                            <td>&#8377; {product.price.toFixed(2)}</td>
                                                            <td>{product.qty} kgs</td>
                                                            <td>
                                                                <Link to={`/products/edit/${product._id}`}
                                                                    className="btn btn-primary">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <button onClick={() => clickDeleteProduct(product._id)}
                                                                    className="btn btn-danger ms-2">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </> : <>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center text-danger">
                                <p className="h5">Sorry! you are not an Admin user!</p>
                            </div>
                        </div>
                    </div>
                </>
            }
            <ToastContainer/>
        </>
    )
};
export default ProductsAdmin;