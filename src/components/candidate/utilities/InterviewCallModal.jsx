import React, { useRef, useState,useEffect } from 'react'
import'./interviewCall.css'
import { Link } from 'react-router-dom';

function InterviewCallModal({setInterviewModal,roomId,intID}) {
   
    const closeModal =(e)=>{
       
            setInterviewModal();
            
          
        }
        // console.log("room id ",roomId)
  return (
    <div   className='fixed inset-0 flex justify-end mt-10 z-50'>
      <div className='bg-black w-96 h-96 rounded-md mr-5 relative'>
                <div className='flex p-2 h-auto justify-center pt-20' >
                    <div className='text-white'>     
                        <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
                            <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"> </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-around mt-4'>
                <Link to={`/interview/${intID}?roomID=${roomId}`}>
                <button className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-green-500 from-10% via-green-500 via-30%
                 to-green-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px]
                  before:bg-gradient-to-r before:from-green-500 before:from-10% before:via-green-500 before:via-30% before:to-green-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all 
                  before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-green-700 focus:ring-green-700">
                    Accept
                </button>
                </Link>
                <button className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-red-500 from-10% via-red-500 via-30%
                 to-red-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px]
                  before:bg-gradient-to-r before:from-red-500 before:from-10% before:via-red-500 before:via-30% before:to-red-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all 
                  before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-red-700 focus:ring-red-700" onClick={closeModal}>
                   Reject
                </button>

                </div>
      </div>
    </div>
  )
}

export default InterviewCallModal
