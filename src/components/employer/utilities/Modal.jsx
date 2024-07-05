import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { EmpProfileEditSchema } from '../../../validation/EmployerProfileValidation';
import axios from 'axios';



function Modal({setShowModal,section,setAction,action,profileData}) {
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access'); 
    const  modalRef = useRef();
    const [info, setInfo] = useState({
        hr_name: '',
        hr_email: '',
        phone: '',
        });
    const closeModal =(e)=>{
        if(modalRef.current === e.target){
        setShowModal(false);
        }
        }

    const handleCompanyInfo = (values,{setSubmitting})=>{
        const action = "companyInfo"
        const formData = new FormData();
        formData.append("full_name",values.full_name);
        formData.append("email",values.email);
        formData.append("phone",values.phone);
        formData.append("website_link",values.website_link);
        formData.append("industry",values.industry);
        formData.append("address",values.address);
        formData.append("about",values.about);
        formData.append("headquarters",values.headquarters);
        formData.append("userId",profileData.user_id)
        formData.append("action",action)
        handleSubmit(formData)
        setSubmitting(false)
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleHrsubmit = ()=>{
        const action = "companyInfo"
        const formData = new FormData();
        formData.append("hr_name",info.hr_name);
        formData.append("hr_email",info.hr_email);
        formData.append("hr_phone",info.hr_phone);
        formData.append("userId",profileData.user_id);
        formData.append("action",action);
        handleSubmit(formData)
    }

    const handleSubmit = async(formData)=>{
        try{
            const response = await axios.post(baseURL+'/api/account/user/edit/',formData,{
                headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status == 200 ){
                toast.success(response.data.message,{
                position: "top-center",
                });
                setAction(!action)
                setShowModal(false);
            }
        }
        catch(error){
        }
    }

const renderContent = () =>{
    switch(section){
        case 'companyInfo':
            const initialValue ={
                full_name:profileData.user_full_name,
                email:profileData.user_email,
                phone:profileData.phone,
                headquarters:profileData.headquarters,
                address:profileData.address,
                about:profileData.about,
                website_link:profileData.website_link,
                industry:profileData.industry,
                hr_name:profileData.hr_name,
                hr_email:profileData.hr_email,
                hr_phone:profileData.hr_phone
            }
            return(
                <div>
                   <Formik
                   initialValues={initialValue}
                   validationSchema={EmpProfileEditSchema}
                   onSubmit={handleCompanyInfo}
                   >
                   {({errors,touched,isSubmitting})=>(
                    <Form>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                            <Field type="text" id="name" name="full_name"   className={`bg-gray-50 border ${errors.full_name && touched.full_name? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='full_name' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <Field type="text" id="name" name="email"   className={`bg-gray-50 border ${errors.email && touched.email? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                            <Field type="text" id="name" name="phone"   className={`bg-gray-50 border ${errors.phone && touched.phone? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='phone' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Headquarters</label>
                            <Field type="text" id="name" name="headquarters"   className={`bg-gray-50 border ${errors.headquarters && touched.headquarters? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='headquarters' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <Field type="text" id="name" name="address"   className={`bg-gray-50 border ${errors.address && touched.address? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='address' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                            <Field type="text" id="name" name="industry"   className={`bg-gray-50 border ${errors.industry && touched.industry? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='industry' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                       
                      
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Website Link</label>
                            <Field type="text" id="name" name="website_link"  className={`bg-gray-50 border ${errors.website_link && touched.website_link? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            <ErrorMessage name='website_link' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div class="mb-2">
                            <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">About</label>
                            <Field
                                  as="textarea" 
                                  className={`w-full mb-5 ${errors.about && touched.about ? 'border-red-500' : 'mb-5'}  px-4 py-3  text-sm font-medium outline-none focus:bg-grey-50 placeholder:text-grey-700 bg-grey-50 text-dark-grey-900 rounded-2xl`}
                                  id="about" name="about" rows="4" cols="50" 
                                />
                                <ErrorMessage name='about' component="div" className='text-red-500 text-sm mb-2'/>
                        </div>
                        <div className='flex justify-center'>
                          <button type="submit" disabled={isSubmitting} className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Save Changes</button>
                        </div>
                    </Form>
                   )} 
                   </Formik>
                </div>
                
            );
        
    };
};

return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
    <div className='mt-10 flex flex-col text-white w-5/6  md:w-2/6 h-5/6 '>
     <button className='place-self-end' onClick={()=>setShowModal(false)}><IoMdClose size={30}/></button>
     <div className='bg-indigo-200 rounded-xl px-10 py-5  items-center mx-4  max-h-full overflow-auto'>
       
         {renderContent()}
       
     </div>
    </div>
   </div>
  )
}

export default Modal
