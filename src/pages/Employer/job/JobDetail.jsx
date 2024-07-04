import React,{useEffect,useState} from 'react'
import SideBar from '../../../components/employer/SideBar'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import JobDetailMOdal from '../../../components/employer/utilities/JobDetailMOdal';



function JobDetail() {
  // const baseURL='http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_API_BASEURL
  const token = localStorage.getItem('access')
  const [jobData,setJobData]=useState({});
  const { jobId } = useParams();
  const [status,setStatus]=useState()
  const [modal,setModal] = useState(false)

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

        // console.log(responce)
        if(responce.status==200){
          setJobData(responce.data)
          setStatus(responce.data.active)
        }   
      }
      catch(error){
        // console.log(error)
      }
    }
    fetchJobData()
  }, [])

  // console.log(jobData)
  // console.log(token)
  // console.log(jobData.active)
  // console.log("status",status)
  
  const handleJobStatusChange = async (action)=>{
    try{
      const responce = await axios.post(`${baseURL}/api/empjob/getjobs/status/${jobId}/`,{action},{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'multipart/form-data'
      }
      });
      if(responce.status == 200){
        if(action == 'deactivate'){
          setStatus(false)
        }
        else{
          setStatus(true)
        }
      }
      // console.log(responce)
    }
    catch(error){
      // console.log(error)
    }
  }

  const handleDeactivate = ()=>{
    try{
      Swal.fire({
        title: "Do you want to deactivate?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Deactivate",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Deactivate!", "", "success");
          handleJobStatusChange('deactivate')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    catch(error){
      console.log(error)
    }
  };
  const handleActivate = ()=>{
    try{
      Swal.fire({
        title: "Do you want to Activate again?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Activate",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Activated!", "", "success");
          handleJobStatusChange('activate')
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    catch(error){
      console.log(error)
    }
  };

  const toggleModal = ()=>{
    setModal(true)
  }

  return (
    <div className='pt-14 flex'>
      <div>
       <SideBar/>
      </div>
      
      <div className="p-4 w-full">
         {modal && <JobDetailMOdal setModal={setModal} jobData={jobData} />}
        <div className=''>
        <div>
            <h1 className="text-2xl font-bold mt-4 mb-2">Job Details</h1>
            <div className="bg-gray-100 p-4  lg:w-4/5 mx-auto my-4 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">{jobData.title}</h2>
                <p className="text-gray-600 mb-4"><span className='font-bold'>Location:</span> {jobData.location}</p>
                <p className="text-gray-600 mb-4"><span className='font-bold'>Salery:</span> {jobData.lpa} lpa</p>
                <div className='flex gap-4'>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Job Type:</span> {jobData.jobtype} </p>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Job Mode:</span> {jobData.jobmode} </p>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Experience:</span> {jobData.experiance}</p> 
                </div>
                <div className='flex gap-4'>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Date Posted:</span> {jobData.posteDate} </p>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Apply Before:</span> {jobData.applyBefore}</p>
                  <p className="text-gray-600 mb-4"><span className='font-bold'>Status:</span>{status?(<p className='bg-green-200 px-2 rounded-lg'>Acive</p>):(<p className='bg-red-200 px-2 rounded-lg'>Expired</p>)} </p> 
                </div>
                <p className='text-gray-600 font-bold'>About Job:</p>
                <p className='mb-4'>{jobData.about}</p>
                <p className='text-gray-600 font-bold'>Responcibilities:</p>
                <p>{jobData.responsibility}</p>
                
                <div className="flex justify-between mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>Edit</button>
                    {status?(<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeactivate}>Deactivate</button>):
                    (<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleActivate}>Activate</button>)}
                   
                </div>
            </div>  
        </div>
        
            
        </div>
      </div>
    </div>
  )
}

export default JobDetail
