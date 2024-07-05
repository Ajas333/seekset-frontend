import React,{useState,useEffect, useRef } from "react";
import default_img from "../../../assets/default.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdDateRange } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "../../../components/candidate/utilities/Modal";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { GoPencil } from "react-icons/go";
import ProfilepicModal from "../../../components/ProfilepicModal";
import axios from "axios"
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from "../../../Redux/UserDetails/userBasicDetailsSlice";



function Profile() {

  const [showModal,setShowModal] =useState(false)
  const [section,setSection] =useState("")
  const [modalData,setModalData]=useState([])
  const [action,setAction] = useState(false)
  const dispatch =useDispatch();
  const baseURL = import.meta.env.VITE_API_BASEURL

  const fileInputRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [profile_pic, setProfilepic] = useState(null);
  const [imgError,setImgError] = useState('')

  // const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access')
  const[profileData,setProfileData] = useState([])
  const[eduData,setEduData] = useState([])
  const[skills,setSkills] = useState([])
  

  useEffect(() => {
    const fetchData = async()=>{
        try{
            const response =await axios.get(baseURL+'/api/empjob/profile/',{
              headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            })
            // console.log("profile data............",response.data)
            if(response.status == 200){
              setProfileData(response.data.data)
              setEduData(response.data.data.education)                            
              // console.log("modal triggerer",modal)
            }
        }
        catch(error){
          // console.log(error)
        }
    }
    fetchData()
  }, [action])
 
  useEffect(() => {
    if (profileData?.skills) {
      const value = profileData.skills.split(',');
      // console.log(value)
      setSkills(value);
    } else {
      setSkills([]); 
    }
  }, [profileData])
  
  const toggleModal = (section = "", modalData = []) => {
    setShowModal(true);
    setSection(section);
    setModalData(modalData || {});
  };
  
  const handleDelete = async(data)=>{
    const actiondata = "educationDelete"
    // console.log("hellllllllllooooooooooo")
    // console.log("education dataa",data)
    const formData = new FormData();
    formData.append("eduId",data.id);
    formData.append("action",actiondata)
    handleFormSubmit(formData)
   
  }

  const handleFormSubmit = async(formData) =>{
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
          try{
            const responce = await axios.get(baseURL+'/api/account/user/details',{
              headers:{
                'authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
              }
            })
               if(responce.status == 200){
                  dispatch(
                    set_user_basic_details({
                      profile_pic : responce.data.user_data.profile_pic
                    })
                  )
              }
           }
        catch(error){
          // console.log(error)
        }
        
        toast.success(response.data.message,{
          position: "top-center",
        });
        setAction(!action)
      }
    }
    catch(error){
      // console.log(error)
    }
  }
      

  const handleIconClick = () => {
    fileInputRef.current.click();
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
    // console.log("profilepic after uploading",profile_pic)
    const actionPicData = "profilepic"
    const formData = new FormData();
    formData.append("profile_pic",profile_pic)
    formData.append("action",actionPicData)
    formData.append("userId",profileData.user)
    handleFormSubmit(formData)
    
  },[profile_pic])

  // console.log("sedrftgyhuji",profileData)
  // console.log(profileData.resume)
  // console.log("852967485",eduData)
  // console.log("skilsssssssss",skills)
  return (
    <div className="pt-12 ">

      <div className="flex justify-center">
      <div className="z-50">
       {showModal && <Modal action={action} setAction={setAction} setShowModal={setShowModal} section={section} modalData={modalData} userId={profileData.user} />}
       {modal && <ProfilepicModal setCroppedImageUrl={setCroppedImageUrl} setImageUrl={setImageUrl} setImgError={setImgError} imageUrl={imageUrl} closeModal={() => setModal(false)} onCropSubmit={handleCropSubmit} />}
       </div>
        <div className="w-full md:w-4/6 py-7">
          {/* personal info */}
          <div className=" bg-gray-50 gap-1 py-1 px-2 rounded-md relative">
            <div>
                <div className="absolute top-0 right-0 px-2 py-2 ">
                  <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("personal", profileData)} />
                </div>
                <div className="font-bold text-xl text-gray-500">
                  Personal Info
                </div>
            </div>
            <div className="flex flex-col md:flex-row "> 
              <div className=" pt-3 md:py-5 pl-5 flex flex-col items-center bg-blue-100 md:bg-gray-50">
                <div className="relative rounded-full border-4 border-green-500 border-opacity-60">
                <div onClick={handleIconClick} className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 cursor-pointer">
                  <GoPencil className="w-4 h-4 text-white" />
                </div>
                <img
                  src={`${baseURL}${profileData.profile_pic}`}
                  class="w-32 rounded-full"
                  alt="Avatar"
                />
                </div>
                <div className="mb-4">
                    <span className="text-gray-600 font-bold text-2xl">
                      {profileData.user_name}
                    </span>
                  </div>
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                />
              </div>
               
                <div className=" w-full px-3 py-2 pl-6 md:pt-14">
                  <div className="grid grid-cols-1 md:grid-cols-3 ">
                      
                      <div className="flex items-center mb-3 md:mb-5 gap-1">
                          <IoLocationOutline className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-600 font-semibold">{profileData.place}</span>
                        </div>

                        <div className="flex items-center mb-3 md:mb-5 gap-1">
                          <MdOutlineMail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-semibold">
                            {profileData.email}
                          </span>
                        </div>
                        
                        <div className="flex items-center  mb-3 md:mb-5 gap-1">
                          <FaPhone className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-600 font-semibold">
                            {profileData.phone}
                          </span>
                        </div>

                        <div className="flex items-center  mb-3 md:mb-5 gap-1">
                          <RxAvatar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-semibold">{profileData.Gender}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <MdDateRange className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-semibold">
                            {profileData.dob}
                          </span>
                        </div>

                  </div>
                </div>
            </div>
          </div>

          {/* Educational info */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-12 px-2 rounded-md relative">
              <div>
          
                  <div className="absolute bottom-0 right-0 px-2 py-1 ">
                  <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2"
                  onClick={() => toggleModal("education", eduData)}> Add</button>
                  </div>
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Educational Info
                  </div>
              </div>
              <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md ">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">Education</th>
            <th className="px-4 py-2 text-center">Specialization</th>
            <th className="px-4 py-2 text-center">College</th>
            <th className="px-4 py-2 text-center">Completed</th>
            <th className="px-4 py-2 text-center">Mark</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {eduData.map((edu, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{edu.education}</td>
              <td className="border px-4 py-2 text-center">{edu.specilization}</td>
              <td className="border px-4 py-2 text-center">{edu.college}</td>
              <td className="border px-4 py-2 text-center">{edu.completed}</td>
              <td className="border px-4 py-2 text-center">{edu.mark}</td>
              <td className="border px-4 py-2 text-center">
                <button className="text-red-600" onClick={() => handleDelete(edu)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>

          {/* Skills */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-5 px-2 rounded-md relative">
              <div>
                  <div className="absolute top-0 right-0 p-2 ">
                    <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("skills", { skills })}/>
                  </div>
                 
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Skills
                  </div>
              </div>
              <div className="flex flex-row gap-2">
                {skills.map((skill)=>(
                  <div className="bg-indigo-100 rounded-lg py-1.5 px-3">
                      {skill}
                  </div>
                ))}
                
              </div>
                
              
          </div>
          {/* other info */}
          <div className="mt-4 bg-gray-50 gap-1 py-1 pb-5 px-2 rounded-md relative">
              <div>
                  <div className="absolute top-0 right-0 p-2 ">
                    <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("otherInfo", profileData)}  />
                  </div>
                 
                  <div className="font-bold text-xl text-gray-500 mb-3">
                    Other Info
                  </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className=" basis-1/6">
                  <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-bold text-gray-700">Linkedin</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">GitHub</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Resume</p>
                        </div>
                  </div>
                        
                </div>
                <div className=" basis-5/6">
                  <div className="flex flex-col gap-3">
                  <div>
                            <p className="font-bold text-blue-700">{profileData.linkedin}</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-700">{profileData.github}</p>
                        </div>
                        <div>
                        <p className='text-base text-blue-700 '><a 
                            href={`${baseURL}${profileData.resume}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View Resume
                        </a></p>
                        </div>
                  </div>
                </div>
              </div>
          </div>

         
        </div>
       
      </div>
    </div>
  );
}

export default Profile;
