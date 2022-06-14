import React, {useState} from 'react';
import NavBar from "../../layout/navbar/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from "react-router-dom";
import * as productActions from '../../../store/products/product.actions';
import {useDispatch} from "react-redux";

const AddProduct = () => {
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

    let submitCreate = (event) => {
        event.preventDefault();
        dispatch(productActions.createProduct(state.product)).then(() => {
            navigate('/products/admin');
        });
        
        toast.success('Product added Successfully!!', {
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
                            <p className="h3 text-teal"> Add Product</p>
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
                            <form onSubmit={submitCreate}>
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
                                    <input type="submit" className="btn btn-success" value="Create"
                                           disabled={isEmpty()}/>
                                    <Link to={'/products/admin'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            <img src={product.image} alt="" className="create-book-img"/>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
};
export default AddProduct;