import React, { useState,useEffect } from 'react'
import f_pass from '../../assets/forgot_pass.svg'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Formik,Field,Form,ErrorMessage } from 'formik';
import { ResetPasswordSchema,initialValues } from '../../validation/ResetPassValidation';
import { toast } from 'react-toastify';




function ResetPassword() {
    const { id } = useParams();
    const [password,setPassword]=useState('')
    const [confpassword,setConfpassword] =useState('')
    const [formError,setFormError]=useState('')
    // const baseURL='http://127.0.0.1:8000/'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const navigate=useNavigate()

    useEffect(() => {
        if (password && confpassword) {
          if (password !== confpassword) {
            setFormError('Passwords do not match');
          } else {
            setFormError('');
          }
        }
      }, [password, confpassword]);

    const handleSubmit = async(values,{setsubmitting})=>{
        const formData = new FormData();
        formData.append('password',values.password)
        formData.append('id',id) 
        try{
            const response = await axios.post(baseURL+'/api/account/reset_password/', formData);
            // console.log(response)
        if(response.status ==200){
            setFormError('')
            toast.success('Login successful!',{
              position: "top-center",
            });
              
           navigate('/login');
        
              
        }   
        else{
            setFormError('something went wrong pleas try again later')
        }
        }
        catch(error){
            setFormError(error)
        }finally{
          setsubmitting(false)
        }

    }
  return (
    <div>
        
        <div className='flex w-full h-screen bg-blue-50'>
          <div className='hidden md:inline md:w-2/5 '>
                <div className='mt-16 mx-4  md:w-full'>
                    <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Find your Dreem Job Now</h3>
                    <p className='text-blue-500 font-semibold'>5 lakh+ jobs for you to explore</p>
                </div>
                <div className='flex justify-center'>
                  <img src={f_pass} alt="" className='w-96' />
                </div>
          </div>
          <div className= 'w-full h-screen md:w-3/5 flex justify-end '>
            <div className='bg-white w-full h-full  md:rounded-l-lg shadow-2xl '>
                  <div className='flex h-full'>  
                      <div className="flex items-center justify-center w-full ">
                        <div className="flex items-center ">
                          <Formik 
                            initialValues={initialValues}
                            validationSchema={ResetPasswordSchema}
                            onSubmit={handleSubmit}
                          >
                            {({errors,touched,isSubmitting})=>(
                              <Form  className="flex flex-col w-full h-full pb-6 text-center" method='POST'>
                                {/* <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>*/}
                                <p className="mb-4 text-grey-700">Reset Your password</p>
                                
                                <div className="flex items-center mb-3">
                                  <hr className="h-0 border-b border-solid border-grey-500 grow" /> 
                                </div>
                                <Field
                                  id="password"
                                  name ="password"
                                  type="password"
                                  placeholder="new Password"
                                  className={`flex items-center w-full px-4 py-3 ${errors.password && touched.password ? 'border-red-500' : 'mb-5'} mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}

                                  /> 
                                 <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />
                                
                                <Field
                                  id="confirm_password"
                                  name = "confirm_password"
                                  type="password"
                                  placeholder="conform new Password"
                                  className={`flex items-center w-full px-4 py-3 mr-2 text-sm font-medium ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'mb-5'} outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}

                                /> 
                                <ErrorMessage name='confirm_password' component='div' className='text-red-500 text-sm mb-2' />

                                {formError ?
                                      <div className='flex justify-start mb-5  pl-3 text-red-600 '>

                                        <p >{formError}</p>
                                      </div>
                                  : ""
                                }
                                <button type='submit'
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                  Submit
                                </button>
                                
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                  </div>
            </div>
          </div>     
        </div>
    </div>
  )
}

export default ResetPassword
