import axios from 'axios';
import React, { useRef, useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";


function AcceptRejectModal({setModal,modalData,setAction,action}) {
    // const baseURL='http://127.0.0.1:8000'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const  modalRef = useRef();
    const closeModal =(e)=>{
      if(modalRef.current === e.target){
        setModal();
         }
       }
      //  console.log("modl data",modalData)
    
    const handleAccept = ()=>{
     const action = "accept"
    
     handleSubmit(action);
    }
    
    const handleReject = () =>{
      const action = "reject"
      handleSubmit(action);

    }

    const handleSubmit =async(action)=>{
     
        const formData = new FormData();
        formData.append("candidateId",modalData[0].candidate);
        formData.append("jobId",modalData[0].job.id);
        formData.append("interviewId",modalData[0].id);
        formData.append("action",action)
        try{
            const response = await axios.post(baseURL+'/api/interview/status/',formData)
            // console.log("responce........",response)
            if (response.status == 200){
              toast.success(response.data.message,{
                position: "top-center",
              });
              setModal()
              setAction(!action)

            }
            else{
              toast.warn(response.data.message,{
                position: "top-center",
              });
            }
        }
        catch(error){
            // console.log(error)
        }
    }

  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className='mt-10 flex flex-col text-white w-2/6'>
        <button className='place-self-end' onClick={() => setModal(false)}>
          <IoMdClose size={30} />
        </button>
        <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4'>
         <h1 className='text-gray-600 text-lg'>Is the candidate eligible for the position?</h1>
        <div className='flex justify-around mt-6'>
        <button onClick={handleAccept} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            Accept
        </button>
        <button onClick={handleReject} className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            Accept
        </button>

        </div>
        </div>
      </div>
    </div>
  )
}

export default AcceptRejectModal
