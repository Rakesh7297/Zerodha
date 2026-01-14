import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="container mt-5 text-center">
            <h1>Create Your Account</h1>
            <p className="lead">Join Zerodha Clone to start trading</p>
            <div className="mt-4">
                <Link to="/register" className="btn btn-primary btn-lg me-3">
                    Register Now
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;