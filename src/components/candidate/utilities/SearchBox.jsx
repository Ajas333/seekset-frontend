import React, { useState } from 'react'
import { GrSearch } from "react-icons/gr";


function SearchBox({jobData,setFilterData,setAction}) {
   const [info,setInfo] = useState({
    "title":"",
    "location":""
   })

    const handleChange = (event)=>{
        const {name,value} = event.target
        setInfo({
            ...info,[name]:value
        })
    }

    const handleSearch = () =>{
       let filtered = jobData;
       if (info.title){
        const titleLower = info.title.toLowerCase();
        filtered = filtered.filter(job => job.title.toLowerCase().includes(titleLower));
       }
       if (info.location){
        const locationLower = info.location.toLowerCase();
        filtered = filtered.filter(job => job.location.toLowerCase().includes(locationLower));
       }
       setFilterData(filtered)
       setAction(true)
       setInfo('')
    }

  return (
    <div>
      <form className=' flex justify-center'>
            <div className='bg-gray-100 px-3 py-1 rounded-lg  flex items-center'>
                <GrSearch className='w-3 md:w-6 h-3 md:h-6 md:ml-3'/>
                <div>
                    <input type="text" name="title" value={info.title} onChange={handleChange} id="" className='w-20 md:w-36 bg-transparent border-0 focus:outline-none focus:border-0 p-1 md:p-2 text-gray-700' 
                    placeholder='Job '/>
                </div>
                <div className='md:ml-3'>
                    <hr className='h-5 md:h-10 border-l-2 md:border-l-4 border-solid border-gray-500' />
                </div>
                <div className=''>
                    <input type="text" name="location"  onChange={handleChange} id="" className='w-20 md:w-36 bg-transparent border-0 focus:outline-none focus:border-0 p-2 text-gray-700' 
                    placeholder='location'/>
                </div>
                <div className='ml-3'>
                    <button type='button' onClick={handleSearch}  className="px-3 md:px-8 py-1 md:py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                        Search
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SearchBox
