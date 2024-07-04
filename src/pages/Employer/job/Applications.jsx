import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import ApplyCard from '../../../components/employer/utilities/ApplyCard'
import CandidateView from './CandidateView'
import SideBar from '../../../components/employer/SideBar'



function Applications() {
    const [jobData, setJobData] = useState([])
    const [selectedJob, setSelectedJob] = useState(null);
    const [change,setChange] = useState(true)
    const [current,setCurrent] = useState(null)
    const [status,setStatus] = useState('')
    const [questions,setQuestions] = useState([])
    // const baseURL='http://127.0.0.1:8000/'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')

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



const formatDate = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
}

// console.log("job data",jobData)

const handleJobClick =(job)=>{
    setSelectedJob(job);
    if (job.questions !== null){

        setQuestions(job.questions)
    }
    else{
        setQuestions([])
    }
//    console.log("jobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",job)
}

// console.log("selected jobs.......",selectedJob)
// console.log("current candidatemigkjg",current)
// console.log("questionsssssssssssssssss",questions)
return (
    <div className=' flex pt-12'>
        <div>
        <SideBar/>
        </div>
        <div className='w-full'>
            <div className='flex gap-3'>
            <div className=' max-h-screen w-2/5 p-3 flex flex-col text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>
                <div className='flex bg-white mb-2 p-3 rounded-md px '>
                    <span className='text-lg font-bold text-gray-600'>Applications</span>
                </div>
                <div className='overflow-y-auto scroll-smooth max-h-full'>
                    {jobData.map((job)=>(
                        <div key={job.id} onClick={() => handleJobClick(job)} className=' relative bg-white rounded-md hover:shadow-md py-3 mb-4 '>
                            <div className="absolute top-0 right-0 bg-red-100 text-red-900 px-2 py-1 rounded-bl-lg">
                                Expiry: {job.applyBefore}
                            </div>
                            <div className="absolute bottom-0 right-0   px-2 py-1 rounded-bl-lg">
                              <span className='bg-green-400 rounded-full px-2'>{job.applications.length}</span>
                            </div>
                        
        
                        <div className='flex gap-3 ml-2'>
                            <div className=''>
                                <div>
                                    <p className="overflow-hidden md:text-2xl font-semibold sm:text-xl">{job.title}</p>
                                    <p className='text-base text-gray-500'>{job.employer_name}</p>
                                </div>
                            </div>
                        </div>
        
                        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                            
                            
                            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                            <div className="">Job Posted:
                                <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{formatDate(job.posteDate)}</span>
                            </div>
                            <div className="">Location:
                                <span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-blue-900">{job.location}</span>
                            </div>
                            </div>
                            
                            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                            <div className="">Experience:
                                <span className="ml-2 mr-3 rounded-full bg-pink-100 px-2 py-0.5 text-green-900">{job.experiance}</span>
                            </div>
                            <div className="">Salary:
                                <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.lpa} lpa</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>
            <div className='w-3/5 max-h-screen p-3 mr-3 flex flex-col text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl'>
                    {/* <StatusJob selectedJob={selectedJob}/> */}
                    <div className='flex bg-white mb-2 p-3 rounded-md px '>
                        <span className='text-lg font-bold text-gray-600'>Applied Candidates</span>
                    </div>

                    <div className='overflow-y-auto scroll-smooth max-h-full'>
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
