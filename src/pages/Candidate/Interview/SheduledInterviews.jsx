import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


function SheduledInterviews() {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access'); 
    const [interview,setInterview] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const responce = await axios.get(baseURL+'/api/interview/shedules/',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                // console.log("Sheduled jobs details.....",responce)
                if(responce.status == 200){
                    setInterview(responce.data)
                }
            }
            catch(error){
                // console.log(error)
            }
        }
        fetchData();
    },[])
    const extractDate = (datetimeString) => {
        const dateObject = new Date(datetimeString);
        const datePart = dateObject.toISOString().split('T')[0]; 
        return datePart;
    };
    
    const extractTime = (datetimeString) => {
        const dateObject = new Date(datetimeString);
        let hours = dateObject.getUTCHours();
        const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const timePart = `${hours}:${minutes} ${ampm}`;
        return timePart;
    };
    return (
    <div className='pt-12'>
       <div className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Interview Schedules</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Job Title</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Company</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Applied Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Interview Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Interview Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {interview.map((interview) => (
                  
                  <tr key={interview.id} className="border-b border-gray-200 dark:border-gray-700">
                    <Link to={`/candidate/jobdetails/${interview.job.id}`}><td className="px-4 py-3 text-gray-700 font-semibold cursor-pointer dark:text-gray-200">{interview.job.title}</td></Link>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{interview.employer_name}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractDate(interview.applyDate)}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractDate(interview.date)}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractTime(interview.date)}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        interview.status === "Upcoming"
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-green-500 dark:text-green-400"
                      }`}
                    >
                      {interview.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default SheduledInterviews
