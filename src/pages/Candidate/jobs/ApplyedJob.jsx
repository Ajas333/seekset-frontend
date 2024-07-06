import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import StatusJob from '../../../components/candidate/utilities/StatusJob';


function ApplyedJob() {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')
    const navigate=useNavigate();   
    const authentication_user = useSelector((state)=> state.authentication_user);
    const [jobData, setJobData] = useState([])
    const [selectedJob, setSelectedJob] = useState(null);
    const [isOpen, setIsOpen] =useState(false)

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
            const fetchApplyedJobs = async ()=>{
                try{
                    const responce = await axios.get(baseURL+'/api/empjob/getApplyedjobs/',{
                        headers:{
                          'Authorization': `Bearer ${token}`,
                          'Accept' : 'application/json',
                          'Content-Type': 'multipart/form-data'
                      }
                      })
                    //   console.log("responvce from backend job data",responce)
                      if(responce.status == 200){
                        setJobData(responce.data)
                        setSelectedJob(responce.data[0]);
                      }
                      else{
                        alert("something went wrong")
                      }
                }
                catch(error){
                    // console.log(error)
                }
            }
            fetchApplyedJobs();
        
    }, [])
    const formatDate = (dateTimeString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    }
    const handleJobClick = (job) => {
        setSelectedJob(job);
        toggleDrawer()
      };
    console.log("job data",jobData)
    if(jobData.length ==0){
        console.log("onnullllaaaaaaaaaa")
    }
    // console.log("current job data",selectedJob)
  return (
    <div className='mt-14  min-h-[30rem]'>
      <div className='flex gap-3'>
        {jobData.length >0 ?(
            <>
            <div className=' max-h-full w-full md:w-2/5 p-3 flex flex-col text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>
            <div className='flex bg-white mb-2 p-3 rounded-md px '>
                <span className='text-lg font-bold text-gray-600'>Applyed Jobs</span>
            </div>
            <div className='overflow-y-auto scroll-smooth max-h-screen'>
                {jobData.map((job)=>(
                    
                    <div key={job.id} onClick={() => handleJobClick(job)} className=' relative bg-white rounded-md hover:shadow-md py-3 mb-4 '>
                        <div className="absolute top-0 right-0 bg-red-100 text-red-900 px-2 py-1 rounded-bl-lg">
                            Applyed On: {formatDate(job.applyed_on)}
                        </div>
                        
        
                        <div className='flex gap-3'>
                            <div className="group relative h-16 w-16 overflow-hidden rounded-lg ml-4">
                                <img src={baseURL+job.job.employer.profile_pic} alt="" className="h-full w-full object-cover text-gray-700" />
                            </div>
                            <div className='flex flex-col'>
                            
                                <p className="overflow-hidden md:text-2xl font-semibold sm:text-xl">{job.job.title}</p>
                           
                            <p className='text-base text-gray-500'>{job.job.employer.user_full_name}</p>
                            </div>
                        </div>
        
                        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                            
                            
                            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                            <div className="">Job Posted:
                                <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{formatDate(job.job.posteDate)}</span>
                            </div>
                            <div className="">Location:
                                <span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-blue-900">{job.job.location}</span>
                            </div>
                            </div>
                            
                            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                            <div className="">Experience:
                                <span className="ml-2 mr-3 rounded-full bg-pink-100 px-2 py-0.5 text-green-900">{job.job.experiance}</span>
                            </div>
                            <div className="">Salary:
                                <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.job.lpa} lpa</span>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className='hidden md:block  w-3/5 p-3 mr-3  text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>
                    <StatusJob toggleDrawer={toggleDrawer} selectedJob={selectedJob}/>    
            </div>
            </>
        ):(
            <div className='flex justify-center  w-full'>
                <div className=''>
                    <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
                        <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
                            <div
                            className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full"
                            >
                            <svg
                                viewBox="0 0 48 48"
                                height="100"
                                width="100"
                                y="0px"
                                x="0px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="37.081"
                                y1="10.918"
                                x2="10.918"
                                x1="37.081"
                                id="SVGID_1__8tZkVc2cOjdg_gr1"
                                >
                                <stop stop-color="#60fea4" offset="0"></stop>
                                <stop stop-color="#6afeaa" offset=".033"></stop>
                                <stop stop-color="#97fec4" offset=".197"></stop>
                                <stop stop-color="#bdffd9" offset=".362"></stop>
                                <stop stop-color="#daffea" offset=".525"></stop>
                                <stop stop-color="#eefff5" offset=".687"></stop>
                                <stop stop-color="#fbfffd" offset=".846"></stop>
                                <stop stop-color="#fff" offset="1"></stop>
                                </linearGradient>
                                <circle
                                fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                                r="18.5"
                                cy="24"
                                cx="24"
                                ></circle>
                                <path
                                d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#10e36c"
                                fill="none"
                                ></path>
                                <path
                                d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#10e36c"
                                fill="none"
                                ></path>
                                <polyline
                                points="16.5,23.5 21.5,28.5 32,18"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#10e36c"
                                fill="none"
                                ></polyline>
                            </svg>
                            </div>
                            <h4 className="text-xl text-gray-100 font-semibold mb-5">
                            Currently there is no applications
                            </h4>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
        )}
        
        <div className='block md:hidden'>
        <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='bottom'
                size={600}
                className='bla bla bla'
            >
                <div className='bg-gray-50'>
                    <StatusJob toggleDrawer={toggleDrawer} selectedJob={selectedJob}/>
                </div>
            </Drawer>
        </div>
      </div>
    </div>
  )
}

export default ApplyedJob
