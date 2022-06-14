import React, {useEffect} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import {Link} from "react-router-dom";
import * as productActions from "../../../store/products/product.actions";
import * as productReducer from "../../../store/products/product.reducer";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../layout/spinner/Spinner";
import * as userReducer from "../../../store/users/user.reducer";

const ProductsList = () => {

    const dispatch = useDispatch();

    let userState = useSelector((state) => {
        return state[userReducer.USER_FEATURE];
    });

    let productState = useSelector((state) => {
        return state[productReducer.PRODUCT_FEATURE];
    })

    let {user} = userState;
    let {loading, errorMessage, productList} = productState;

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, []);

    return (
        <>
            <NavBar/>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 fw-bold">Products Page</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus molestiae
                                omnis quis! Autem commodi cum, doloremque ducimus et illo incidunt ipsa laboriosam magni
                                natus nostrum nulla odio omnis praesentium recusandae, sit soluta ullam voluptatem?</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading && productList.length === 0 &&
                <Spinner/>
            }
            {
                !loading && productList.length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            {
                                productList.map(product => {
                                    return (
                                        <div className="col-sm-3 mt-3" key={product._id}>
                                            <Link to={`/products/list/${product._id}`}>
                                            <div className="card animated jello delay-1s">
                                                        <div className="card-header text-center bg-white">
                                                            <img src={product.image} alt="" width="150" height="150"/>
                                                        </div>
                                                        <div className="card-body">
                                                            <ul className="list-group ">
                                                                <li className="list-group-item">
                                                                    NAME : {product.name}
                                                                {/* </li>
                                                                <li className="list-group-item">
                                                                    Price : &#8377; {product.price.toFixed(2)}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    Qty : {product.qty} Kgs. */}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            }

        </>
    )
};
export default ProductsList;