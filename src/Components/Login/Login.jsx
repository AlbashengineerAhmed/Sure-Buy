import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export default function Login({ getUserData }) {
  const { state, dispatch, loginUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginUser(values, navigate, getUserData);
    },
  });

  const handleForgotPassword = () => {
    navigate("/forgetpassword");
  };

  function showPassword() {
    setShow(!show);
  }

  return (
    <div className="container login-container d-flex flex-column justify-content-center align-items-center">
      <div className="row col-md-6 col-12 text-center">
        <div className="wrapper">
          <img
            src={require("../../images/logo-auth.png")}
            className="w-50"
            style={{ height: "200px" }}
            alt="Logo"
          />
        </div>
        <h2 className="login-main-text">Login</h2>

        {/* Test Credentials Display */}
        <div className="test-credentials p-3 mb-3 bg-light rounded shadow-sm">
          <h5 className="text-primary">Test Credentials</h5>
          <p>
            <strong>Email:</strong> ahmed72261@gmail.com
          </p>
          <p>
            <strong>Password:</strong> Ahmed@123
          </p>
        </div>

        <form onSubmit={loginFormik.handleSubmit} className="w-100">
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
          {loginFormik.touched.email && loginFormik.errors.email && (
            <div className="text-danger">{loginFormik.errors.email}</div>
          )}

          <label htmlFor="password">Password</label>
          <div className="position-relative">
            <input
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              type={show ? "text" : "password"}
              className="form-control my-3"
              id="password"
              name="password"
            />
            <i
              className={`fa-solid fs-5 position-absolute end-0 top-0 p-2 ${
                show ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={showPassword}
            ></i>
          </div>
          {loginFormik.touched.password && loginFormik.errors.password && (
            <div className="text-danger">{loginFormik.errors.password}</div>
          )}

          <div>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <button
            disabled={!loginFormik.isValid || !loginFormik.dirty}
            type="submit"
            className="btn bg-main text-light w-100 mt-2"
          >
            {state.login.loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
