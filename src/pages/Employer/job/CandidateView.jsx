import React,{useEffect,useState}from 'react'
import axios from 'axios'
import SheduleModal from '../../../components/employer/utilities/SheduleModal'
import Swal from 'sweetalert2'
import { w3cwebsocket as W3CWebSocket } from "websocket";

import ChatModal from '../../../components/employer/utilities/ChatModal';

function CandidateView({selectedJob,setChange,current,questions}) {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')
    const [status,setStatus] = useState(false)
    const [appStatus,setAppStatus]=useState(current.status)
    const [modal,setModal] = useState(false)
    const [chat,setChat]=useState(false)
    const [applicationId,setApplicationId] = useState()


    const value = ['Resume Viewd','Interview Sheduled','Accepted','Rejected','Interview Cancelled']
    const profile_pic = baseURL+current.candidate.profile_pic
    const userName = current.candidate.user_name
    const candidate_id = current.candidate.id
    const employer_id = selectedJob.employer_id
    const emp_name = selectedJob.employer_name

    // console.log()
    
    useEffect(()=>{
        const val = value.filter((e)=>appStatus == e)
        // console.log("vallllllllllllllllllllllll",val)
        if(val.length<1){
            setStatus(true)
        }
    },[])

    useEffect(()=>{
        if(status){
            changeStatus('Application Viewd')
        }
    },[status])
  
    const changeStatus = async (action)=>{
        try{
            const responce = await axios.post(`${baseURL}/api/empjob/applicationStatus/${current.id}/`,{action},{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
            });
            // console.log(responce)
        }
        catch(error){
            // console.log(error)
        }
    }
   
    const toggleModal = ()=>{
        setModal(true)
    } 
    const handleInterview = async()=>{
        changeStatus('Interview Sheduled')
        const responce = await axios.post()
    }
    const handlResume = ()=>{
        changeStatus('Resume Viewd')
        setAppStatus('Resume Viewd')
        // console.log("resume change ststus.................")
    }
    const cancellApplication = async ()=>{
        try{
            const formData=new FormData()
            formData.append("candidate_id",current.candidate.id)
            formData.append("job_id",current.job)
            const responce = await axios.post(`${baseURL}/api/interview/cancellApplication/`,formData,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
            })
            // console.log(responce)
            if(responce.status == 200){
                setAppStatus('Interview Cancelled')
                changeStatus('Interview Cancelled')
                Swal.fire({
                    title: "Cancelled!",
                    text: "Application Cancelled.",
                    icon: "success"
                  });
            }
        }
        catch(error){
            // console.log(error)
        }
    }
    const handleCancell = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancell the interview",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                cancellApplication();
            }
          });  
    }

    

    const handleChat = ()=>{
        setChat(true)
    }
         
  return (
    <div className=''>
      <div className=''>
      {modal && <SheduleModal  setModal={setModal} candidate_id={current.candidate.id} job_id={current.job} changeStatus={changeStatus} setAppStatus={setAppStatus}/>}
      {chat && <ChatModal candidate_id={candidate_id} employer_id={employer_id} setChat={setChat} profile_pic={profile_pic} userName={userName} emp_name={emp_name} />}
            <div className='absolute right-10 pr-3 pt-3 flex flex-col gap-2 '>
                <button onClick={()=> setChange(true)} type="button" className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Go back</span>
                </button>
                {appStatus === 'Interview Cancelled' ?(
                    <button className="px-6 py-1 rounded-full bg-gradient-to-b from-green-500 to-green-600 text-white font-bold focus:ring-2 focus:ring-green-400 hover:shadow-xl transition duration-200 disabled"
                    >Cancelled
                  </button>
                ):appStatus === 'Interview Sheduled' ? (
                    <button className="px-6 py-1 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white font-bold focus:ring-2 focus:ring-red-400 hover:shadow-xl transition duration-200"
                    onClick={handleCancell}>Cansell Interview
                  </button>
                ):(
                    <button className="px-6 py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                  onClick={toggleModal}>Shedule Interview
                </button>
                )}
                <button className="px-6 py-1 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                >Reject
                </button>
                <button onClick={handleChat} className="px-6 py-1 rounded-full bg-gradient-to-b from-gray-400 to-gray-500 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                >Chat
                </button>
            </div>
           
           <div>            
                <span className='text-base font-bold text-gray-800'>Candidate Info</span>
           </div>
           <div className='flex gap-3 mt-3'>
                        <div className="group relative h-16 w-16 overflow-hidden rounded-lg ml-4">
                            <img src={baseURL+current.candidate.profile_pic} alt="" className="h-full w-full object-cover text-gray-700" />
                        </div>
                        <div className='flex flex-col'>
                        
                            <p className="overflow-hidden md:text-2xl font-semibold sm:text-xl">{current.candidate.user_name}</p>
                        
                        {/* <p className='text-base text-gray-500'>{current.education[0].education}</p> */}
                        </div>
                    </div>
                <div className=' py-4 px-3  rounded-md flex flex-col gap-2'>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Email:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.email}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Phone:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.phone}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Gender:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.Gender}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Date of birth:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.dob}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Date of birth:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.dob}</p>
                    </div>
             </div>
             <div>            
                <span className='text-base font-bold text-gray-800'>Education Info</span>
           </div>
           <div className=' py-4 px-3  rounded-md flex flex-col gap-2'>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Qualification:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.education[0].education}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Specialisation:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.education[0].specilization}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Completed year:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.education[0].completed}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>College:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.education[0].college}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Mark in CGPA:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.education[0].mark}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Skills:</span>
                    <p className='text-base text-gray-700 '>{current.candidate.skills}</p>
                    </div>
             </div>
             <div>            
                <span className='text-base font-bold text-gray-800'>Links</span>
           </div>
           <div className=' py-3 px-3  rounded-md flex flex-col gap-2'>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Linkedin:</span>
                    <p className='text-base text-blue-700 '>{current.candidate.linkedin}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Github:</span>
                    <p className='text-base text-blue-700 '>{current.candidate.github}</p>
                    </div>                  
                    <div className='flex items-center gap-2 '>
                    <span className='text-gray-700 font-semibold text-lg'>Resume:</span>
                    <p className='text-base text-blue-700 '><a 
                            href={`${baseURL}${current.candidate.resume}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                            onClick={handlResume}
                        >
                            View Resume
                        </a></p>
                    </div>                  
             </div>
             {questions && 
             <div className=''>
                <div>            
                    <span className='text-base font-bold text-gray-800'>QA</span>
                </div>
                <div className='px-3 flex gap-2'>
                    <div className='flex flex-col gap-1'>
                        {questions.map((data)=>(
                            <p className='text-gray-700  '>{data.text} :</p>
                        ))}
                    </div>
                    <div className='flex flex-col gap-1'>
                        {current.answers.map((data)=>(
                            <p>{data.answer_text}</p>
                        ))}
                    </div>
                </div>
             </div>
             }
            
      </div>
    </div>
  )
}

export default CandidateView
