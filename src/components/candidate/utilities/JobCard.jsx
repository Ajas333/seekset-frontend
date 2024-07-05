import React from 'react'
import {Link} from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';

function JobCard(props) {
    const baseURL = import.meta.env.VITE_API_BASEURL
    const image=`${baseURL}${props.img}`
    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString();
    };
    const postdate=formatDate(props.posted)
  return (
    <div>
         <div className="relative group mx-2 mt-10 grid grid-cols-12 space-x-8 overflow-hidden rounded-lg border bg-gray-50 py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                <div className="absolute top-0 right-0 bg-red-100 text-red-900 px-2 py-1 rounded-bl-lg">
                    Apply Before: {props.applybefore}
                </div>
                <div className="absolute bottom-0 right-0  text-gray-700 px-2 py-1 ">
                    {formatDistanceToNow(postdate, { addSuffix: true }).replace('about ', '').replace('hours', 'hr')
                    }
                </div>
  
                <div className="group relative h-16 w-16 overflow-hidden rounded-lg ml-4">
                    <img src={image} alt="" className="h-full w-full object-cover text-gray-700" />
                </div>
  
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                    <div className='flex flex-col ml-12 md:ml-0 mt-3 md:mt-0'>
                    <Link to={`/candidate/jobdetails/${props.id}`}>
                        <p className="overflow-hidden md:text-2xl font-semibold sm:text-xl">{props.title}</p>
                    </Link>
                    <p className='text-base text-gray-500'>{props.empname}</p>
                    </div>
                    
                    <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">Job Posted:
                        <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{postdate}</span>
                    </div>
                    <div className="">Location:
                        <span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-blue-900">{props.location}</span>
                    </div>
                    </div>
                    
                    <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div className="">Experience:
                        <span className="ml-2 mr-3 rounded-full bg-pink-100 px-2 py-0.5 text-green-900">{props.experiance}</span>
                    </div>
                    <div className="">Salary:
                        <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{props.salary} lpa</span>
                    </div>
                    </div>
                </div>
         </div>

    </div>
  )
}

export default JobCard
