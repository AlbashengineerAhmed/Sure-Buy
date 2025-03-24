import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../Utils/baseUrl';


export default function VerifyCode() {

const [loading, setLoading] = useState(false);

const navigate = useNavigate();

let verifyCode = useFormik({
  initialValues : {
    "resetCode" : ""
  },
    onSubmit: function( values ){
    // console.log('Submit',values);
    verifyPassword( values );
}});

async function verifyPassword(obj){
  setLoading(true);
  try {
    const { data } = await axios.post(
      `${BASE_URL}auth/verifyResetCode`,
      obj
    );
    // console.log(data);
    setLoading(false);
    if(data.status === 'Success'){
      toast.success('You can create a new Password',{duration:2000,className:"text-success px-4 fw-bolder"});
      navigate('/resetpassword');
    }
  } catch (error) {
    // console.log('Error : ',error);
    setLoading(false);
    toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
  }
}

  return(
    <div className="container login-container d-flex justify-content-center align-items-center">
      <div className="row mt-3 col-md-6 col-12">
          <h2>Verify Code</h2>
          <form onSubmit={verifyCode.handleSubmit}>
          <div className="container my-3">
      
            <label className='fw-bolder' htmlFor="resetCode">Enter Reset Code</label>
            <input onChange={verifyCode.handleChange} onBlur={verifyCode.handleBlur}  id="resetCode" type="text" name='resetCode' placeholder='Enter Reset Code' className='form-control my-2'  />
            {verifyCode.errors.resetCode && verifyCode.touched.resetCode ?<div className='alert alert-danger text-center '>{ verifyCode.errors.resetCode }</div>:"" }
            
            {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
              <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
              </button> : <button disabled={!verifyCode.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Verify Code</button> }
          </div>
        </form>
      </div>
    </div>
  );
  }
