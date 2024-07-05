import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { PostJobValidationSchema } from '../../../validation/PostJobValidation';
import { toast } from 'react-toastify';
import axios from 'axios';


function JobDetailMOdal({setModal,jobData}) {
    const baseURL = import.meta.env.VITE_API_BASEURL
    const  modalRef = useRef();
    const closeModal =(e)=>{
        if(modalRef.current === e.target){
        setModal(false);
        }
        }

    const handleSubmit = async (values)=>{
      const lpa= `${values.saleryfrom}-${values.saleryto}`
      const formData = new FormData();
      formData.append("title",values.title);
      formData.append("location",values.location);
      formData.append("lpa",lpa)
      formData.append("applyBefore",values.applyBefore);
      formData.append("experiance",values.experiance);
      formData.append("jobmode",values.jobmode);
      formData.append("jobtype",values.jobtype);
      formData.append("about",values.about);
      formData.append("responsibility",values.responsibility);
      formData.append("jobId",jobData.id)
      
      try{
        const responce = await axios.post(baseURL+'/api/empjob/editJob/',formData)
        if(responce.status == 200){
          toast.success('Job edited!',{
            position: "top-center",
          });
          setModal(false)
        }
        else{
          toast.error('something went wrong try again later!',{
            position: "top-center",
          });
          setModal(false)
        }
      }
      catch(error){
      }
    }
    let [salaryFrom, salaryTo] = jobData.lpa.split('-');
    const initialValue = {
      title:jobData.title,
      location:jobData.location,
      saleryfrom:salaryFrom,
      saleryto:salaryTo,
      applyBefore:jobData.applyBefore,
      experiance: jobData.experiance,
      jobmode:jobData.jobmode,
      jobtype:jobData.jobtype,
      about:jobData.about,
      responsibility:jobData.responsibility
    }

  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
    <div className='mt-10 flex flex-col text-white  w-2/6 h-5/6 '>
     <button className='place-self-end' onClick={()=>setModal(false)}><IoMdClose size={30}/></button>
     <div className='bg-indigo-200 rounded-xl px-4 py-5   mx-4  max-h-full overflow-auto'>
       
        <Formik
        initialValues={initialValue}
        validationSchema={PostJobValidationSchema}
        onSubmit={handleSubmit}
        >
          {({errors,touched})=>(
            <Form >
                <div className=' '>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-center gap-2'>
                        
                        <div className="relative w-full min-w-[180px] ">
                          <label for="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <Field type="text" id="title" name="title"   className={`bg-gray-50 border ${errors.title && touched.title? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='title' component='div' className='text-red-500 text-sm mb-2' />
                        </div>

                        <div className="relative w-full min-w-[180px] ">
                    
                          <label for="location" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <Field type="text" id="location" name="location"   className={`bg-gray-50 border ${errors.location && touched.location? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='location' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>
                    
                    <div className='flex justify-center gap-2 '>
                        <div className="relative w-full min-w-[180px] "> 
                          <label for="saleryfrom" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Salery From</label>
                            <Field type="text" id="saleryfrom" name="saleryfrom"   className={`bg-gray-50 border ${errors.saleryfrom && touched.saleryfrom? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='saleryfrom' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div className="relative w-full min-w-[180px] ">
                        
                          <label for="saleryto" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Salery To</label>
                            <Field type="text" id="saleryto" name="saleryto" className={`bg-gray-50 border ${errors.saleryto && touched.saleryto? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='saleryto' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>

                    <div className='flex justify-center gap-2'>
                        <div className="relative w-full min-w-[180px] "> 
                          <label for="jobtype" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                            <Field as='select' type="text" id="jobtype" name="jobtype"   className={`bg-gray-50 border ${errors.jobtype && touched.jobtype? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                            <option value="">Select</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              </Field>
                            <ErrorMessage name='jobtype' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div className="relative w-full min-w-[180px] ">
                        
                          <label for="jobmode" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Job Mode</label>
                            <Field as='select' type="text" id="jobmode" name="jobmode" className={`bg-gray-50 border ${errors.jobmode && touched.jobmode? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                              <option value="">Select</option>
                              <option value="Remote">Remote</option>
                              <option value="On Site">On Site</option>
                              <option value="Hybrid">Hybrid</option>
                              </Field>
                            <ErrorMessage name='jobmode' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>

                    <div className='flex justify-center gap-2 '>
                        <div className="relative w-full min-w-[180px] "> 
                          <label for="experiance" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Experiance</label>
                            <Field as='select' type="text" id="experiance" name="experiance"   className={`bg-gray-50 border ${errors.experiance && touched.experiance? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                            <option value="">Select</option>
                            <option value="Internship">Internship</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Associate">Associate</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                              </Field>
                            <ErrorMessage name='experiance' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div className="relative w-full min-w-[180px]">
                        
                          <label for="applyBefore" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Apply Before</label>
                            <Field  type="date" id="applyBefore" name="applyBefore" className={`bg-gray-50 border ${errors.applyBefore && touched.applyBefore? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                            <ErrorMessage name='applyBefore' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>

                   
                    <div className='flex '>    
                        <div className=" w-full min-w-[180px] ">
                          <label for="about" className="block text-sm font-medium text-gray-900 dark:text-white">About</label>
                            <Field  as='textarea' rows="4" cols="50"   id="about" name="about"   className={`bg-gray-50 border ${errors.about && touched.about? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='about' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>
                    <div className='flex '>    
                        <div className=" w-full min-w-[180px] ">
                          <label for="responsibility" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Responsibility</label>
                            <Field  as='textarea' rows="4" cols="50"   id="about" name="responsibility"   className={`bg-gray-50 border ${errors.responsibility && touched.responsibility? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='responsibility' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                    </div>
                  </div>

                </div>
                  <div className='flex justify-center mr-12 ml-12 mt-3'>
                      
                      <button type='submit' className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                      Submit
                      </button>
                  
                  </div>
            </Form>
          )}
         </Formik>
       
     </div>
    </div>
   </div>
  )
}

export default JobDetailMOdal
