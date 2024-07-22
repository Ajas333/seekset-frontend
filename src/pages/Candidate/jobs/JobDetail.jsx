import React,{useEffect,useState} from 'react'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import { FaSuitcase } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { MdDateRange } from "react-icons/md";
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2'
import QModal from '../../../components/candidate/utilities/QModal';




function JobDetail() {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access')
   
    const { jobId } = useParams();
    const [jobData,setJobData] =useState(null)
    const [questions,setQuestions] = useState([])
    const [answers, setAnswers] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [modal,setModal] = useState(false)
    const [userid,setUserid] = useState(null)
    // console.log(isSaved)

    useEffect(() => {
      const get_user_id = async () => {
          try {
              const response = await axios.get(`${baseURL}/api/account/current_user/`, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data'
                  }
              });
              // console.log("current user response:", response);
              if (response.status === 200) {
                  setUserid(response.data.id);
              }
          } catch (error) {
              // console.log(error);
          }
      };
      get_user_id();
  }, []);

    useEffect(() => {
      const fetchJobData = async () => {
        try{
          const responce = await axios.get(`${baseURL}/api/empjob/getjobs/detail/${jobId}/`,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          });
          
          // console.log("inside job details page",responce)
          if(responce.status==200){
            setJobData(responce.data)
            // fetchQuestions()
          }   
        }
        catch(error){
          // console.log(error)
        }
      }
      fetchJobData()
    }, [jobId, token, baseURL])
    

    if (!jobData) {
      return <div>Loading...</div>; // Display loading message while data is being fetched
  }
    const image = jobData.employer?.profile_pic ? `${baseURL}${jobData.employer.profile_pic}` : '';

    const handleSave =async()=>{
      try{
        const action = isSaved ? 'unsave' : 'save';
        const responce = await axios.post(`${baseURL}/api/empjob/savejob/${jobId}/`,{action},{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        });
        // console.log(responce)
        if (responce.status === 200 || responce.status === 201) {
          setIsSaved(!isSaved); 
        }
      }
      catch(error){
        // console.log(error)
      }
    }

   

   

    const handleApply = async()=>{
      // console.log("helloooooooooooooooooooooo")
      try{
          const responce = await axios.post(`${baseURL}/api/empjob/applyjob/${jobId}/`,{userid});
        // console.log(responce)
        if(responce.status == 200 || responce.status == 201){
                setModal(false)
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${responce.data.message}`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
      }
      catch(error){
        // console.log(error)
      }
    }
    // console.log("...................................................",questions)
    // console.log("userid...........................",userid)
  return (
    <div className='mt-16  bg-red-200'>
      <div className='flex items-center flex-col gap-2'>
        {modal && <QModal setModal={setModal} questions={questions} setAnswers={setAnswers} answers={answers} handleApply={handleApply}/> }
            <div className='md:w-3/5 py-4 bg-gray-100 rounded-md mt-8'>
                <div className='flex  py-1'>
                    <div className="group relative h-16 w-16 overflow-hidden rounded-lg ml-4 ">
                      {image && <img src={image} alt="" className="h-full w-full object-cover text-gray-700" />}
                    </div>
                    <div className='ml-3 '>
                        <span className='text-xl font-bold text-gray-700'>{jobData.title}</span>
                        <div>
                           <span className='text-sm font-semibold text-gray-600'>{jobData.employer.user_full_name}</span>
                        </div>
                    </div>
                </div>
                <div  className=' px-3'>
                    <div className='flex gap-3'>
                        <div className='flex items-center gap-2'>  
                          <span className='text-gray-700'><FaSuitcase /></span> <p className='text-gray-700'>{jobData.experiance}</p>
                        </div>
                        <hr className='h-6 border-l-2 border-solid border-gray-500' />
                        <div className='flex items-center gap-1'>
                          <span className='text-gray-700'><MdCurrencyRupee /></span> <p className='text-gray-700'>{jobData.lpa} lpa</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='flex items-center gap-2'>  
                          <span className='text-gray-700'><SlLocationPin /></span> <p className='text-gray-700'>{jobData.location}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-1'>
                  <hr className='w-full border-t-2 border-solid border-gray-400' />
                </div>
                <div className='flex justify-between py-2'>
                    <div className=' px-3 flex gap-3'>
                          <div className='flex items-center gap-2'>  
                            <span className='text-gray-700'><MdDateRange /></span> <p className='text-gray-700'>
                            {formatDistanceToNow(jobData.posteDate, { addSuffix: true }).replace('about ', '').replace('hours', 'hr')}
                            </p>
                          </div>
                          <div className='flex items-center'>
                              <div>
                                <p className='text-gray-700'><span className='text-base font-semibold '>Apply Before:</span>{jobData.applyBefore}</p>
                              </div>
                          </div>
                    </div>
                    <div className=' px-3 flex gap-3'>
                        <button className=" px-3 h-10   md:px-6 md:py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                          onClick={handleApply}>Apply
                         </button>
                         <button className=" px-3 h-10  md:px-6 md:py-1 rounded-full bg-gradient-to-b from-green-500 to-green-600 text-white focus:ring-2 focus:ring-green-400 hover:shadow-xl transition duration-200"
                          onClick={handleSave}>{isSaved ? 'Unsave' : 'Save'}
                         </button>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-3/5 py-4 px-3 bg-gray-100 rounded-md flex flex-col gap-2'>
                <div className=''>
                  <span className='text-gray-700 font-semibold text-lg'>Job description</span>
                  <p className='text-base text-gray-700'>{jobData.about}</p>
                </div>
                <div className='flex items-center gap-2 '>
                  <span className='text-gray-700 font-semibold text-lg'>Job Type:</span>
                  <p className='text-base text-gray-700 '>{jobData.jobtype}</p>
                </div>
                <div className='flex items-center gap-2 '>
                  <span className='text-gray-700 font-semibold text-lg'>Job Mode:</span>
                  <p className='text-base text-gray-700 '>{jobData.jobmode}</p>
                </div>
                <div className=''>
                  <span className='text-gray-700 font-semibold text-lg'>Responcibilities</span>
                  <p className='text-base text-gray-700'>{jobData.responsibility}</p>
                </div>

            </div>

            <div className='w-full md:w-3/5 py-4 px-3 mb-4 bg-gray-100 rounded-md flex flex-col gap-2'>
                <div className=''>
                  <span className='text-gray-700 font-semibold text-lg'>About Company</span>
                  <p className='text-base text-gray-700'>{jobData.employer.about}</p>
                </div>
                <div className=''>
                  <span className='text-gray-700 font-semibold text-lg'>Address</span>
                  <p className='text-base text-gray-700'>{jobData.employer.address}</p>
                </div>
                <div className='flex items-center gap-2 '>
                  <span className='text-gray-700 font-semibold text-lg'>Headquaters:</span>
                  <p className='text-base text-gray-700 '>{jobData.employer.headquarters}</p>
                </div>
                <div className='flex items-center gap-2 '>
                  <span className='text-gray-700 font-semibold text-lg'>Website link:</span>
                  <p className='text-base text-blue-700 '>{jobData.employer.website_link}</p>
                </div>
            </div>
      </div>    
    </div>
  )
}

export default JobDetail