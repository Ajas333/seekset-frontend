import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Utilities/Sidebar'
import axios from 'axios';


function Cdetails() {
    const { id } = useParams(); 
    const baseURL = import.meta.env.VITE_API_BASEURL
    // const baseURL = "http://127.0.0.1:8000";
    const [candidate, setCandidate] = useState(null);
    const [render,setRender] = useState(false)

    useEffect(() => {
       const fetchData = async()=>{
        try{
            const response = await axios.get(`${baseURL}/dashboard/candidate/${id}`)
            // console.log(response)
            if (response.status === 200) {
                setCandidate(response.data);
              }
        }
        catch(error){
            // console.log(error)
        }
       }
       fetchData()
    }, [render])

    const handleStatus = async(action)=>{
      // console.log(action)
      const formData = new FormData()
      formData.append("id",candidate.id);
      formData.append("action",action);
      try{
        const response = await axios.post(baseURL+'/dashboard/status/',formData)
        if(response.status == 200){
          setRender(!render)
        }
      }
      catch(error){
        // console.log(error)
      }

    }

    if (!candidate) {
        return <div>Loading...</div>;
    }
   
    return (
        <div className='flex'>
          <div className='w-64'>
                <Sidebar/>
          </div>
          <div className='w-full h-max-84 p-6 overflow-auto mt-12'>
          <div className='bg-white shadow-md rounded-lg p-6 mb-4 relative'>
            <div className='absolute top-0 right-0'>
              {candidate.user.is_active ? (
                      <button onClick={()=>handleStatus("block")} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Block</button>
                    ) : (
                      <button onClick={()=>handleStatus("unblock")} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Unblock</button>
                    )}
            </div>
              <div className='flex items-center gap-4 mb-4'>
                <img className='w-20 h-20 rounded-full mx-4' src={`${baseURL}${candidate.profile_pic}`} alt='Profile' />
                 
                <div>
                  <h2 className='text-2xl font-bold mb-2'>{candidate.user.full_name}</h2>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Email:</span> {candidate.user.email}</p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Id:</span> {candidate.id}</p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Phone:</span> {candidate.phone}</p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Place:</span> {candidate.place}</p>
                </div>
    
                <div className='ml-4 mt-4'>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>DOB:</span> {candidate.dob}</p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Resume:</span>
                    <a className='text-blue-500 hover:underline ml-2' href={`${baseURL}${candidate.resume}`} target='_blank' rel='noopener noreferrer'>
                      Download
                    </a>
                  </p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Gender:</span> {candidate.Gender}</p>
                </div> 
    
                <div className=' mt-3'>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Linkedin:</span>
                    <a className='text-blue-500 hover:underline ml-2' href={candidate.linkedin} target='_blank' rel='noopener noreferrer'>
                      {candidate.linkedin}
                    </a>
                  </p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Github:</span> 
                    <a className='text-blue-500 hover:underline ml-2' href={candidate.github} target='_blank' rel='noopener noreferrer'>
                      {candidate.github}
                    </a>
                  </p>
                  <p className='text-gray-600'><span className='font-semibold text-gray-800'>Status:</span> {candidate.user.is_active ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              <div className='flex justify-around mt-4'>
                <p className='text-gray-600'><span className='font-semibold text-gray-800'>Date Joined:</span> {new Date(candidate.user.date_joined).toLocaleDateString()}</p>
                <p className='text-gray-600'><span className='font-semibold text-gray-800'>Last Login:</span> {new Date(candidate.user.last_login).toLocaleDateString()}</p>
              </div>
            </div>
    
            <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
              <h3 className='text-xl font-bold mb-2'>Skills</h3>
              <p className='text-gray-700'>{candidate.skills}</p>
            </div>
    
            <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
              <h3 className='text-xl font-bold mb-4'>Educational Details</h3>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>Education</th>
                    <th scope='col' className='px-6 py-3'>College</th>
                    <th scope='col' className='px-6 py-3'>Specialization</th>
                    <th scope='col' className='px-6 py-3'>Completed</th>
                    <th scope='col' className='px-6 py-3'>Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {candidate.education.map((edu, index) => (
                    <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='py-4 px-6'>{edu.education}</td>
                      <td className='py-4 px-6'>{edu.college}</td>
                      <td className='py-4 px-6'>{edu.specilization}</td>
                      <td className='py-4 px-6'>{edu.completed}</td>
                      <td className='py-4 px-6'>{edu.mark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
            <h3 className='text-xl font-bold mb-4'>Applied Jobs</h3>
            <table className='min-w-full bg-white'>
                <thead>
                <tr>
                    <th className='py-2 px-4 border-b'>Title</th>
                    <th className='py-2 px-4 border-b'>Location</th>
                    <th className='py-2 px-4 border-b'>LPA</th>
                   
                    <th className='py-2 px-4 border-b'>Experience</th>
                    <th className='py-2 px-4 border-b'>Status</th>
                    <th className='py-2 px-4 border-b'>Applied On</th>
                </tr>
                </thead>
                <tbody>
                    {candidate.applied_jobs.map((list,index)=>(
                        <tr key={index} className='hover:bg-gray-100'>
                        <td className='py-2 px-4 border-b'>{list.job.title}</td>
                        <td className='py-2 px-4 border-b'>{list.job.location}</td>
                        <td className='py-2 px-4 border-b'>{list.job.lpa}</td>
                        
                        <td className='py-2 px-4 border-b'>{list.job.experiance}</td>
                        <td className='py-2 px-4 border-b'>{list.status}</td>
                        <td className='py-2 px-4 border-b'>{new Date(list.applyed_on).toLocaleDateString()}</td>
                        </tr>
                    ))}
               
                </tbody>
            </table>
            </div>
          </div>
        </div>
    )
}

export default Cdetails
