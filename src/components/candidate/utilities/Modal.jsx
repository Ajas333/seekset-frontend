import React, { useRef, useState,useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { Formik, Form, Field,ErrorMessage } from 'formik';
import { ProfileEditSchema,EducationSchema } from '../../../validation/CandidateProfileValidation';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { baseURL } from '../../Urls';


function Modal({setShowModal,section, modalData,userId,setAction,action}) {
  // const baseURL='http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_API_BASEURL
  const token = localStorage.getItem('access'); 
  const[data,setData] = useState([])
  const[skills,setSkills] = useState([])
  const [skill,setSkill] = useState('')
  const [info, setInfo] = useState({
    linkedin: '',
    github: '',
  });
  const [resume, setResume] = useState({
    resume: null
  });

  const  modalRef = useRef();
  const closeModal =(e)=>{
    if(modalRef.current === e.target){
      setShowModal(false);
       }
     }
  const handlePersonal = async(values,{setSubmitting})=>{
      // console.log(values)
      const action ="personal"
      const formData = new FormData();
      formData.append("full_name",values.username);
      formData.append("email",values.email);
      formData.append("place",values.place);
      formData.append("phone",values.phone);
      formData.append("dob",values.dob);
      formData.append("Gender",values.Gender);
      formData.append("action",action)
      formData.append("userId",userId)
      handleSubmit(formData)
      setSubmitting(false)
  }   

  const handleEducation = async(values,{setSubmitting})=>{
    // console.log(values)
    const action = "education"
    const formData = new FormData();
    formData.append("education",values.education);
    formData.append("specilization",values.specilization);
    formData.append("college",values.college);
    formData.append("completed",values.completed);
    formData.append("mark",values.mark);
    formData.append("userId",userId);
    formData.append("action",action)
    handleSubmit(formData)
    setSubmitting(false)
  }
  const handleSkillSubmit = async()=>{
    const skill=skills.toString()
    const action = "skills"
    const formData = new FormData();
    formData.append("skills",skill)
    formData.append("action",action)
    formData.append("userId",userId);
    handleSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    setResume({ resume: e.target.files[0] });
  };

  const handleInfoSubmit = () =>{
    // console.log(info)
    const action = "otherinfo"
    const formData = new FormData();
    formData.append("linkedin",info.linkedin || modalData.linkedin);
    formData.append("github",info.github || modalData.github);
    formData.append("action",action)
    formData.append("userId",userId)
    if (resume.resume) {
      formData.append("resume", resume.resume, resume.resume.name);
    }
    handleSubmit(formData)
  }
  const handleSubmit = async(formData)=>{
        // console.log(formData)
      try{
        const response = await axios.post(baseURL+'/api/account/user/edit/',formData,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(response)
        if(response.status == 200 ){
          toast.success(response.data.message,{
            position: "top-center",
          });
          setAction(!action)
          setShowModal(false);
        }
      }
      catch(error){
        // console.log(error)
      }
  }
    useEffect(() => {
      setSkills(Array.isArray(modalData.skills) ? modalData.skills : []);
      
    }, [section==='skills'])
    const handleSkill = (e) => setSkill(e.target.value);
    const handleAddSkill = () => {
      if (skill.trim() !== '') {
        setSkills([...skills, skill.trim()]);
        setSkill('');
      }
    };
    const handleRemoveSkill = (index) => {
      setSkills(skills.filter((_, i) => i !== index));
    };
     const renderContent = () => {
      switch (section) {
        case 'personal':
          const personalValues  = {
            username : modalData.user_name,
            email : modalData.email,
            place : modalData.place, 
            phone : modalData.phone,
            dob : modalData.dob,
            Gender : modalData.Gender,
        }
          return (
            <div className=' '>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Personal Info</h1>
              <Formik 
              initialValues={personalValues}
              validationSchema={ProfileEditSchema}
              onSubmit={handlePersonal}
              >
                {({errors,touched,isSubmitting})=>(
                  <Form className='  w-full '>
                      <div class="mb-2">
                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <Field type="text" id="name" name="username" defaultValue={modalData.user_name}  className={`bg-gray-50 border ${errors.username && touched.username? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        <ErrorMessage name='username' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                      <div class="mb-2">
                        <label for="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <Field type="email" name="email" defaultValue={modalData.email} id="email" className={`bg-gray-50 border ${errors.email && touched.email? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
                        <ErrorMessage name='email' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                      <div class="mb-2">
                        <label for="place" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Place</label>
                        <Field type="text" name="place" defaultValue={modalData.place} id="place" className={`bg-gray-50 border ${errors.place && touched.place? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
                        <ErrorMessage name='place' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                      <div class="mb-2">
                        <label for="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                        <Field type="number" name="phone" defaultValue={modalData.phone} id="phone" className={`bg-gray-50 border ${errors.phone && touched.phone? 'border-red-500':'border-gray-300'} 0 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
                        <ErrorMessage name='phone' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                      <div class="mb-2">
                        <label for="dob" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        <Field type="date" name="dob" defaultValue={modalData.dob} id="dob" className={`bg-gray-50 border ${errors.dob && touched.dob? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
                        <ErrorMessage name='dob' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                      <div class="mb-2">
                        <label for="Gender" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <Field name="Gender" 
                          as="select"
                          defaultValue={modalData.Gender}
                          className={`bg-gray-50 border ${errors.Gender && touched.Gender? 'border-red-500':'border-gray-300'}  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </Field>
                          <ErrorMessage name='Gender' component='div' className='text-red-500 text-sm mb-2' />
                      
                      </div>
                        <div className='flex justify-center'>
                          <button type="submit" disabled={isSubmitting} className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Save Changes</button>
                        </div>
                  </Form>
                )}  
              </Formik>
            </div>
          );
        case 'education':
          const educationValue = {
            education : "",
            college : "",
            specilization: "",
            mark : "",
            completed : "",
          }
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Education Info</h1>
              <Formik 
               initialValues={educationValue}
               validationSchema={EducationSchema}
               onSubmit={handleEducation}
               >
                {({errors,touched,isSubmitting})=>(
                  <Form className='w-full '>
                    <div class="mb-2">
                      <label for="education" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Education</label>
                      <Field type="text" name="education" className={`bg-gray-50 border ${errors.education && touched.education? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      <ErrorMessage name='education' component='div' className='text-red-500 text-sm mb-2' />
                    </div>
                    <div class="mb-2">
                      <label for="college" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">College</label>
                      <Field type="text" name="college" className={`bg-gray-50 border ${errors.college && touched.college? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      <ErrorMessage name='college' component='div' className='text-red-500 text-sm mb-2' /> 
                    </div>
                    <div class="mb-2">
                      <label for="specilization" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Specilization</label>
                      <Field type="text" name="specilization" className={`bg-gray-50 border ${errors.specilization && touched.specilization? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      <ErrorMessage name='specilization' component='div' className='text-red-500 text-sm mb-2' />
                      </div>
                    <div class="mb-2">
                      <label for="mark" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mark in cgpa</label>
                      <Field type="text" name="mark" className={`bg-gray-50 border ${errors.mark && touched.mark? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      <ErrorMessage name='mark' component='div' className='text-red-500 text-sm mb-2' />
                      </div>
                    <div class="mb-2">
                      <label for="completed" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Completed On</label>
                      <Field type="date" name="completed" id="name" className={`bg-gray-50 border ${errors.completed && touched.completed? 'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      <ErrorMessage name='completed' component='div' className='text-red-500 text-sm mb-2' />
                      </div>
                    <div className='flex justify-center'>
                        <button type="submit" disabled={isSubmitting}  className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Save Changes</button>
                      </div>
                  </Form>
                )}
              </Formik>
            </div>
          );
        case 'skills':
          
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Skills</h1>
              <div className='flex gap-2 items-center'>
                <div class="mb-2 basis-5/6">
                  <label for="skills" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Skill</label>
                  <input type="text"  value={skill} onChange={handleSkill} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button onClick={handleAddSkill} className='bg-green-400 rounded-md px-3 py-1.5 mt-4 hover:bg-green-500 cursor-pointer font-bold'>Add</button>
              </div>
              <div className=' w-full grid grid-cols-4 gap-3'>
              {Array.isArray(skills) ? skills.map((skill, index) => (
                <div key={index} className='bg-red-400 text-sm px-2 py-1 rounded-lg flex items-center'>
                  <div >{skill} </div>
                  <div className='cursor-pointer' onClick={() => handleRemoveSkill(index)}>
                  <IoMdClose size={17}/>
                  </div>
                </div>
            )) : <p>No skills available</p>}
              </div>
              <form>
                
                    <div className='flex justify-center mt-3'>
                      <button type="button" onClick={handleSkillSubmit} className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Save Changes</button>
                    </div>
              </form>
            </div>
          );
        case 'otherInfo':
        
          return (
            <div>
              <h1 className='text-gray-700 font-bold text-center text-lg'>Other Info</h1>
            
                <form className=' w-full'>
                    <div class="mb-2 basis-5/6">
                      <label for="linkedin"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Linkedin Link</label>
                      <input name='linkedin'  onChange={handleChange}  type="text" defaultValue={modalData.linkedin}  className={`bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      {/* <ErrorMessage name='linkedin' component='div' className='text-red-500 text-sm mb-2' /> */}
                      </div>
                    <div class="mb-2 basis-5/6">
                      <label for="github"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">github</label>
                      <input name='github'  onChange={handleChange} type="text" defaultValue={modalData.github}  className={`bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                      {/* <ErrorMessage name='github' component='div' className='text-red-500 text-sm mb-2' /> */}
                      </div> 
                    <div class="mb-2 basis-5/6">
                      <label for="resume"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Resume</label>
                      <input type="file" id="name" onChange={(e)=>handleResumeChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> 
                    <div className='flex justify-center mt-3'>
                        <button type="button" onClick={handleInfoSubmit} className='bg-blue-500 rounded-lg px-4 py-1.5 font-semibold text-base' >Save Changes</button>
                      </div>
                </form>
              
            </div>
          );
      
        default:
          return <div>No section matched</div>;
      }
    };
  
  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
     <div className='mt-10 flex flex-col text-white  w-2/6'>
      <button className='place-self-end' onClick={()=>setShowModal(false)}><IoMdClose size={30}/></button>
      <div className='bg-indigo-200 rounded-xl px-10 py-5  items-center mx-4 '>
        
         {renderContent()}
        
      </div>
     </div>
    </div>
  )
}

export default Modal
