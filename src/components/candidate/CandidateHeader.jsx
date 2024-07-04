import React,{useEffect,useState} from 'react'
import logo from '../../assets/logo.png'
import default_img from '../../assets/default.png'
import { MdOutlineMessage } from "react-icons/md";
import { ImBookmarks } from "react-icons/im";
import { FaFileAlt,FaEnvelopeOpenText } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { useSelector, useDispatch } from "react-redux";
import { set_user_basic_details } from '../../Redux/UserDetails/userBasicDetailsSlice';
import { FaUserTie } from "react-icons/fa";
import NotificationModal from './utilities/NotificationModal';
import axios from 'axios';
import InterviewCallModal from './utilities/InterviewCallModal';


function CandidateHeader() {
  const baseURL = import.meta.env.VITE_API_BASEURL
  const authentication_user = useSelector((state)=> state.authentication_user);
  const userBasicDetails = useSelector((state)=>state.user_basic_details);
  // const baseURL='http://127.0.0.1:8000'
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
  useEffect(()=>{
      // console.log("inside header image",profile_image)
  },[userBasicDetails.profile_pic])
  // console.log("inside user header...............",authentication_user)
  // console.log("inside user header..........userbasic details...........",userBasicDetails)
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
            // console.log("current user response:", response);
            if (response.status === 200) {
                setUserid(response.data.id);
            }
        } catch (error) {
            // console.log(error);
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
            // console.log("tryuvuyfvyvvy",data)
            const parts = data.message.split(' - '); // Split the message by ' - '
            const roomId = parts[1].trim(); // The second part is the roomId
            const interviewId = parts[2].trim(); // The third part is the interviewId
            setRoomId(roomId)
            setIndId(interviewId)
            setInterviewModal(true)
          }
          // console.log("interview data",data)
          setNotifications((prevNotifications) => {
              const newNotifications = [...prevNotifications, data];
              const unreadCount = newNotifications.filter(n => !n.is_read).length;
              setUnreadCount(unreadCount);
              return newNotifications;
          });
      };

        ws.onclose = () => {
            // console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }
}, [userid]);




// console.log("notifications.......................................",notifications)
// console.log("notification count.......................",unreadCount)
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
            <div className='pt-1 mx-2'>
              <hr className='h-10 border-l-4 border-solid border-gray-500' />
            </div>
            <div className='flex gap-7 px-3 items-center'>
                <Link to={'/candidate/message/'}>
                <div className='flex flex-col justify-center items-center'>
                    <MdOutlineMessage className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Message</p>
                </div>
                </Link>
                
                <Link to={'/candidate/shedules/'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <FaUserTie  className='w-5 h-5 '/>
                      <p className='text-xs font-medium text-gray-500'>Interview</p>
                </div>
                </Link>
                <Link to={'/candidate/savedjobs'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                    <ImBookmarks className='w-5 h-5 '/>
                    <p className='text-xs font-medium text-gray-500'>Saved Jobs</p>
                </div>
                </Link>
                <Link to={'/candidate/applyedjobs/'}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                <FaFileAlt className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Applyed Jobs</p>
                </div>
                </Link>
                <div className='flex flex-col justify-center items-center cursor-pointer relative' onClick={()=>setModal(true)}>
                  {unreadCount >0 &&
                    <div className='bg-red-500 text-white text-xs rounded-full px-1 absolute right-2'>{unreadCount}</div>
                  }
                    <IoNotifications className='w-5 h-5'/>
                    <p className='text-xs font-medium text-gray-500'>Notification</p>
                </div>
                <div className='flex flex-col justify-center items-center '>
                 
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
  )
}

export default CandidateHeader
