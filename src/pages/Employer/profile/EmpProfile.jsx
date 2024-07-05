import React,{useState,useEffect, useRef } from 'react'
import SideBar from '../../../components/employer/SideBar'
import { CiEdit } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import user_default from '../../../assets/user_default.jpg'
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";
import { LiaIndustrySolid } from "react-icons/lia";
import { FaLink } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import axios from "axios"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {useDispatch} from 'react-redux'
import { set_user_basic_details } from "../../../Redux/UserDetails/userBasicDetailsSlice";
import Modal from '../../../components/employer/utilities/Modal';
import ProfilepicModal from '../../../components/ProfilepicModal';
import RoleModal from '../../../components/employer/utilities/RoleModal';



function EmpProfile() {
  const [showModal,setShowModal] =useState(false)
  const [isOpen, setIsOpen] =useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASEURL
  const [section,setSection] =useState("")
  const [action,setAction] = useState(false)
  const [profileData,setProfileData] = useState([])
  // const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access')
  const dispatch =useDispatch();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [modal, setModal] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [profile_pic, setProfilepic] = useState(null);
  const [imgError,setImgError] = useState('')
  const [roleModal, setRoleModal] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
}

const handleResize = () => {
  setIsSmallScreen(window.innerWidth < 640);
};

useEffect(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Check initial screen size

  return () => {
      window.removeEventListener('resize', handleResize);
  };
}, []);
  
  const toggleModal = (section = "") => {
    setShowModal(true);
    setSection(section);
  };

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

  const handleCropSubmit = (croppedUrl) => {
    setCroppedImageUrl(croppedUrl); 
    setModal(false); 
  };

  useEffect(()=>{
    // console.log("profilepic after uploading",profile_pic)
    const actionPicData = "profilepic"
    const formData = new FormData();
    formData.append("profile_pic",profile_pic)
    formData.append("action",actionPicData)
    formData.append("userId",profileData.user_id)
    handleFormSubmit(formData)
    
  },[profile_pic])

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
            // console.log("profile data............",response)
            if(response.status == 200){
              setProfileData(response.data.data)     
                                
            }
        }
        catch(error){
          // console.log(error)
        }
    }
    fetchData()
  }, [action])

  const handleRole = async()=>{
     setRoleModal(true)
  }
  // console.log("profile data...................",profileData)
  return (
    <div className='pt-14 flex'>
       <div>
            {isSmallScreen ? (
                <>
                    <button onClick={toggleDrawer} title="Add New" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"
                        className="stroke-indigo-300 fill-none group-hover:fill-indigo-400 group-active:stroke-indigo-200 group-active:fill-indigo-300 group-active:duration-0 duration-300"
                      >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      strokeWidth="1.5"
                    ></path>
                      <path d="M8 12H16" strokeWidth="1.5"></path>
                      <path d="M12 16V8" strokeWidth="1.5"></path>
                    </svg>
                  </button>

                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <div className='bg-gray-50'><SideBar /></div>
                    </Drawer>
                </>
            ) : (
                <SideBar />
            )}
        </div>
        {showModal && <Modal setShowModal={setShowModal} section={section} action={action} setAction={setAction} profileData={profileData}/>}
       {modal && <ProfilepicModal setCroppedImageUrl={setCroppedImageUrl} setImageUrl={setImageUrl} setImgError={setImgError} imageUrl={imageUrl} closeModal={() => setModal(false)} onCropSubmit={handleCropSubmit} />}
      {roleModal && <RoleModal setRoleModal={setRoleModal} action={action} setAction={setAction} />}
        <div className='p-4 w-full'>
            <div className=''>
                {/* profile pic */}
                <div className='flex justify-center'>

                    <div className="">
                        <div className="relative rounded-full border-4 border-green-500 border-opacity-60">
                            <div  className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 cursor-pointer">
                            <GoPencil onClick={handleIconClick} className="w-4 h-4 text-white" />
                            </div>
                            <img
                            src={`${baseURL}${profileData.profile_pic}`}
                            class="w-32 rounded-full"
                            alt="Avatar"
                            />
                             <input type="file" ref={fileInputRef} style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>
                    {/* company info */}
                    <div className='flex justify-center mt-5'>
                        <div className=' w-5/6  md:w-4/6 py-7'>
                            <div className='bg-gray-50 rounded-md relative py-1 px-2'>
                                <div>
                                    <div className="absolute top-0 right-0 px-2 py-2 ">
                                    <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("companyInfo")} />
                                    </div>
                                   
                                </div>

                                {/* <div className='mt-2'>
                                    
                                    <div className='grid grid-cols-4'>
                                        <div className=''>
                                            <div className="flex items-center gap-1">
                                                <RxAvatar className="w-4 h-4 text-gray-500" />
                                                <span className="text-blue-600  font-bold">{profileData.user_full_name}</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className="flex items-center mb-5 gap-1">
                                                <MdOutlineMail className="w-4 h-4 text-gray-500" />
                                                <span className="text-gray-600 font-semibold">
                                                {profileData.user_email}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className="flex items-center mb-5 gap-1">
                                                <FaPhone className="w-4 h-4 text-gray-500" />
                                                <span className="text-gray-600 font-semibold">
                                            {profileData.phone}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className="flex items-center mb-5 gap-1">
                                                <IoLocationOutline className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-600 font-semibold">{profileData.headquarters}</span>
                                            </div>
                                        </div> 
                                       <div className=''>
                                            <div className="flex items-center mb-5 gap-1">
                                                <LiaIndustrySolid  className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-600 font-semibold">{profileData.industry}</span>
                                            </div>
                                       </div>
                                       
                                       <div>
                                            <div className="flex items-center mb-5 gap-1">
                                                <FaLink   className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-600 font-semibold">{profileData.website_link}</span>
                                            </div>
                                       </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center mb-5 gap-1">
                                            <FaRegAddressCard    className="w-5 h-5 text-gray-500" />
                                            <span className="text-gray-600 font-semibold">{profileData.address}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col  mb-5 gap-1">
                                            <p className='text-gray-700 font-bold'>About</p>
                                            <span className="text-gray-600 font-semibold">{profileData.about}</span>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='bg-gray-50 rounded-md relative py-1 px-2 '>
                                  <div>
                                    <div className="absolute top-0 right-0 px-2 py-2 ">
                                      <CiEdit className="text-xl text-blue-600 font-medium cursor-pointer" onClick={() => toggleModal("companyInfo")} />
                                    </div>
                                    <div className="font-bold text-xl underline text-gray-500">
                                      Company Info
                                    </div>
                                  </div>
                                  <div className='mt-2'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <RxAvatar className="w-4 h-4 text-gray-500" />
                                          <span className="text-blue-600  font-bold">{profileData.user_full_name}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <MdOutlineMail className="w-4 h-4 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.user_email}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <FaPhone className="w-4 h-4 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.phone}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <IoLocationOutline className="w-5 h-5 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.headquarters}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <LiaIndustrySolid className="w-5 h-5 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.industry}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <FaLink className="w-5 h-5 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.website_link}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='grid grid-cols-1 mt-3'>
                                      <div className=''>
                                        <div className="flex items-center gap-1">
                                          <FaRegAddressCard className="w-5 h-5 text-gray-500" />
                                          <span className="text-gray-600 font-semibold">{profileData.address}</span>
                                        </div>
                                      </div>
                                      <div className=''>
                                        <div className="flex flex-col gap-1 mt-3">
                                          <p className='text-gray-700 font-bold'>About</p>
                                          <span className="text-gray-600 font-semibold">{profileData.about}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                            </div>

                            <div className='bg-gray-50 rounded-md relative py-1 px-2 mt-2'>
                              <div className='absolute top-0 right-0'>
                              <button onClick={handleRole} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                               Add
                                </button>
                              </div>
                               <div className='text-gray-500 font-bold text-lg underline'>
                                  <span>Add Role</span>
                               </div>
                               <div>
                               {profileData && profileData.roles && profileData.roles.length > 0 && (
                                        <div className="mt-4">
                                      
                                          <table className="min-w-full bg-white">
                                            <thead>
                                              <tr>
                                                <th className="py-2 px-4 bg-gray-200">Role Name</th>
                                                <th className="py-2 px-4 bg-gray-200">Role Email</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {profileData.roles.map((role, index) => (
                                                <tr key={index}>
                                                  <td className="border px-4 py-2">{role.rolename}</td>
                                                  <td className="border px-4 py-2">{role.roleemail}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}
                               </div>
                            </div>
                        </div>
                    </div>

                   
            </div>  
        </div>
    </div>
  )
}

export default EmpProfile
