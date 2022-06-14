import React, {useState, useEffect} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as productActions from "../../../store/products/product.actions";
import * as productReducer from "../../../store/products/product.reducer";

const EditProduct = () => {
    let {productId} = useParams();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // all fields must same as server data
    let [state, setState] = useState({
        product: {
            name : '',
            image : '',
            price : '',
            qty : '',
            info : ''
        }
    });

    // get product state from redux store
    let productState = useSelector((state) => {
        return state[productReducer.PRODUCT_FEATURE];
    })

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProduct(productId));
        }
    }, []);

    useEffect(() => {
        if (Object.keys(productState.product).length > 0) {
            let {product} = productState;
            setState({
                ...state,
                product: {
                    ...state.product,
                    name: product.name ? product.name : "",
                    image: product.image ? product.image : "",
                    price: product.price ? product.price : "",
                    qty: product.qty ? product.qty : "",
                    info: product.info ? product.info : "",
                }
            })
        }
    }, [productState.product])

    let isEmpty = () => {
        for (let value of Object.values(product)) {
            if (value === "") {
                return true;
            }
        }
        return false;
    };

    let updateInput = (event) => {
        setState({
            ...state,
            product: {
                ...state.product,
                [event.target.name]: event.target.value
            }
        })
    };

    let submitUpdate = (event) => {
        event.preventDefault();
        let payload = {
            product: state.product,
            productId: productId
        }
        dispatch(productActions.updateProduct(payload)).then(() => {
            navigate('/products/admin');
        });

        toast.success('Product updated Successfully!!', {
            position: "top-right",
        });
       
    };

    let {product} = state;

    return (
        <>
            <NavBar/>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal"> Edit Product</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
                                doloribus molestiae
                                omnis quis! Autem commodi cum, doloremque ducimus et illo incidunt ipsa laboriosam magni
                                natus nostrum nulla odio omnis praesentium recusandae, sit soluta ullam voluptatem?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={submitUpdate}>
                            <div className="mb-2">
                                    <input
                                        name="name"
                                        value={product.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Product Name"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="image"
                                        value={product.image}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Product Image URL"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="price"
                                        value={product.price}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Price"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="qty"
                                        value={product.qty}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Quantity"/>
                                </div>
                                
                                <div className="mb-2">
                                    <textarea
                                        name="info"
                                        value={product.info}
                                        onChange={updateInput}
                                        rows={3} className="form-control" placeholder="General Information"/>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-primary" value="Update"
                                           disabled={isEmpty()}/>
                                    <Link to={'/products/admin'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            <img src={product.image} alt="" className="edit-book-img"/>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    )
};
export default EditProduct;