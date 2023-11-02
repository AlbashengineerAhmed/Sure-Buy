import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from './../Utils/baseUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    const navigate = useNavigate();
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
    const response = await axios.post(`${BASE_URL}auth/forgotPasswords`, {
        email: email,
    });
    setLoading(false);
    // console.log(response);
    setSuccessMessage(response.data.message);
    toast.success(response.data.message); // Display success message using toast
    if(response.data.statusMsg === 'success'){
        toast.success(response.message,{duration:2000,className:"text-success px-4 fw-bolder"});
        navigate('/verifycode');
    }
    } catch (error) {
    setLoading(false);
    if (error.response && error.response.data) {
        setError(error.response.data.message);
        toast.error(error.response.data.message); // Display error message using toast
    } else {
        setError('An error occurred while processing your request.');
        toast.error('An error occurred while processing your request.'); // Display generic error message using toast
    }
    }
};

return (
    <div className="container login-container d-flex justify-content-center align-items-center">
    <div className="row col-md-6 col-12">
        <h2>Forgot Password</h2>
        {successMessage && <div>{successMessage}</div>}
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            className="form-control my-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <button className="btn bg-main text-light" type="submit" disabled={loading}>
            {loading ? <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i> : 'Reset Password'}
        </button>
        </form>
    </div>
    </div>
);
}
