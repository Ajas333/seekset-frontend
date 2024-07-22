import React,{useState} from 'react';
import signup_img from '../../assets/signup.svg';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema, initialValues } from '../../validation/SignupValidation';
import { GoogleLogin } from '@react-oauth/google';
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';



function EmpSignup({setIsSpinner}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formError, setFormError] = useState('');
    // const baseURL = 'http://127.0.0.1:8000/';
    const baseURL = import.meta.env.VITE_API_BASEURL
    const handleOnSubmit = async (values, { setSubmitting }) => {
        // console.log("inside handle on submit", values);
        const formData = new FormData();
        formData.append("full_name", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        setIsSpinner(true)
        try {
            const response = await axios.post(baseURL + '/api/account/emp_register/', formData);
            if (response.status === 200) {
                toast.success('Registered successfull!',{
                    position: "top-center",
                  });
                setIsSpinner(false)
                localStorage.setItem('email', values.email);
                navigate('/otp');
            }
            else{
                toast.error('something went wrong try again later!',{
                    position: "top-center",
                  });
                setIsSpinner(false)
                navigate('/login')
            }
        } catch (error) {
            // console.error("There was an error!", error);
        } finally {
            setSubmitting(false);
        }
    }
    const GoogleTestlogin = async (userDetails) => {
        console.log("userDetails after login", userDetails);
        const formData = {
            id_token: userDetails.id_token, // Ensure this key matches the backend expectation
        };
        try {
            const response = await axios.post(baseURL + '/api/account/auth/employer/', formData);
            console.log("auth response", response);
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access_token);
                localStorage.setItem('refresh', response.data.refresh_token);
    
                dispatch(
                    set_Authentication({
                        name: jwtDecode(response.data.access_token).name,
                        email: response.data.email,
                        isAuthenticated: true,
                        isAdmin: response.data.isAdmin,
                        usertype: response.data.usertype,
                    })
                );
                dispatch(
                    set_user_basic_details({
                        profile_pic: response.data.user_data.profile_pic,
                        user_type_id: response.data.user_data.id,
                    })
                );
                toast.success('Login successful!', {
                    position: "top-center",
                });
                if (response.data.user_data.completed === false) {
                    navigate('/employer/profile_creation/');
                } else {
                    navigate('/employer/');
                }
            } else {
                console.log("response...............................", response);
                setFormError(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
       
        <div className='flex h-full '>
            <div className="flex items-center justify-center w-full">
                <div className="flex items-center">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={handleOnSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="flex flex-col w-full h-full pb-6 text-center">
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Employer Sign Up</h3>
                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>

                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="Enter Company Name"
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.username && touched.username ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='username' component="div" className='text-red-500 text-sm mb-2' />

                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className={`flex items-center w-full px-4 py-3 mr-2 ${errors.email && touched.email ? 'border-red-500' : 'mb-5'} text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />

                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

                                <Field
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 mb-1 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                                >
                                    Send Otp
                                </button>
                                <div className='flex justify-center'>
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            GoogleTestlogin(credentialResponse.credential);
                                        }}
                                        onError={() => {
                                        console.log('Login Failed');
                                        }}
                                        />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default EmpSignup;

