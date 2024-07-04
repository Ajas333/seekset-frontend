import React,{useState,useEffect} from 'react'
import logo from '../../../assets/logo.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from '../../../Redux/UserDetails/userBasicDetailsSlice';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { ProfileValidationSchema,initialValues } from '../../../validation/EmployerProfileValidation';
import ProfilepicModal from '../../../components/ProfilepicModal';




function EmpProfileCreation() {
    // const baseURL='http://127.0.0.1:8000/'
    const baseURL = import.meta.env.VITE_API_BASEURL
    const token = localStorage.getItem('access'); 
    const authentication_user = useSelector(state => state.authentication_user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [profile_pic, setProfilepic] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [modal, setModal] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState('');
    const [imgError,setImgError] = useState('')
    

    
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
    
    // console.log(profile_pic)

    const handleSubmit = async (values,{setSubmitting}) =>{
        // console.log(values)
        const formData = new FormData()
        formData.append("email",authentication_user.email),
        formData.append("phone",values.phone)
        formData.append("website_link",values.website_link)
        formData.append("headquarters",values.headquarters)
        formData.append("industry",values.industry)
        formData.append("hr_name",values.hr_name)
        formData.append("hr_phone",values.hr_email)
        formData.append("hr_email",values.hr_email)
        formData.append("address",values.address)
        formData.append("about",values.about)
        if (profile_pic) {
            formData.append("profile_pic", profile_pic);
          }
        try{
            const response = await axios.post(baseURL+'/api/account/user/emp_profile_creation/',formData,{
                headers:{

                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })

            // console.log(response)
            if(response.status==200){
                dispatch(
                  set_user_basic_details({
                    profile_pic : response.data.data.profile_pic
                  })
                )
                navigate('/employer')
              }
            }
        catch(error){
            // console.log(error)
        }finally{
          setSubmitting(false)
        }
    }
  return (
    <div>
      <div className='flex w-full  bg-blue-50'>
        <div className='hidden md:inline md:w-2/5 '>
          <div className=' mt-16 mx-4  md:w-full'>
            <h3 className='font-sans text-3xl font-bold drop-shadow-md text-blue-800'>Complete Company Profile</h3>
            <p className='text-blue-500 font-semibold'>Unlock 500+ jobs from top companies and receive direct calls <br /> from HRs</p>
            <p className='text-blue-500 font-semibold'></p>
          </div>
          <div className='mt-16 mx-4  md:w-full'>
            <ul>
             
            </ul>
          </div>
        </div>
        <div className='w-full  md:w-3/5 flex justify-end'>
          <div className='bg-white w-full h-full md:rounded-l-lg shadow-2xl'>
            <div className='h-full pb-5 pt-14'>
              <div>
                <p className='text-2xl font-medium mx-3 mt-3 text-blue-800'>About Company</p>
                <div className="mt-4 ">
                  <Formik
                  initialValues={initialValues}
                  validationSchema={ProfileValidationSchema}
                  onSubmit={handleSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form > 
                          <div className='mx-20 w-4/5 '>
                          {/* name and phone */}
                            <div className='flex justify-center gap-2'>
                              <div className='flex flex-col w-1/2'>
                                <input type="text" placeholder='Company Name' value={authentication_user.name}
                                  className="w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                  readOnly
                                />
                              </div>
                              <div className='flex flex-col w-1/2'>
                                <Field type="text" placeholder='Mobile Number' name="phone"  
                                  className={`flex ${errors.phone && touched.phone ? 'border-red-500' : 'mb-5'} items-center w-full  px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='phone' component="div" className='text-red-500 text-sm mb-2' />
                              </div>

                            </div>
                            {/* email and website */}
                            <div className='flex gap-2'>
                              <div className='flex flex-col w-1/2'>
                                <input type="text" placeholder='Email' value={authentication_user.email}
                                  className="flex items-center w-full mb-5  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                  readOnly
                                />
                              </div>
                              <div className='flex flex-col w-1/2'>
                                <input type="text" placeholder='Company Website' name="website_link" 
                                  className={`flex ${errors.website_link && touched.website_link ? 'border-red-500' : 'mb-5'} items-center w-full  px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='website_link' component="div" className='text-red-500 text-sm mb-2' />
                              </div>
                            </div>
                            {/* headquayers and industry */}
                            <div className='flex justify-center gap-2'>
                              <div className='flex flex-col w-1/2'>
                                <Field type="text" placeholder='Headquaters' name='headquarters' 
                                  className={`w-full ${errors.headquarters && touched.headquarters ? 'border-red-500' : 'mb-5'} mb-5  px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='headquarters' component="div" className='text-red-500 text-sm mb-2' />
                              </div>
                              <div className='flex flex-col w-1/2'>
                                <Field type="text" placeholder='Industry Type' name="industry" 
                                  className={`flex ${errors.industry && touched.industry ? 'border-red-500' : 'mb-5'} items-center w-full mb-5 px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='industry' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>
                            </div>
                            {/* about */}
                            <div className='flex '>
                              <div className='flex flex-col w-full'>
                                <Field
                                  as="textarea" 
                                  className={`w-full mb-5 ${errors.about && touched.about ? 'border-red-500' : 'mb-5'}  px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                  id="about" name="about" rows="4" cols="50" 
                                  placeholder='About the company'  />
                                <ErrorMessage name='about' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>

                            </div>
                            {/* hr name and he phone */}
                            {/* <div className='flex justify-center gap-2'>
                              <div className='flex flex-col w-1/2'>
                                <Field type="text" placeholder='HR Name' name='hr_name' 
                                  className={`w-full ${errors.hr_name && touched.hr_name ? 'border-red-500' : 'mb-5'}  px-4 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='hr_name' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>
                              <div className='flex flex-col w-1/2'>
                                <Field type="text" placeholder='HR Mobile Number' name="hr_phone" 
                                  className={`flex items-center w-full ${errors.hr_phone && touched.hr_phone ? 'border-red-500' : 'mb-5'} px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='hr_phone' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>


                            </div> */}
                            {/* he email */}
                            {/* <div className='flex justify-center'>
                              <div className='flex flex-col w-full'>
                                <Field type="Email" placeholder='HR Email' name='hr_email' 
                                  className={`w-full ${errors.hr_email && touched.hr_email ? 'border-red-500' : 'mb-5'}  px-4 py-3  text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='hr_email' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>
                            </div> */}
                            {/* he address */}
                            <div className='flex justify-center'>
                              <div className='flex flex-col w-full'>
                                <Field type="text" placeholder='Address' name='address' 
                                  className={`w-full ${errors.address && touched.address ? 'border-red-500' : 'mb-5'}  px-4 py-3 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl`}
                                />
                                <ErrorMessage name='address' component="div" className='text-red-500 text-sm mb-2'/>
                              </div>

                            </div>          
                            <div className='flex flex-col gap-2'>
                              <div>
                                <label htmlFor="profile_pic" className='text-gray-500 ml-2'>Profile Image</label>
                                <input type="file" name="profile_pic" onChange={handleImageChange}
                                  className="flex items-center w-full mb-5 px-3 py-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-500 text-dark-grey-900 rounded-2xl"
                                />
                              </div>
                              <div className='flex'>
                                <div>
                                  
                                </div>
                                  {croppedImageUrl && (
                                    <img src={croppedImageUrl} alt="Avatar" className='w-[150px] h-[150px] rounded-full border-2 border-gray-400' />
                                  )}
                              </div>
                            </div>
                          {modal && <ProfilepicModal setCroppedImageUrl={setCroppedImageUrl} setImageUrl={setImageUrl} setImgError={setImgError} imageUrl={imageUrl} closeModal={() => setModal(false)} onCropSubmit={handleCropSubmit} />}

                          </div>
                            <div className='flex justify-end mr-12'>
                                <button type='submit'  disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-2 rounded">
                                Submit
                                </button>
                            
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

export default EmpProfileCreation
