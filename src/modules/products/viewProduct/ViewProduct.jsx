import React, {useEffect} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import {Link, useParams} from "react-router-dom";
import * as productActions from "../../../store/products/product.actions";
import * as productReducer from "../../../store/products/product.reducer";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../layout/spinner/Spinner";

const ViewProduct = () => {
    let {productId} = useParams();
    let dispatch = useDispatch();

    // get product state from redux store
    let productState = useSelector((state) => {
        return state[productReducer.PRODUCT_FEATURE];
    })

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProduct(productId))
        }
    }, []);

    let {loading, errorMessage, product} = productState;

    return (
        <>
            <NavBar/>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">View Product</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
                                doloribus molestiae
                                omnis quis! Autem commodi cum, doloremque ducimus et illo incidunt ipsa laboriosam magni
                                natus nostrum nulla odio omnis praesentium recusandae, sit soluta ullam voluptatem?</p>
                            <Link to={'/products/list'} className="btn btn-dark">Back</Link>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading && Object.keys(product).length === 0 &&
                <Spinner/>
            }
            {
                !loading && Object.keys(product).length > 0 &&
                <section className="my-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img src={product.image} alt="" className="img-fluid"/>
                                    </div>
                                    <div className="col-sm-8">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                Name : <span className="fw-bold">{product.name}</span>
                                            </li>
                                            <li className="list-group-item">
                                                Price : <span className="fw-bold">&#8377; {product.price.toFixed(2)}</span>
                                            </li>
                                            <li className="list-group-item">
                                                Quantity : <span className="fw-bold">{product.qty} kgs</span>
                                            </li>
                                            <li className="list-group-item">
                                                General Info : <span className="fw-bold">{product.info}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

        </>
    )
};
export default ViewProduct;