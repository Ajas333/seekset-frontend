import React, { useState,useEffect } from 'react';
import logo from '../../../assets/logo.png';
import { CiCircleRemove } from "react-icons/ci";
import { FcCheckmark } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from '../../../Redux/UserDetails/userBasicDetailsSlice';
import { Formik,Field,Form,ErrorMessage } from 'formik';
import user_default from '../../../assets/user_default.jpg'
import { RiPencilFill } from "react-icons/ri";
import ProfilepicModal from '../../../components/ProfilepicModal';
import { ProfileDataSchema,initialValues } from '../../../validation/CandidateProfileValidation';



function ProfileCreation() {

  // const baseURL='http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_API_BASEURL
  const token = localStorage.getItem('access'); 
  const authentication_user = useSelector(state => state.authentication_user);
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [profile_pic, setProfilepic] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modal, setModal] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [imgError,setImgError] = useState('')


  const [resume, setResume] = useState({
    resume: null
  });
  const [data, setData] = useState({
    'phone': "",
    'dob': "",
    'gender': "",
    'specilization': "",
    'education': "",
    'completed': "",
    'mark': "",
    'college': "",
    'linkedin': "",
    'github': "",

  });

  const stepDown = () => setStep(step - 1);
  const stepUp = () => setStep(step + 1);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        
        setImageUrl(reader.result);
      };
      setModal(true)
      reader.readAsDataURL(file);
    }
  };

  const handleCropSubmit = (croppedUrl) => {
    setCroppedImageUrl(croppedUrl); 
    setModal(false); 
  };

  const handleResumeChange = (e) => {
    setResume({ resume: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  // console.log("image uploaded.......",imageUrl)
  useEffect(()=>{
    const convertBase64ToImage = (base64String) => {
      
      const base64Pattern = /^data:image\/(png|jpeg|jpg);base64,/;
    if (!base64Pattern.test(base64String)) {
      // console.error('Invalid base64 string');
      return;
    }   
    const base64Content = base64String.replace(base64Pattern, '');
    const binaryString = window.atob(base64Content);
    const length = binaryString.length;
    const byteArray = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/png' });
    const file = new File([blob], 'profile_pic.png', { type: 'image/png' });
    setProfilepic(file);
    };
    convertBase64ToImage(croppedImageUrl)
    // console.log("cropped image url............",croppedImageUrl)
  },[croppedImageUrl])


  useEffect(()=>{
      // console.log("profile piccture after crop",profile_pic)
  },[profile_pic])

  const handleSubmit =async(values,{setSubmitting}) =>{

    // console.log(values)
    
    const skill=skills.toString()
    
    const formData=new FormData();
    formData.append("email",authentication_user.email)
    formData.append("place",values.place)
    formData.append("phone", values.phone);
    formData.append("dob", values.dob);
    formData.append("Gender", values.gender);
    if (profile_pic) {
      formData.append("profile_pic", profile_pic);
    }
    formData.append("education", values.education);
    formData.append("specilization", values.specilization);
    formData.append("college", values.college);
    formData.append("completed", values.completed);
    formData.append("mark", values.mark);
    formData.append("skills",skill);
    formData.append("linkedin", values.linkedin);
    formData.append("github", values.github);
    if (resume.resume) {
      formData.append("resume", resume.resume, resume.resume.name);
    }
    // console.log("form data................",formData)
    try{
        const responce=await axios.post(baseURL+'/api/account/user/profile_creation/',formData,{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          })
        // console.log("response...........................",responce)
        if(responce.status==200){
          dispatch(
            set_user_basic_details({
              profile_pic : responce.data.data.profile_pic
            })
          )
          navigate('/candidate/')
        }
    }
    catch(error){
        // console.log("error",error)
    }finally{
      setSubmitting(false)
    }

  }



  // console.log(data);
  // console.log(profile_pic);
  // console.log(resume);
  // console.log(token)
  useEffect(() => {
    return () => {
        // console.log("drftgyhujikotyhuji",authentication_user)
    };
  }, [])
  return (
    <div>
      <div className='absolute m-2'>
        <img src={logo} alt="" className='w-12 h-10' />
      </div>
      <div className='flex w-full bg-blue-50'>
        <div className='hidden md:inline md:w-2/5 '>
          <div className='mt-16 mx-4  md:w-full'>
            <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Complete Your Profile</h3>
            <p className='text-blue-500 font-semibold'>Unlock 500+ jobs from top companies and receive direct calls <br /> from HRs</p>
            <p className='text-blue-500 font-semibold'>{authentication_user.name}</p>
          </div>
          <div className='mt-16 mx-4  md:w-full'>
            <ul>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Take 3 Steps</span></li>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Direct call from HR</span></li>
              <li className='flex'><IoMdCheckmarkCircle className='text-gray-500 h-8 w-8' /><span className='font-bold text-gray-500'>Connect with Top Companies</span></li>
            </ul>
          </div>
        </div>
        <div className='w-full  md:w-3/5 flex justify-end  '>
          <div className='bg-white w-full md:rounded-l-lg shadow-2xl py-12'>
            <div className=' '>
              {/* numbers */}
              <div className='flex mt-16 md:mt-8 h-12 w-full justify-center'>
                <div>
                  <div className={`flex justify-center rounded-full ${step > 1 ? 'border-4' : 'border-2'} ${step > 1 ? 'border-green-500' : 'border-gray-900'} border-solid w-12 h-12`}>
                    {step > 1 ? (<FcCheckmark className='mt-2 h-6 w-8' />) : (<span className='mt-2'>1</span>)}
                  </div>
                </div>
                <div className='mt-5 w-28 '>
                  <hr className={`h-0 border-b-2 border-solid ${step > 1 ? 'border-green-500' : 'border-gray-700'}`} />
                </div>
                <div>
                  <div className={`flex justify-center rounded-full ${step > 2 ? 'border-4' : 'border-2'} ${step > 2 ? 'border-green-500' : 'border-gray-900'} border-solid w-12 h-12`}>
                    {step > 2 ? (<FcCheckmark className='mt-2 h-6 w-8' />) : (<span className='mt-2'>2</span>)}
                  </div>
                </div>
                <div className='mt-5 w-28 '>
                  <hr className={`h-0 border-b-2 border-solid ${step > 2 ? 'border-green-500' : 'border-gray-900'} `} />
                </div>
                <div>
                  <div className='flex justify-center rounded-full border-2 border-gray-900 border-solid w-12 h-12'>
                    <span className='mt-2'>3</span>
                  </div>
                </div>
              </div>
              <div>
                {step === 1 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>About me</p>)}
                {step === 2 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>Highest Education</p>)}
                {step === 3 && (<p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>Skills</p>)}

                <div className="mt-4 ">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ProfileDataSchema}
                    onSubmit={handleSubmit}
                  >
                    {({errors,touched,isSubmitting})=>(
                      <Form >
                          {/* about me content */}
                          {step === 1 && (
                            <div className='aboutme mx-20 w-4/5 '>
                                {/* Username and mobile number */}
                                <div className='flex  gap-2'>
                                  <div className='flex flex-col w-1/2 '>
                                    <label htmlFor="username" className='text-gray-500 font-semibold ml-2'>Username</label>
                                    <input type="text" name='username' placeholder='Username' value={authentication_user.name}
                                      className="w-full mb-5  px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                      readOnly
                                    />
                                  </div>
                                  <div className='flex flex-col w-1/2 '>
                                    <label htmlFor="phone" className='text-gray-500 font-semibold ml-3'>Mobile Number</label>
                                      <Field type="text" placeholder='Type here' name="phone" 
                                        className={`flex ${errors.phone && touched.phone? 'border-red-500':''} items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                      />
                                      <ErrorMessage name='phone' component='div' className='text-red-500 text-sm mb-2' />
                                  </div>
                                </div>
                                {/* Email and Place */}
                                <div className='flex gap-2'>
                                  <div className='flex flex-col w-1/2'>
                                    <label htmlFor="email" className='text-gray-500 font-semibold ml-3'>Email</label>
                                      <input type="text" placeholder='Email' value={authentication_user.email}
                                        className="flex items-center w-full mb-5  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                        readOnly
                                      />
                                  </div>
                                  <div className='flex flex-col w-1/2'>
                                      <label htmlFor="place" className='text-gray-500 font-semibold ml-3'>Place</label>
                                      <Field type="text" placeholder='Type here' name="place" 
                                        className={`flex ${errors.place && touched.place ? 'border-red-500':''} items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                      />
                                      <ErrorMessage name='place' component='div' className='text-red-500 text-sm mb-2' />

                                  </div>
                                </div>
                                {/* date of birth and gender */}
                                <div className='flex  gap-2'>
                                  <div className='flex flex-col w-1/2'>
                                    <label htmlFor="dob"  className='text-gray-500 font-semibold ml-3'>Date of Birth</label>
                                    <Field type="date" placeholder='Date Of Birth' name="dob" 
                                      className={`w-full  ${errors.dob && touched.dob? 'border-red-500':''} mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                    />
                                  <ErrorMessage name='dob' component='div' className='text-red-500 text-sm mb-2' />

                                  </div>
                                  <div className='flex flex-col w-1/2'>
                                  <label htmlFor="gender"  className='text-gray-500 font-semibold ml-3'>Gender</label>
                                    <Field as="select" name="gender" 
                                      className={`flex  ${errors.gender && touched.gender? 'border-red-500':''} items-center w-full mb-5 px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                    >
                                      <option value="">Select</option>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="others">Others</option>
                                    </Field>
                                  <ErrorMessage name='gender' component='div' className='text-red-500 text-sm mb-2' />

                                  </div>
                                </div>
                                {/* profile image */}
                                <div className='flex'>
                                  <div className='flex flex-col'>
                                    {imgError && <p className='text-red-500 text-xs'>{imgError}</p>}
                                    <label htmlFor="profile_pic" className='text-gray-500 font-semibold ml-3'>Profile Image</label>
                                    <input type="file" accept=".jpg,.jpeg,.png" name="profile_pic" onChange={handleImageChange}
                                      className="flex items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                    />
                                  </div>
                                  <div>
                                  </div>                            
                                  <div className='w-3/5 '>                          
                                      <div className='flex flex-col items-center'>
                                          <div className='relative'>
                                          {croppedImageUrl && (
                                            <img src={croppedImageUrl} alt="Avatar" className='w-[150px] h-[150px] rounded-full border-2 border-gray-400' />
                                          )}
                                          </div>
                                      </div>
                                  </div>
                                  
                                </div>
                            </div>
                          )}
                          {modal && <ProfilepicModal setCroppedImageUrl={setCroppedImageUrl} setImageUrl={setImageUrl} setImgError={setImgError} imageUrl={imageUrl} closeModal={() => setModal(false)} onCropSubmit={handleCropSubmit} />}

                          {/* Education details */}
                          {step === 2 && (
                            <div className='education mx-20 w-4/5 '>
                              {/* education and spesialization */}
                              <div className='flex  gap-2'>
                                <div className="flex flex-col w-1/2">
                                  <label htmlFor="education" className='text-gray-500 font-semibold ml-2'>Education</label>
                                    <Field as="select" name="education"
                                      className={`flex  ${errors.phone && touched.phone? 'border-red-500':''} items-center w-full mb-5 px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                    >
                                      <option value="">Select</option>
                                      <option value="10th">10th</option>
                                      <option value="higher_secondary">Higher Secondary</option>
                                      <option value="graduation">Graduation</option>
                                      <option value="post_graduation">Post Graduation</option>
                                      <option value="iti">ITI</option>
                                      <option value="diploma">Diploma</option>
                                    </Field>
                                  <ErrorMessage name='education' component='div' className='text-red-500 text-sm mb-2' />

                                </div>
                                <div className="flex flex-col w-1/2">
                                  <label htmlFor="specilization" className='text-gray-500 font-semibold ml-2'>Specialization</label>
                                  <Field type="text" placeholder='Type here' name="specilization" 
                                    className={`flex ${errors.phone && touched.phone? 'border-red-500':''} items-center w-full mb-5 px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                  />
                                  <ErrorMessage name='specilization' component='div' className='text-red-500 text-sm mb-2' />
                                </div>
                              </div>
                              {/* collage name */}
                              <div className='flex flex-col'>
                                <label htmlFor="college" className='text-gray-500 font-semibold ml-2'>College Name</label>
                                  <Field type="text" placeholder='School/College' name="college" 
                                    className={`flex ${errors.phone && touched.phone? 'border-red-500':''} items-center w-full mb-5  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                  />
                                  <ErrorMessage name='college' component='div' className='text-red-500 text-sm mb-2' />

                              </div>
                              {/* completeion date and mark */}
                              <div className='flex gap-2'>
                                <div className='flex flex-col w-1/2'>
                                <label htmlFor="completed" className='text-gray-500 font-semibold ml-2'>Date of Completion</label>
                                  <Field type="date" placeholder='Completed On' name="completed" 
                                    className={`flex ${errors.completed && touched.completed? 'border-red-500':''} items-center w-full mb-5 px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                  />
                                  <ErrorMessage name='completed' component='div' className='text-red-500 text-sm mb-2' />

                                </div>
                                <div className='flex flex-col w-1/2'>
                                <label htmlFor="mark" className='text-gray-500 font-semibold ml-2'>Mark in CGPA</label>
                                  <Field type="text" placeholder='Type here' name="mark" 
                                    className={`flex ${errors.mark && touched.mark? 'border-red-500':''} items-center w-full mb-5 px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                  />
                                  <ErrorMessage name='mark' component='div' className='text-red-500 text-sm mb-2' />

                                </div>
                              </div>
                            </div>
                          )}
                          {step === 3 && (
                            <>
                            {/* other details */}
                              <div className='skills mx-20 w-4/5 '>
                                {/* skills */}
                                <div className='flex'>
                                  <div className='flex flex-col w-full'>
                                    <label htmlFor="skills" className='text-gray-500 font-semibold ml-2'>Add Skills</label>
                                    <div className='flex '>
                                        <input type="text" placeholder='Type here' name="skills"
                                        value={skill}
                                        className="flex items-center w-full mb-5 mx-2 px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                        onChange={handleSkill}
                                      />
                                      <div onClick={handleAddSkill} className="h-7 cursor-pointer bg-blue-700 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                                        Add
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='mx-5 skills-list mb-5 flex flex-wrap'>
                                  {skills.map((skill, index) => (
                                    <div key={index} className='mr-2 mb-2 px-2 pb-1 skill-item bg-green-200 rounded-md flex'>
                                      <span className="text-sm font-medium text-gray-600">{skill}</span>
                                      <span className='mt-1 ml-1 cursor-pointer' onClick={() => handleRemoveSkill(index)}><CiCircleRemove /></span>
                                    </div>
                                  ))}
                                </div>
                                {/* Linkedin link */}
                                <div className='flex'>
                                  <div className='flex flex-col w-full'>
                                    <label htmlFor="linkedin" className='text-gray-500 font-semibold ml-2'>LinkedIn link</label>
                                    <Field type="text" placeholder='Type here' name="linkedin" 
                                      className={`flex ${errors.linkedin && touched.linkedin? 'border-red-500':''} items-center w-full mb-5  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                    />
                                  <ErrorMessage name='linkedin' component='div' className='text-red-500 text-sm mb-2' />

                                  </div>
                                </div>
                                {/* github link */}
                                <div className='flex'>
                                  <div className='flex flex-col w-full'>
                                    <label htmlFor="github" className='text-gray-500 font-semibold ml-2'>Github link</label>
                                    <Field type="text" placeholder='Type here' name="github" 
                                      className={`flex ${errors.github && touched.github? 'border-red-500':''} items-center w-full mb-5  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                    />     
                                  <ErrorMessage name='github' component='div' className='text-red-500 text-sm mb-2' />

                                  </div>
                                </div>
                                {/* Resume image */}
                                <div className='flex'>
                                  <div className='flex flex-col w-full'>
                                    <label htmlFor="resume" className='text-gray-500 font-semibold ml-2'>Resume</label>
                                      <input type="file" name="resume" onChange={(e)=>handleResumeChange(e)}
                                        className={`flex  items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                      />
                                    {/* <ErrorMessage name='resume' component='div' className='text-red-500 text-sm mb-2' /> */}

                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          <div className='flex justify-end mr-12'>
                            {step > 1 && (
                              <div onClick={stepDown} className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold px-2 rounded mr-2">
                                Prev
                              </div>
                            )}
                            {step < 3 && (
                              <div onClick={stepUp} className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold px-2 rounded">
                                Next
                              </div>
                            )}
                            {step === 3 && (
                              <button type='submit' disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                                Submit
                              </button>
                            )}
                          </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCreation;
