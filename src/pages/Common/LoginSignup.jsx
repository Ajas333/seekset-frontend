import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import CandidateLogin from '../Candidate/CandidateLogin';
import CandidateSignin from '../Candidate/CandidateSignin';
import EmpLogin from '../Employer/EmpLogin';
import EmpSignup from '../Employer/EmpSignuo';
import Spinner from './Spinner';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

function LoginSignup() {
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    const [isSignup, setIsSignup] = useState(false)
    const [isEmployer, setIsEmployer] = useState(false)
    const [isSpinner , setIsSpinner] = useState(false)
  
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(
          NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8ee1fc,
            backgroundColor: 0x4f,
            points: 16.00,
            maxDistance: 22.00
          })
        );
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);
  return (
    
    <div className='w-screen h-screen flex justify-center items-center relative' ref={vantaRef} >
    <div className='bg-white rounded-tr-4xl rounded-bl-4xl h-auto   w-3/5 flex'>
      {!isSpinner && (
        <>
          <div className='content bg-gradient-to-br from-blue-100 to-blue-400 w-2/4 rounded-bl-4xl p-8 relative'>
          <div className='absolute top-0 left-0'>
            <Link to={'/'}>
              <div className='ml-3  flex cursor-pointer'>
                <div className='mt-2'>
                  <img src={logo} alt="" className='w-10 h-8'/>
                </div>
                <p className='mt-2 text-xl font-bold font-sans text-indigo-900'>
                  SeekSet
                </p>
            </div>
            </Link>
            </div>
            <div className='flex flex-col h-full justify-between'>
              <div className='p-4 mb-6'>
                <h2 className='text-3xl font-bold text-blue-800 mb-2'>
                  {isSignup ? 'Welcome! Sign up to get started' : 'Welcome back! Log in to continue'}
                </h2>
                <p className='text-gray-700'>
                  {isSignup
                    ? 'Join our community and discover great opportunities.'
                    : 'Stay connected with us to keep exploring new jobs.'}
                </p>
              </div>
              <div className='flex justify-center mt-4'>
                {isSignup ? (
                  <p className='text-gray-700'>
                    Already have an account?{' '}
                    <span onClick={() => setIsSignup(false)} className='underline text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer'>
                      LogIn now
                    </span>
                  </p>
                ) : (
                  <p className='text-gray-700'>
                    Don't have an account?{' '}
                    <span onClick={() => setIsSignup(true)} className='underline text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer'>
                      Sign up now
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='inputs w-2/4 bg-white p-8 rounded-tr-4xl'>
            <div>
              {!isSignup && !isEmployer && <CandidateLogin />}
              {!isSignup && isEmployer && <EmpLogin />}
              {isSignup && !isEmployer && <CandidateSignin setIsSpinner={setIsSpinner}/>}
              {isSignup && isEmployer && <EmpSignup setIsSpinner={setIsSpinner}/>}
            </div>
            <div onClick={() => setIsEmployer(!isEmployer)} className='flex justify-center cursor-pointer'>
              <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-green-400">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-green-400">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                  </svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                  {!isSignup && !isEmployer && 'Employer Login'}
                  {!isSignup && isEmployer && 'Candidate Login'}
                  {isSignup && !isEmployer && 'Employer Signup'}
                  {isSignup && isEmployer && 'Candidate Signup'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {isSpinner && (
        <div className='w-full flex justify-center items-center'>
          <Spinner />
        </div>
      )}
    </div>
  </div>
    
  )
}

export default LoginSignup
