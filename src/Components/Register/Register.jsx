import React, { useContext, useState } from 'react';
import './Register.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import BASE_URL from './../Utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const validationSchema = yup.object({
name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
email: yup.string().required('Email is required').email('Invalid email format'),
password: yup
    .string()
    .required('Password is required')
    .matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}/,
    'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters'
    ),
rePassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Password do not match'),
phone: yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
});

export default function Register() {
const { state, dispatch, registerUser } = useContext(AuthContext);
const [show, setShow] = useState(false);
const [show2, setShow2] = useState(false);
const navigate = useNavigate();

const registerFormik = useFormik({
    initialValues: {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
    dispatch({ type: 'REGISTER_START' });
    registerUser(values, navigate);
    },
});

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

const showRePassword = () => {
    let showRePass = document.getElementById('rePassword');
    if (showRePass.type === 'password') {
    showRePass.type = 'text';
    setShow2(true)
    } else {
    showRePass.type = 'password';
    setShow2(false)
    }
};

return (
    <div className="container register-container d-flex justify-content-center align-items-center">
    <div className="row w-50">
        <div className="wrapper text-center">
        <img src={require('../../images/logo-auth.png')} className="w-50" style={{ height: '200px' }} alt="" />
        </div>
        <h2 className="login-main-text">Register Now</h2>
        <form onSubmit={registerFormik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="text"
            className="form-control my-3"
            id="name"
            name="name"
        />
        {registerFormik.touched.name && registerFormik.errors.name ? (
            <div className="text-danger">{registerFormik.errors.name}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="email"
            className="form-control my-3"
            id="email"
            name="email"
        />
        {registerFormik.touched.email && registerFormik.errors.email ? (
            <div className="text-danger">{registerFormik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <div className='position-relative'>
            <input
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
            />
            <i className={`fa-solid fs-5 position-absolute end-0 top-0 p-2 ${
                show ? 'fa-eye' : 'fa-eye-slash'
            }`} onClick={showPassword}></i>
        </div>
        {registerFormik.touched.password && registerFormik.errors.password ? (
            <div className="text-danger">{registerFormik.errors.password}</div>
        ) : null}

        <label htmlFor="rePassword">Confirm Password</label>
        <div className="position-relative">
            <input
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="password"
            className="form-control my-3"
            id="rePassword"
            name="rePassword"
            />
            <i className={`fa-solid fs-5 position-absolute end-0 top-0 p-2 ${
                show2 ? 'fa-eye' : 'fa-eye-slash'
            }`} onClick={showRePassword}></i>
        </div>
        {registerFormik.touched.rePassword && registerFormik.errors.rePassword ? (
            <div className="text-danger">{registerFormik.errors.rePassword}</div>
        ) : null}

        <label htmlFor="phone">Phone</label>
        <input
            value={registerFormik.values.phone}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="tel"
            className="form-control my-3"
            id="phone"
            name="phone"
        />
        {registerFormik.touched.phone && registerFormik.errors.phone ? (
            <div className="text-danger">{registerFormik.errors.phone}</div>
        ) : null}

        <button
            disabled={!registerFormik.isValid || !registerFormik.dirty}
            type="submit"
            className="btn bg-main text-light"
            >
            {state.registration.loading ? (
            <i className="fas fa-spinner fa-spin"></i>
            ) : (
            'Register'
            )}
        </button>
        </form>
    </div>
    </div>
);
}
