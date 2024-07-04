import React,{useEffect,useState} from 'react'
import Sidebar from '../../components/admin/Utilities/Sidebar'
import axios from 'axios';



function AdminHome() {
  // const baseURL = "http://127.0.0.1:8000";
  const [counts,setCounts] = useState()
  const baseURL = import.meta.env.VITE_API_BASEURL
  
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(baseURL+'/dashboard/home/')
        // console.log(response)
        if(response.status == 200){
          setCounts(response.data)
        }
      }
      catch(error){
        // console.log(error)
      }
    }
    fetchData()
  },[])

  // console.log(counts)
  return (
    <div className='flex '>
      <div className='w-64'>
        <Sidebar/>
      </div>
      <div className='w-full mt-12'>
        
        <div className='flex gap-8 px-5 pt-5 justify-center'>
          <div className='flex flex-col w-40 h-24 rounded-md bg-gray-100 hover:bg-gray-200'>
              <div className='flex justify-center mt-2'>
                <span className='text-xl font-bold '>Candidates</span>
              </div>
              <div className='flex justify-center'>
                <div className=' flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full'>
                  <span className='text-lg font-semibold text-white'>{counts ? (counts.candidates_count) : ""}</span>
                </div>
              </div>
          </div>
          <div className='flex flex-col w-40 h-24 rounded-md bg-gray-100 hover:bg-gray-200'>
              <div className='flex justify-center mt-2'>
                <span className='text-xl font-bold '>Employers</span>
              </div>
              <div className='flex justify-center'>
                <div className=' flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full'>
                  <span className='text-lg font-semibold text-white'>{counts ? counts.employers_count : ""}</span>
                </div>
              </div>
          </div>
          <div className='flex flex-col w-40 h-24 rounded-md bg-gray-100 hover:bg-gray-200'>
              <div className='flex justify-center mt-2'>
                <span className='text-xl font-bold '>Jobs</span>
              </div>
              <div className='flex justify-center'>
                <div className=' flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full'>
                  <span className='text-lg font-semibold text-white'>{counts ? (counts.jobs_count) : ""}</span>
                </div>
              </div>
          </div>
          <div className='flex flex-col w-40 h-24 rounded-md bg-gray-100 hover:bg-gray-200'>
              <div className='flex justify-center mt-2'>
                <span className='text-xl font-bold '>Applications</span>
              </div>
              <div className='flex justify-center'>
                <div className=' flex justify-center items-center bg-blue-400 w-12 h-12 rounded-full'>
                  <span className='text-lg font-semibold text-white'>{counts ? ( counts.applications_count ) : ""}</span>
                </div>
              </div>
          </div>
       
         
        </div>
        
        <div className='activity  ml-10 mt-10'>
         <div className='bg-indigo-300 px-5 flex justify-center' >
            <span className='text-gray-700 font-bold text-lg '>Today's Acitivity </span>
         </div>
        </div>

      </div>
    </div>
  )
}

export default AdminHome
