    import React, { useState,useEffect } from 'react'
    import { useLocation } from 'react-router-dom';
    import { Link, useNavigate } from 'react-router-dom'
    import logo from '../../assets/logo.png'
    import otp_img from '../../assets/otp.svg'
    import axios from 'axios'
    import Swal from 'sweetalert2'
   
    

    function Otp() {
      const baseURL = import.meta.env.VITE_API_BASEURL
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const [otpValue, setOtpValue] = useState('');
        const navigate = useNavigate();
        const twoDigits = (num) => String(num).padStart(2, '0');
        // const baseURL = 'http://127.0.0.1:8000/';
        const [resend, setResend] = useState(false);
        const email= localStorage.getItem('email')
       
        const [minute, setMinute] = useState(1);
      
        const [second, setSecond] = useState(1);

        useEffect(() => {
          const interval = setInterval(() => {
            if (second > 0) {
              setSecond((prevSecond) => prevSecond - 1);
            } else {
              if (minute === 0) {
                clearInterval(interval);
                setResend(true);
              } else {
                setSecond(59);
                setMinute((prevMinute) => prevMinute - 1);
              }
            }
          }, 1000);
      
          return () => {
            clearInterval(interval);
          };
        }, [minute, second]);
      
      
        const handleOTPSubmit = async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(baseURL + '/api/account/otp_verify/', { otp: otpValue, email });
            // Handle response
            // console.log("response............",response);
            if(response.status == 200){
              localStorage.removeItem('email');
              if(response.data.usertype ==="candidate"){
                 navigate(`/login`)
              }
              else if(response.data.usertype === "employer"){
                navigate('/login')
              }
            }
          } catch (error) {
            // console.error('Error verifying OTP:', error);
          }
        };
      
        
      
        const ResendOtp = async () => {
          try {
            const response = await axios.post(`${baseURL}/api/account/resend_otp/`, { email });
            // console.log(response.data);
            setMinute(1);
            setSecond(30);
            setResend(false);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'OTP sent',
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            // console.error('Error resending OTP:', error);
          }
        };
      
    return (
        <div>
            <div className='absolute m-2'>
            <img src={logo} alt="" className='w-12 h-10' />
            </div>
            <div className='flex w-full h-screen bg-blue-50'>
            <div className='hidden md:inline md:w-2/5 '>
                    <div className='mt-16 mx-4  md:w-full'>
                        <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Find your Dreem Job Now</h3>
                        <p className='text-blue-500 font-semibold'>5 lakh+ jobs for you to explore</p>
                    </div>
                    <div className='flex justify-center'>
                    <img src={otp_img} alt="" className='w-96' />
                    </div>
            </div>
            <div className= 'w-full h-screen md:w-3/5 flex justify-end '>
                <div className='bg-white w-full h-full  md:rounded-l-lg shadow-2xl '>
                    <div className='flex h-full'>  
                        <div className="flex items-center justify-center w-full ">
                            <div className="flex items-center ">
                            
                            <form onSubmit={handleOTPSubmit} method='POST' className="flex flex-col w-full h-full pb-6 text-center">
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Enter Otp</h3>                             
                                <p className="mb-4 text-grey-700">otp send to {email}</p>
                                
                                <div className="flex items-center mb-3">
                                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>

                                <input
                                name="otp"
                                placeholder={resend ? "Please resend OTP" : "Enter OTP"}
                                required
                                onChange={(e)=>setOtpValue(e.target.value)}
                                className="flex items-center w-full px-4 py-3  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                />
                                <div className='mb-5 flex justify-start px-3'>
                                    <p className='text-xs font-medium text-green-500 '>Resend otp in :<span className='text-red-600'> {twoDigits(minute)}:{twoDigits(second)}</span> </p>
                                </div>
                                {resend ? 
                                <p onClick={ResendOtp} className="cursor-pointer w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-red-600 focus:ring-4 focus:ring-red-100 bg-red-500">
                                Resend Otp
                                </p> :
                                <button type='submit' className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                Sign Up
                                </button>
                                }
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    )
    }

    export default Otp
