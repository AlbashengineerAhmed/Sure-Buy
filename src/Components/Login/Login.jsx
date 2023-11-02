import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css'

const validationSchema = yup.object({
email: yup.string().required('Email is required').email('Invalid email format'),
password: yup.string().required('Password is required'),
});

export default function Login({ getUserData }) {
const { state, dispatch, loginUser } = useContext(AuthContext);
const [show, setShow] = useState(false);
const navigate = useNavigate();

const handleLogin = () => {
    dispatch({ type: 'LOGIN_START' });
};

const loginFormik = useFormik({
    initialValues: {
    email: '',
    password: '',
    },
    validationSchema,
    onSubmit: (values) => {
    loginUser(values, navigate, getUserData);
    },
});

const handleForgotPassword = () => {
    navigate('/forgetpassword');
};

function showPassword() {
    let showPass = document.getElementById('password');
    if (showPass.type === 'password') {
    showPass.type = 'text';
    setShow(true)
    } else {
    showPass.type = 'password';
    setShow(false)
    }
}

return (
    <div className="container login-container d-flex justify-content-center align-items-center">
    <div className="row col-md-6 col-12">
        <div className="wrapper text-center">
        <img src={require('../../images/logo-auth.png')} className="w-50" style={{ height: '200px' }} alt="" />
        </div>
        <h2 className="login-main-text">Login</h2>
        <form onSubmit={loginFormik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="email"
            className="form-control my-3"
            id="email"
            name="email"
        />
        {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="text-danger">{loginFormik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <div className="position-relative">
            <input
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
            />
            <i className={`fa-solid fs-5 position-absolute end-0 top-0 p-2 ${
                show ? 'fa-eye' : 'fa-eye-slash'
            }`} onClick={showPassword}></i>
        </div>
        {loginFormik.touched.password && loginFormik.errors.password ? (
            <div className="text-danger">{loginFormik.errors.password}</div>
        ) : null}
        <div>
            <button type="button" className="btn btn-link" onClick={handleForgotPassword}>
            Forgot Password?
            </button>
        </div>
        <button
            disabled={!loginFormik.isValid || !loginFormik.dirty}
            type="submit"
            className="btn bg-main text-light"
        >
            {state.login.loading ? (
            <i className="fas fa-spinner fa-spin"></i>
            ) : (
            'Login'
            )}
        </button>
        </form>
    </div>
    </div>
);
}
