// AuthContext.js
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import authReducer from '../Components/reducer/authReducer';
import BASE_URL from '../Components/Utils/baseUrl';

const initialState = {
    loading: false,
    registration: {
    loading: false,
    error: null,
    },
    login: {
    loading: false,
    error: null,
    },
};


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [state, dispatch] = useReducer(authReducer, initialState);

const loginUser = (values, navigate, getUserData) => {
    dispatch({ type: 'LOGIN_START' });
    axios
    .post(`${BASE_URL}auth/signin`, values)
    .then((response) => {
        dispatch({ type: 'LOGIN_SUCCESS' });
        if (response.data.message === "success") {
        localStorage.setItem('ahmedToken', response.data.token);
        toast.success('Login successful!');
        navigate('/');
        getUserData();
        }
    })
    .catch((error) => {
        dispatch({ type: 'LOGIN_FAILURE', payload: error });
        if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password');
        } else {
        toast.error('An error occurred during login');
        }
        // console.log(error);
    });
};

const registerUser = (values, navigate) => {
    dispatch({ type: 'REGISTER_START' });

    axios
    .post(`${BASE_URL}auth/signup`, values)
    .then((response) => {
        // console.log(response);
        if (response.data.message === "success") {
        toast.success('Registration successful!');
        dispatch({ type: 'REGISTER_SUCCESS' });
        navigate('/login');
        }
    })
    .catch((error) => {
        dispatch({ type: 'REGISTER_FAILURE', payload: error });

        if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
        } else {
        toast.error('An error occurred during registration');
        }
        // console.log(error);
    });
};

return (
    <AuthContext.Provider value={{ state, dispatch, loginUser, registerUser }}>
    {children}
    </AuthContext.Provider>
);
};
