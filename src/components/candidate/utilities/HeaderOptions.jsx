import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineMessage } from "react-icons/md";
import { ImBookmarks } from "react-icons/im";
import { FaFileAlt,FaEnvelopeOpenText } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";



function HeaderOptions({unreadCount,setModal,toggleDrawer}) {
  const handleNot=()=>{
    setModal(true)
    toggleDrawer()
  }
  return (
    <div className='flex flex-col mt-6 md:mt-0 md:flex-row gap-4'>
              <Link to={'/candidate/message/'}>
                <div onClick={toggleDrawer} className='flex flex-col justify-center items-center'>
                    <MdOutlineMessage className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Message</p>
                </div>
                </Link>
                
                <Link to={'/candidate/shedules/'}>
                <div onClick={toggleDrawer} className='flex flex-col justify-center items-center cursor-pointer'>
                    <FaUserTie  className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Interview</p>
                </div>
                </Link>
                <Link to={'/candidate/savedjobs'}>
                <div onClick={toggleDrawer} className='flex flex-col justify-center items-center cursor-pointer'>
                    <ImBookmarks className='w-5 h-5 '/>
                    <p className='text-xs font-medium text-gray-500'>Saved Jobs</p>
                </div>
                </Link>
                <Link to={'/candidate/applyedjobs/'}>
                <div onClick={toggleDrawer} className='flex flex-col justify-center items-center cursor-pointer'>
                <FaFileAlt className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Applyed Jobs</p>
                </div>
                </Link>
                <div  className='flex flex-col justify-center items-center cursor-pointer relative' onClick={handleNot}>
                  {unreadCount >0 &&
                    <div className='bg-red-500 text-white text-xs rounded-full px-1 absolute right-2'>{unreadCount}</div>
                  }
                    <IoNotifications className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Notification</p>
                </div>
    </div>
  )
}

export default HeaderOptions
