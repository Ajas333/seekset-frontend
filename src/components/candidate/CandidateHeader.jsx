import React,{useEffect,useState} from 'react'
import logo from '../../assets/logo.png'
import default_img from '../../assets/default.png'

import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { useSelector, useDispatch } from "react-redux";
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';
import { FaUserTie } from "react-icons/fa";
import NotificationModal from './utilities/NotificationModal';
import axios from 'axios';
import InterviewCallModal from './utilities/InterviewCallModal';
import HeaderOptions from './utilities/HeaderOptions';

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'


function CandidateHeader() {
  const baseURL = import.meta.env.VITE_API_BASEURL
  const authentication_user = useSelector((state)=> state.authentication_user);
  const userBasicDetails = useSelector((state)=>state.user_basic_details);
  const token = localStorage.getItem('access'); 
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const profile_image=`${baseURL}${userBasicDetails.profile_pic}`
  const user_id = userBasicDetails.user_type_id
  const [modal,setModal] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [userid,setUserid] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0);
  const [interviewModal,setInterviewModal] = useState(false)
  const [roomId,setRoomId] = useState()
  const [intID,setIndId] = useState()

  const [isOpen, setIsOpen] =useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
}

  useEffect(()=>{
  },[userBasicDetails.profile_pic])
  const handleLogout = ()=>{
    localStorage.clear();
    setNotifications([])
    dispatch(
      set_Authentication({
        name: null,
        email:null,
        isAuthenticated: false,
        isAdmin: false,
        usertype:null,
      })
    );
    dispatch(
      set_user_basic_details({
        name: null,
        email:null,
        phone:null,
        profile_pic:null,
        user_type_id:null
      })
    );
    navigate('/login')
  }
  const items = [
    {
      label: (
        <Link to={'/candidate/profile/'}><p>Profile</p></Link>
      ),
      key: '0',
    },
    {
      label: (
        <p onClick={handleLogout} className=''>Logout</p>
      ),
      key: '1',
    },
  ];
  
  
  useEffect(() => {
    const get_user_id = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/account/current_user/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setUserid(response.data.id);
            }
        } catch (error) {
        }
    };
    get_user_id();
}, []);

useEffect(() => {
    if (userid !== null) {
       
 const ws = new WebSocket(`${baseURL}/ws/notifications/${userid}/`);
        ws.onmessage = (e) => {
          const data = JSON.parse(e.data);
          if (data.message && data.message.startsWith('Interview call')) {
            const parts = data.message.split(' - '); // Split the message by ' - '
            const roomId = parts[1].trim(); // The second part is the roomId
            const interviewId = parts[2].trim(); // The third part is the interviewId
            setRoomId(roomId)
            setIndId(interviewId)
            setInterviewModal(true)
          }
          setNotifications((prevNotifications) => {
              const newNotifications = [...prevNotifications, data];
              const unreadCount = newNotifications.filter(n => !n.is_read).length;
              setUnreadCount(unreadCount);
              return newNotifications;
          });
      };

        ws.onclose = () => {
        };

        return () => {
            ws.close();
        };
    }
}, [userid]);

  console.log(notifications)
  return (
    <div className=' w-full flex justify-between h-12 bg-blue-200 fixed top-0 z-50' >
      {modal && <NotificationModal setUnreadCount={setUnreadCount} notifications={notifications} setModal={setModal} userid={userid} />}
      {interviewModal && <InterviewCallModal roomId={roomId} intID={intID} setInterviewModal={setInterviewModal}/>}
        <Link to={'/'}>
        <div className='ml-3  flex cursor-pointer'>
            <div className='mt-2'>
              <img src={logo} alt="" className='w-10 h-8'/>
            </div>
            <p className='mt-2 text-xl font-bold font-sans text-indigo-900'>
              SeekSet
            </p>
        </div>
        </Link>
        <div className='flex items-center'>
            <Link to={'/candidate'}><span className='text-base font-semibold text-bg-800 cursor-pointer'>Home</span></Link>
        </div>
        <div className='flex'>
            
            <div className='flex gap-7 px-3 items-center'>
               
                <div className='flex justify-center items-center gap-4'>
                  <div className='hidden md:block'>
                    <HeaderOptions unreadCount={unreadCount} setModal={setModal} />
                  </div>
                  <div className='block md:hidden'>
                  <button onClick={toggleDrawer} className="group flex items-center justify-start w-9 h-9 bg-blue-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 
                                shadow-lg hover:w-12  ">
                    <div className="flex items-center justify-center w-full transition-all duration-300 ">
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                      ></path>
                    </svg>
                   </div>
                  </button>
                  <Drawer
                      open={isOpen}
                      onClose={toggleDrawer}
                      direction='right'
                      size={80}
                      className='bla bla bla'>
                      <div className='bg-gray-50'>
                          <HeaderOptions toggleDrawer={toggleDrawer} unreadCount={unreadCount} setModal={setModal} />
                      </div>
                  </Drawer>
                  </div>
                  <div>
                    <Dropdown menu={{items,}}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {authentication_user.isAuthenticated ? 
                              <img class="w-10 h-10 rounded-full" src={profile_image} alt="Rounded avatar"/> 
                              :
                              <img class="w-8 h-8 rounded-full" src={default_img} alt="Rounded avatar"/>
                          }
                          
                          </Space>
                        </a>
                      </Dropdown>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateHeader
