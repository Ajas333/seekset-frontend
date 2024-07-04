import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import JobCard from '../../../components/candidate/utilities/JobCard'


function SavedJobs() {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access'); 
    const [jobdata,setJobData] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const responce = await axios.get(baseURL+'/api/empjob/savedjobs/',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                // console.log("saved jobs details.....",responce)
                if(responce.status == 200){
                    setJobData(responce.data.data)
                }
                else{
                    Swal.fire("There is no saved jobs");
                }
            }
            catch(error){
                // console.log(error)
            }
        }
        fetchData();
    },[])
    // console.log("zwxecrtvybuni",jobdata)
  return (
    <div className='pt-12 min-h-[25rem]'>
        <div className='flex justify-center' >
              {/* job cards */}
                  <div className='flex flex-col justify-center mt-5 w-4/6'>
                      {jobdata.map((job)=>(
                        
                          <JobCard id={job.job.id} img={job.job.employer.profile_pic} title={job.job.title} posted={job.job.posteDate} applybefore={job.job.applyBefore}
                          empname={job.job.employer.user_full_name} jobtype={job.job.jobtype} salary={job.job.lpa} experiance={job.job.experiance} location={job.job.location}/>
                      ))}
                  </div>
        </div>
    </div>
  )
}

export default SavedJobs
