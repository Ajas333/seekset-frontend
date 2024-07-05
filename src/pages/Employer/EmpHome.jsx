import React, { useState,useEffect } from 'react'
import SideBar from '../../components/employer/SideBar'
import { Link } from 'react-router-dom'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import axios from 'axios'



function EmpHome() {
  const [jobData, setJobData] = useState([])
  const [isOpen, setIsOpen] =useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASEURL
  // const baseURL='http://127.0.0.1:8000/'
  const token = localStorage.getItem('access')
  const [isJob,setIsJob] = useState(false)
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
}

const handleResize = () => {
  setIsSmallScreen(window.innerWidth < 640);
};

useEffect(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Check initial screen size

  return () => {
      window.removeEventListener('resize', handleResize);
  };
}, []);

  useEffect(() => {
   const fetchJobDetails = async ()=>{
    try{
      const responce = await axios.get(baseURL+'/api/empjob/getjobs/',{
        headers:{
          'Authorization': `Bearer ${token}`,
          
          'Accept' : 'application/json',
          'Content-Type': 'multipart/form-data'
      }
      })
      // console.log(responce)
      if(responce.status == 200){
        setJobData(responce.data.data)
        console.log("job data",jobData)
      }
      else{

      }
    }
    catch(error){
      // console.log("something went wrond",error)
    }
   };

   fetchJobDetails();
  }, [])
  return (
    <div className='pt-14 flex min-h-[35rem]'>
      <div>
            {isSmallScreen ? (
                <>
                    <button onClick={toggleDrawer} title="Add New" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"
                        className="stroke-indigo-300 fill-none group-hover:fill-indigo-400 group-active:stroke-indigo-200 group-active:fill-indigo-300 group-active:duration-0 duration-300"
                      >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      strokeWidth="1.5"
                    ></path>
                      <path d="M8 12H16" strokeWidth="1.5"></path>
                      <path d="M12 16V8" strokeWidth="1.5"></path>
                    </svg>
                  </button>

                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <div className='bg-gray-50'><SideBar /></div>
                    </Drawer>
                </>
            ) : (
                <SideBar />
            )}
        </div>
      <div className="p-4 w-full y">
        
        <div className=''>
          {jobData.length >0 ?
              jobData.map((job,index)=>(
                  
                  <div key={index} className="group mx-2 px-8 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg  sm:mx-auto">
                      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                      <Link to={`/employer/jobdetail/${job.id}`}> <p className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"> {job.title} </p></Link>
                        <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                          <div className="">Status:{job.active ==true?
                          (<span class="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> Active</span>):
                        (<span class="ml-2 mr-3 rounded-full bg-red-100 px-2 py-0.5 text-red-900"> expired</span>)}
                          </div>
                          <div className="">Location:<span class="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-blue-900">{job.location}</span></div>
                        </div>
                        <div className="mt-5 flex flex-col space-y-1 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                          <div className="flex">Experience:<span class="ml-2 mr-3 rounded-full bg-pink-100 px-2 py-0.5 text-green-900"> {job.experiance}</span></div>
                          <div className="">Salary:<span class="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.lpa} lpa</span></div>
                        </div>
                      </div>
                </div>
             
              ))
              
              :
              (
                <div className='flex justify-center items-center'>
                  <div className="bg-gray-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Add your first job</h3>
                    <p className="text-muted-foreground mb-4">
                      There are currently no job listings. Post a job to start attracting candidates.
                    </p>
                    <Link to={'/employer/postjob/'}>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Post Job
                      </button>
                      </Link>
                  </div>
                </div>
              ) }
            
        </div>
      </div>
    </div>
 
  )
}

export default EmpHome
