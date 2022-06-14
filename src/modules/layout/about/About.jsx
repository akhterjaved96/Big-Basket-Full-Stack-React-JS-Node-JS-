import React from 'react';
import NavBar from "../navbar/NavBar";

let About = () => {
    return (
        <>
            <NavBar/>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">About Us</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Aspernatur at deleniti facere, ipsam, iste itaque maxime minima quam quasi quibusdam
                                quis, rem repellendus sapiente similique soluta ut veniam voluptas voluptates.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    App Name : <span className="fw-bold">Big-Basket</span>
                                </li>
                                <li className="list-group-item">
                                    App Version : <span className="fw-bold">1.0.1</span>
                                </li>
                                <li className="list-group-item">
                                    Author : <span className="fw-bold">Impressico Business Solution</span>
                                </li>
                                <li className="list-group-item">
                                    Frontend : <span className="fw-bold">React, Bootstrap, Redux Toolkit</span>
                                </li>
                                <li className="list-group-item">
                                    Backend : <span className="fw-bold">Node JS, Express, MongoDB</span>
                                </li>
                                <li className="list-group-item">
                                    Concepts : <span
                                    className="fw-bold">Hooks, Routing, CRUD, Redux, Authentication</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default About;