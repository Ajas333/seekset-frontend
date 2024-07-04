import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Utilities/Sidebar';


function Edetails() {
    // const baseURL = "http://127.0.0.1:8000";
    const baseURL = import.meta.env.VITE_API_BASEURL
    const { id } = useParams();
    const [employer, setEmployer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [render,setRender] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/dashboard/employer/${id}`);
                // console.log(response.data); 
                if (response.status === 200) {
                    setEmployer(response.data);
                    setLoading(false);
                }
            } catch (error) {
                // console.error('Error fetching employer details:', error);
            }
        };

        fetchData();
    }, [render]);

    const handleStatus = async(action)=>{
        // console.log(action)
        const formData = new FormData()
        formData.append("id",employer.id);
        formData.append("action",action);
        try{
          const response = await axios.post(baseURL+'/dashboard/status/',formData)
          if(response.status == 200){
            setRender(!render)
          }
        }
        catch(error){
        //   console.log(error)
        }
  
      }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="w-full p-6">
                <div className="bg-white shadow-md rounded-lg p-6 my-10 relative">
                    <div className='absolute top-0 right-0'>
                        {employer.user.is_active ? (
                                <button onClick={()=>handleStatus("block")} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Block</button>
                                ) : (
                                <button onClick={()=>handleStatus("unblock")} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Unblock</button>
                                )}
                    </div>
                    <div className="flex items-center mb-4">
                        <img
                            className="w-20 h-20 rounded-full mr-4"
                            src={`${baseURL}${employer.profile_pic}`}
                            alt="Profile"
                        />
                        <div className=''>
                            <h2 className="text-2xl font-bold mb-2">{employer.user.full_name}</h2>
                            <div className='flex gap-5'>
                                <div>
                                <p className="text-gray-600">
                                <span className="font-semibold">Email:</span> {employer.user.email}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Phone:</span> {employer.phone}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Headquarters:</span> {employer.headquarters}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Website:</span>{' '}
                                    <a href={employer.website_link} target="_blank" rel="noopener noreferrer">
                                        {employer.website_link}
                                    </a>
                                </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">
                                    <span className="font-semibold">Industry:</span> {employer.industry}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Date Joined:</span>{' '}
                                        {new Date(employer.user.date_joined).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Last Login:</span>{' '}
                                        {new Date(employer.user.last_login).toLocaleString()}
                                    </p>
                                    <p className='text-gray-600'>
                                    <span className="font-semibold">Status: </span>
                                    {employer.user.is_active ? "Active" : "Inactive"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-bold mb-2">Address</h3>
                    <p className="text-gray-600">{employer.address}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-bold mb-2">About</h3>
                    <p className="text-gray-600">{employer.about}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-bold mb-2">Jobs Posted</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Posted Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Apply Before
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employer.jobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{job.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{new Date(job.posteDate).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{new Date(job.applyBefore).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {job.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Edetails;
