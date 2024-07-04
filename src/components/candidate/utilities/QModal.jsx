import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

function QModal({setModal,questions,setAnswers,answers,handleApply}) {
    const  modalRef = useRef();
   
    const closeModal =(e)=>{
      if(modalRef.current === e.target){
        setModal();
         }
       }
       const handleChange = (id, text) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [id]: text,
        }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        handleApply();
        // console.log(answers);
        // You can send the answers to the server or handle them as needed
      };
    // console.log(questions)
  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className='mt-10 flex flex-col text-white w-2/6'>
        <button className='place-self-end' onClick={() => setModal(false)}>
          <IoMdClose size={30} />
        </button>
        <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4'>
          <h1 className='text-gray-700 font-bold text-center text-lg'>Answer the Questions</h1>
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <div key={question.id} className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  {question.text}
                </label>
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
            <div className='flex justify-center'>
              <button type="submit" className='bg-green-500 rounded-lg px-4 py-1 font-semibold text-base'>
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QModal

