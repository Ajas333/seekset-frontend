import React,{useEffect,useState} from 'react'
import login_im from '../../assets/login-im.svg'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';
import { Link ,useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useSelector} from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginSchema,initialValues } from '../../validation/LoginValidation';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';


function EmpLogin() {
  const authentication_user = useSelector((state)=> state.authentication_user);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const dispatch =useDispatch();
  // const baseURL='http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_API_BASEURL
  const [userId,setUserId] = useState(null)


  const handleLoginSubmit = async(values,{setSubmitting})=>{
  //  console.log("values inside on submit",values)
    const formData = new FormData();
    formData.append("email",values.email);
    formData.append("password",values.password);
    // console.log("stage two get login data......",formData)

    try{
      const responce = await axios.post(baseURL+'/api/account/Emplogin/',formData)
      // console.log("login response.......................................................",responce)
      if(responce.status==200){
         
        localStorage.setItem('access',responce.data.access_token)
        localStorage.setItem('refresh',responce.data.refresh_token)
        setUserId(responce.data.user_data.id)

        dispatch(
          set_Authentication({
            name: jwtDecode(responce.data.access_token).name,
            email:responce.data.email,
            isAuthenticated:true,
            isAdmin:responce.data.isAdmin,
            usertype:responce.data.usertype,
          })
        )
          dispatch(
            set_user_basic_details({
              profile_pic : responce.data.user_data.profile_pic,
              user_type_id : responce.data.user_data.id,
            })
          )
          toast.success('Login successful!',{
            position: "top-center",
          });
          if(responce.data.user_data.completed == false ){
            navigate('/employer/profile_creation/')
            }
            else{
            // connectToWebSocket(responce.data.user_data.id);
            navigate('/employer/')
        }
        }
        else {
          // console.log("responce...............................",responce)
          setFormError(responce.data.message)
        }
      }

    catch(error){
      // console.log("error")
    } finally{
      setSubmitting(false);
    }
  } 

  // const GoogleTestlogin = async (userDetails)=>{
  //     console.log("userDetails after login",userDetails)
  //     const formData ={
  //       client_id : userDetails,
  //     };
  //     try{
  //         const response = await axios.post(baseURL+'/api/account/auth/employer/',formData)
  //         console.log("auth responce ",response)
  //         if(response.status==200){
         
  //           localStorage.setItem('access',response.data.access_token)
  //           localStorage.setItem('refresh',response.data.refresh_token)
  //           setUserId(response.data.user_data.id)
    
  //           dispatch(
  //             set_Authentication({
  //               name: jwtDecode(response.data.access_token).name,
  //               email:response.data.email,
  //               isAuthenticated:true,
  //               isAdmin:response.data.isAdmin,
  //               usertype:response.data.usertype,
  //             })
  //           )
  //             dispatch(
  //               set_user_basic_details({
  //                 profile_pic : response.data.user_data.profile_pic,
  //                 user_type_id : response.data.user_data.id,
  //               })
  //             )
  //             toast.success('Login successful!',{
  //               position: "top-center",
  //             });
  //             if(response.data.user_data.completed == false ){
  //               navigate('/employer/profile_creation/')
  //               }
  //               else{
                
  //               navigate('/employer/')
  //           }
  //           }
  //           else {
  //             console.log("responce...............................",response)
  //             setFormError(response.data.message)
  //           }
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  // }
  

  return (
    <div>
         <div className='flex h-full'>  
              <div className="flex items-center justify-center w-full ">
                <div className="flex items-center ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form className="flex flex-col w-full h-full pb-6 text-center">
                        <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Employer Sign In</h3>
                        
                        <div className="flex items-center mb-3">
                          <hr className="h-0 border-b border-solid border-grey-500 grow" />
                        </div>

                        <Field
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email id"
                          className={`flex items-center ${errors.email && touched.email ? 'border-red-500' : 'mb-7'} w-full px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                        />
                        <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />

                        <Field
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          className={`flex items-center ${errors.password && touched.password ? "border-red-500" : "mb-5"} w-full px-4 py-3  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl`}
                        />
                        <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />
                        {formError ?
                            <div className='flex justify-start mb-5  pl-3 text-red-600 '>

                              <p >{formError}</p>
                            </div>
                            : ""
                          }
                        <div className="flex flex-row justify-end mb-4">
                          <Link to={'/forgot'}>
                            <p className="mr-4 text-sm font-medium text-purple-blue-500">
                              Forget password?
                            </p>
                          </Link>
                        </div>

                        <button type='submit' disabled={isSubmitting} className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                          Sign In
                        </button>
                        {/* <div className='flex justify-center'>
                          <GoogleLogin
                              onSuccess={credentialResponse => {
                                GoogleTestlogin(credentialResponse.credential);
                              }}
                              onError={() => {
                               console.log('Login Failed');
                              }}
                            />
                        </div> */}
                        
                        <p className="text-sm leading-relaxed text-grey-900">
                          Not registered yet? <Link to={'/employer/signup/'}><span className="font-bold text-grey-700 cursor-pointer">Create an Account</span></Link>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
          </div>
    </div>
  )
}

export default EmpLogin
