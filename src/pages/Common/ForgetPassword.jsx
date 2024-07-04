import React,{useState} from 'react'
import f_pass from '../../assets/forgot_pass.svg'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import Spinner from './Spinner';
import { toast } from 'react-toastify';


function ForgetPassword() {
  const [formError,setFormError]=useState('')
  // const baseURL='http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_API_BASEURL
  const navigate = useNavigate();
  const [isSpinner,setIsSpiner] = useState(false)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("email",e.target.email.value);
    setIsSpiner(true)
    try{
      const responce = await axios.post(baseURL+'/api/account/forgot_pass/',formData)
      // console.log(responce)
      if(responce.status === 200){
        setFormError('')
        toast.success('Password reset link send to email!',{
          position: "top-center",
        });
        setIsSpiner(false)
        navigate('/login')
      }
      else{
        setFormError(responce.data.message)
      }
    }
    catch(error){
      // console.log(error)
    }
  }
  
  return (
    <div>
        {!isSpinner && (
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
                              
                            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center" method='POST'>
                                
                                <p className="mb-4 text-grey-700">Enter your email</p>
                                
                                <div className="flex items-center mb-3">
                                  <hr className="h-0 border-b border-solid border-grey-500 grow" /> 
                                </div>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="example@gmail.com"
                                  className="flex items-center w-full px-4 py-3 mr-2  text-sm font-medium outline-none focus:bg-grey-400 mb-3 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                  /> 
                                  {formError ?
                                      <div className='flex justify-start mb-5  pl-3 text-red-600 '>
    
                                        <p >{formError}</p>
                                      </div>
                                  : ""
                                }
                                
                                <button type='submit' className="w-full px-4 py-3 mb-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                  Send Otp
                                </button>
                                
                              </form>
                            </div>
                          </div>
                      </div>
                </div>
              </div>     
            </div> 
        )}
       {isSpinner && (
         <div className='flex w-full h-screen justify-center items-center'>
         <Spinner/>
       </div>
       )}
    </div>
  )
}

export default ForgetPassword
