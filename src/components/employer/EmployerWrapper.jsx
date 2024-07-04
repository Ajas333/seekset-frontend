import React,{useEffect} from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom'
import EmpHome from '../../pages/Employer/EmpHome'
import EmpLogin from '../../pages/Employer/EmpLogin'
import EmpSignup from '../../pages/Employer/EmpSignuo'
import ForgetPassword from '../../pages/Common/ForgetPassword'
import Otp from '../../pages/Common/Otp'
import EmployerHeader from './EmployerHeader'
import { useDispatch,useSelector } from 'react-redux';
import isAuthUser from '../../utils/isAuthUser'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice'
import axios from 'axios'
import EmpProfileCreation from '../../pages/Employer/profile/EmpProfileCreation'
import PostJob from '../../pages/Employer/job/PostJob'
import JobDetail from '../../pages/Employer/job/JobDetail'
import Applications from '../../pages/Employer/job/Applications'
import CandidateView from '../../pages/Employer/job/CandidateView'
import Chat from '../../pages/Employer/Message/Chat'
import Shedules from '../../pages/Employer/Interview/Shedules'
import EmpProfile from '../../pages/Employer/profile/EmpProfile'
import Footer from '../Footer'


function EmployerWrapper() {
  const navigate=useNavigate()
  const baseURL = import.meta.env.VITE_API_BASEURL
  // const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access'); 
  const dispatch =useDispatch()
  const authentication_user = useSelector(state => state.authentication_user);

  const checkAuth = async () =>{
    const isAuthenticated = await isAuthUser();
    if (isAuthenticated.name){
      try{
          const responce = await axios.get(baseURL+'/api/account/user/details',{
            headers:{
              'authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            }
          })
          // console.log("inside userwrapper data.........from backend",responce)
          if(responce.status == 200){
            dispatch(
              set_Authentication({
                name:responce.data.data.full_name,
                email:responce.data.data.email,
                isAuthenticated:true,
                usertype:responce.data.data.usertype,
              })
            )
            dispatch(
              set_user_basic_details({
                profile_pic : responce.data.user_data.profile_pic,
                user_type_id : responce.data.user_data.id,
                
              })
            )
            
          }
      }
      catch(error){
        // console.log(error)
      }
    }
    else{
      navigate('/login')
    }
  };


  useEffect(() => {
    
    //  console.log("ayyooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      checkAuth();
    
    
  
  }, [authentication_user])
// console.log("inside employer wrapper.................",authentication_user)
  return (
    <div>
      <EmployerHeader/>
      <Routes>
        {/* <Route path='/' element={<EmpLogin/>}> </Route>
        <Route path='/signup' element={<EmpSignup/>}></Route> */}
        {/* <Route path='/forgot' element={<ForgetPassword/>}></Route> */}
        <Route path='/' element={<EmpHome/>}></Route>
        <Route path='/otp' element={<Otp/>} ></Route>
        <Route path='/profile_creation' element={<EmpProfileCreation/>} ></Route>
        <Route path='/profile' element={<EmpProfile/>}></Route>
        <Route path='/postjob' element={<PostJob/>}></Route>
        <Route path='/jobdetail/:jobId' element={<JobDetail/>} ></Route>
        <Route path='/applications' element={<Applications/>}></Route>
        <Route path='/candidateView' element={<CandidateView/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/shedules' element={<Shedules/>}></Route>
        {/* <Route path='/interview' element={<InterviewRoom/>}></Route> */}

      </Routes>
      <Footer/>
      
    </div>
  )
}

export default EmployerWrapper
