import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

function Qmodal({setModal,setQuestions,questions,handleformSubmit}) {
    const  modalRef = useRef();
    const closeModal =(e)=>{
      if(modalRef.current === e.target){
        setModal();
         }
       }
  
    const addQuestion = () => {
        setQuestions([...questions, '']);
      };
    
      const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Questions:', questions);
        handleformSubmit();
      };

  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className='mt-10 flex flex-col text-white w-2/6'>
        <button className='place-self-end' onClick={() => setModal(false)}>
          <IoMdClose size={30} />
        </button>
        <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4'>
          <h1 className='text-gray-700 font-bold text-center text-lg'>Questions</h1>
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div className="mb-2" key={index}>
                <label htmlFor={`question-${index}`} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Question {index + 1}</label>
                <input
                  type="text"
                  id={`question-${index}`}
                  name={`question-${index}`}
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-center mb-2">
              <button type="button" onClick={addQuestion} className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base'>Add Question</button>
            </div>
            <div className='flex justify-center'>
              <button type="submit" className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base'>Post Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Qmodal
