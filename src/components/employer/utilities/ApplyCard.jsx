import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


function ApplyCard({selectedJob,setChange,setCurrent,setStatus}) {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const [applications,setApplications]=useState([])
    // console.log("inside Apply card",selectedJob)
    useEffect(() => {
       if(selectedJob){
        setApplications(selectedJob.applications)
       }
    }, [selectedJob])
    // console.log("applications....",applications)
    // console.log("selected jobsssssssssssssssssssssssss",selectedJob)
    const handleClick =(data)=>{
        setChange(false)
        setCurrent(data);
        
    }
  return (
    <div>
        {applications.map((data,index)=>(
            <div key={index} className='bg-white rounded-md hover:shadow-md py-3 mb-4'>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <div className="group relative h-16 w-16 overflow-hidden rounded-lg ml-4">
                            <img src={baseURL+data.candidate.profile_pic} alt="" className="h-full w-full object-cover text-gray-700" />
                        </div>
                        <div className='flex flex-col'>
                        
                            <p className="overflow-hidden md:text-2xl font-semibold sm:text-xl">{data.candidate.user_name}</p>
                        
                        <p className='text-base text-gray-500'>{data.candidate.education[0].education}</p>
                        </div>
                    </div>
                    <div className='flex items-center pr-3'>
                       
                        <button className="px-6 py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                            onClick={() => handleClick(data)}  >View
                         </button>
                        
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ApplyCard
