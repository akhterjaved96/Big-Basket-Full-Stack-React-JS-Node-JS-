import React from 'react';
import NavBar from "../navbar/NavBar";
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <NavBar/>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-danger">404! Page Not Found</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Aspernatur at deleniti facere, ipsam, iste itaque maxime minima quam quasi quibusdam
                                quis, rem repellendus sapiente similique soluta ut veniam voluptas voluptates.</p>
                            <Link to={'/'} className="btn btn-dark">Go Home</Link>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <img className="d-block m-auto"
                                 src="https://www.pngkey.com/png/detail/52-520194_error-404-page-was-not-found-news-http.png"
                                 alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default PageNotFound;