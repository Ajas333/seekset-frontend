import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import ApplyCard from '../../../components/employer/utilities/ApplyCard'
import CandidateView from './CandidateView'
import SideBar from '../../../components/employer/SideBar'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ApplicationData from '../../../components/employer/utilities/ApplicationData'
import { FaArrowLeft } from "react-icons/fa6";


function Applications() {
    const [isOpen, setIsOpen] =useState(false)
    const [applicationOpen,setApplicationOpne] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [jobData, setJobData] = useState([])
    const [selectedJob, setSelectedJob] = useState(null);
    const [change,setChange] = useState(true)
    const [current,setCurrent] = useState(null)
    const [status,setStatus] = useState('')
    const [questions,setQuestions] = useState([])
    // const baseURL='http://127.0.0.1:8000/'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const toggleApplication = () =>{
        setApplicationOpne(!applicationOpen)
    }
    
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
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
           const responce = await axios.get(baseURL+'/api/empjob/getApplicationjobs/',{
             headers:{
               'Authorization': `Bearer ${token}`,
               'Accept' : 'application/json',
               'Content-Type': 'multipart/form-data'
           }
           })
        //    console.log("applications page........",responce)
           if(responce.status == 200){
             setJobData(responce.data.data)
             setSelectedJob(responce.data.data[0]);
             if (responce.data.data[0].questions !== null){

                 setQuestions(responce.data.data[0].questions)
             }
             else{
                setQuestions([])
             }
            }
        }
        catch(error){
            // console.log("something went wrond",error)
        }
    };
    
    fetchJobDetails();
}, [])


const handleJobClick =(job)=>{
    setSelectedJob(job);
    toggleApplication()

}

return (
    <div className=' flex flex-col md:flex-row pt-14 md:pt-12 min-h-[35rem]'>
        <div className=''>
            {isSmallScreen ? (
                <>
                <div className='flex flex-row fixed z-50'>
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
                  
                </div>
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <div className='bg-gray-50'><SideBar /></div>
                    </Drawer>
                    <Drawer
                        open={applicationOpen}
                        onClose={toggleApplication}
                        size={580}
                        direction='bottom'
                        className="" >
                        <div className='className="bg-gray-50 overflow-y-auto h-64"'>
                            <div className=' md:mt-0 md:w-3/5 max-h-screen p-3 mr-3  text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>                        
                                <div className='flex bg-white mb-2 p-3 rounded-md px relative'>
                                <div onClick={()=>setChange(!change)} className=' absolute right-2 hover:right-4  transition-transform  text-blue-400 hover:text-blue-600 '>
                                    <FaArrowLeft size={27}  />
                                </div>
                                    <span className='text-lg font-bold text-gray-600'>Applied Candidates</span>
                                </div>
                                <div className='overflow-y-auto scroll-smooth max-h-full '>
                                    {change ? 
                                        (<ApplyCard selectedJob={selectedJob} setChange={setChange} setCurrent={setCurrent} setStatus={setStatus}/>) : 
                                        ( <CandidateView selectedJob={selectedJob} setChange={setChange} current={current} questions={questions}/>)}
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </>
            ) : (
                <SideBar />
            )}
        </div>
        <div className='w-screen mt-5 md:mt-3 '>
            <div className='flex gap-3'>
                <div className=' w-full mx-2 mt-4 md:mt-0 md:mx-0 md:w-2/5'>
                    <ApplicationData jobData={jobData} handleJobClick={handleJobClick} toggleApplication={toggleApplication} />
                </div>
                    <div className='w-full  md:mt-0 hidden md:block md:w-3/5 max-h-screen p-3 mr-3  text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>
                        
                            <div className='relative flex bg-white mb-2 p-3 rounded-md px '>
                                <span className='text-lg font-bold text-gray-600'>Applied Candidates</span>
                                <div onClick={()=>setChange(!change)} className=' absolute right-2 hover:right-4  transition-transform  text-blue-400 hover:text-blue-600 '>
                                    <FaArrowLeft size={27}  />
                                </div>
                            </div>

                            <div className='overflow-y-auto scroll-smooth max-h-full '>
                                {change ? 
                                    (<ApplyCard selectedJob={selectedJob} setChange={setChange} setCurrent={setCurrent} setStatus={setStatus}/>) : 
                                    ( <CandidateView selectedJob={selectedJob} setChange={setChange} current={current} questions={questions}/>)}
                            
                            </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Applications
