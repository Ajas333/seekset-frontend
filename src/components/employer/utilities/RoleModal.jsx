import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function RoleModal({setRoleModal,action,setAction}) {
    const  modalRef = useRef();
    const baseURL = import.meta.env.VITE_API_BASEURL
    //  const baseURL='http://127.0.0.1:8000'
    const closeModal =(e)=>{
      if(modalRef.current === e.target){
        setRoleModal();
         }
       }
    
       const initialValues = {
        roles: [{ rolename: '', roleemail: '' }],
      };
      
      const validationSchema = Yup.object().shape({
        roles: Yup.array().of(
          Yup.object().shape({
            rolename: Yup.string()
              .matches(/^[A-Z]/, 'Role name must start with a capital letter')
              .min(3, 'Role name must be at least 3 characters long')
              .required('Role name is required'),
            roleemail: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
          })
        ),
      });

      const onSubmit = async(values) => {
        // console.log('Form data', values);
        try {
            const response = await axios.post(`${baseURL}/api/empjob/addrole/`, { roles: values.roles }, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
              },
            });
            if(response.status == 200){
                setRoleModal(false)
                setAction(!action)
            }
            // console.log('Form data submitted', response.data);
          } catch (error) {
            // console.error('Error submitting form', error);
          }
      };

  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className='mt-10 flex flex-col text-white w-2/6'>
        <button className='place-self-end' onClick={() => setRoleModal(false)}>
          <IoMdClose size={30} />
        </button>
        <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4'>
          <h1 className='text-gray-700 font-bold text-center text-lg'>Roles</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values }) => (
              <Form>
                <FieldArray name="roles">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.roles.map((role, index) => (
                        <div key={index} className="mt-4">
                          <div className="flex">
                            <div className="flex-1 mr-2">
                              <Field
                                name={`roles.${index}.rolename`}
                                placeholder="Role Name"
                                className="form-input mt-1 block w-full text-gray-700" // Updated to set text color
                              />
                              <ErrorMessage name={`roles.${index}.rolename`} component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex-1 mr-2">
                              <Field
                                name={`roles.${index}.roleemail`}
                                placeholder="Email"
                                className="form-input mt-1 block w-full text-gray-700" // Updated to set text color
                              />
                              <ErrorMessage name={`roles.${index}.roleemail`} component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex items-center">
                              <button type="button" className="text-red-500" onClick={() => remove(index)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button type="button" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={() => push({ roleName: '', email: '' })}>
                        Add Role
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default RoleModal
