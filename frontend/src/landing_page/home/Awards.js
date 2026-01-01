import React from 'react';

function Awards() {
    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="col-6 p-5">
                    <img src="media/images/largestBroker.svg " />
                </div>
                <div className="col-6 p-5 mt-3">
                    <h1>Largest Stock broker in india</h1>
                    <p className='mb-5'>Over 2+ million Zerodha clients contribute to over 15% of all retail trades in India.</p>
                    
                    <div className="row">
                        <div className="col-6">
                            <ul>
                                <li>
                                    <p>Futures and options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul>
                                <li>
                                    <p>Stocks and IPOs </p>
                                </li>
                                <li>
                                    <p>Direct mutual funds</p>
                                </li>
                                <li>
                                    <p>Bonds and debentures</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="media/images/pressLogos.png" style={{width: '90%'}} />
                </div>
            </div>
        </div>
    );
}

export default Awards;