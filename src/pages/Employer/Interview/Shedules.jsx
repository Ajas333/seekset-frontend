import React,{useState,useEffect} from 'react'
import SideBar from '../../../components/employer/SideBar'
import axios from 'axios';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Link } from 'react-router-dom';
import AcceptRejectModal from '../../../components/employer/utilities/AcceptRejectModal';
import { extractDate,extractTime,isInterviewTimeReached } from '../../../components/employer/constants/DateTime';


function Shedules() {
    
    const baseURL = import.meta.env.VITE_API_BASEURL
    const [isOpen, setIsOpen] =useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false);  
    const token = localStorage.getItem('access'); 
    const [interview,setInterview] = useState([])
    const [callModal,setCallModal] = useState(false)
    const [modal,setModal] = useState(false)
    const [modalData,setModalData] = useState()
    const [load,setLoad] = useState(false)

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
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const responce = await axios.get(baseURL+'/api/interview/shedules/',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Accept' : 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log("Sheduled jobs details.....",responce)
                if(responce.status == 200){
                    setInterview(responce.data)
                }
            }
            catch(error){
                // console.log(error)
            }
        }
        fetchData();
    },[load])
   
    console.log("interviews,....................",interview)

    const toggleModal = (interview_id)=>{
      const data = interview.filter(int => int.id == interview_id)
      setModalData(data)
      setModal(true)
    }

  return (
    <div className='pt-12 flex min-h-[80vh]'>
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
        <div className='w-full'>
          {modal && <AcceptRejectModal setModal={setModal} modalData={modalData} setLoad={setLoad} load={load} />}
        <div className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Interview Schedules</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Job Title</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Candidate</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Applied Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Interview Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Interview Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {interview.map((interview) => (
                  
                  <tr key={interview.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{interview.job.title}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{interview.candidate_name}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractDate(interview.applyDate)}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractDate(interview.date)}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold dark:text-gray-200">{extractTime(interview.date)}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        interview.status === "Upcoming"
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-green-500 dark:text-green-400"
                      }`}
                    >
                      {isInterviewTimeReached(interview.date) && interview.status ==="Upcoming" ? (
                        <Link to={`/interview/${interview.id}`}>
                          <button className="bg-blue-500 text-white py-1 px-3 rounded">Start</button>
                        </Link>
                      ):(

                      interview.status
                      )}
                    </td>
                    <td>
                    {isInterviewTimeReached(interview.date) && interview.status ==="Upcoming" ? (            
                          <button className="bg-indigo-500 text-white py-1 px-3 rounded" onClick={()=>toggleModal(interview.id)}>Action</button>
                      ):(

                    ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
        </div>  
     
    </div>
  )
}

export default Shedules
