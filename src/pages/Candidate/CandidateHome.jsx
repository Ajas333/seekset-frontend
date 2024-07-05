import React,{useState,useEffect} from 'react'
import Filter from '../../components/candidate/utilities/Filter';
import axios from 'axios';
import JobCard from '../../components/candidate/utilities/JobCard';
import NewsCard from '../../components/candidate/utilities/NewsCard';
import SearchBox from '../../components/candidate/utilities/SearchBox';
import Pagination from '../../components/candidate/utilities/Pagination';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'


function CandidateHome() {
  const baseURL = import.meta.env.VITE_API_BASEURL
    const [dateRange, setDateRange] = useState('');
    const [salaryRange, setSalaryRange] = useState(0);
    const [jobType,setJobType] =useState('')
    const [experienceType, setExperienceType] = useState('');
    // const baseURL='http://127.0.0.1:8000'
    const token = localStorage.getItem('access')
    const [jobData,setJobData] = useState([])
    const [filterData,setFilterData] = useState([])
    const [action,setAction]=useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isOpen, setIsOpen] =useState(false)
   

    const toggleDrawer = () => {
      setIsOpen(!isOpen)
  }

    // console.log(token)
    useEffect(() => {
      const fetchJobData = async()=>{
        try{
          const responce = await axios.get(baseURL+'/api/empjob/getAlljobs/',{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'multipart/form-data'
          }
          })
          // console.log(responce)
          if(responce.status == 200){
            setJobData(responce.data)
          }
          else{
            alert("something went wrong")
          }
        }
        catch(error){
          // console.log(error)
        }
      }
      fetchJobData();
    },[])

   const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = action ? filterData.slice(indexOfFirstItem, indexOfLastItem) : jobData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((action ? filterData.length : jobData.length) / itemsPerPage);

  // console.log("ufvuyfuyfuyfuyf",jobData)
  // console.log("filtered data.........",filterData)
  return (
    <div className='flex relative'> 
      {/* filter side bar */}
      <div className='absolute md:hidden mt-14 '>
        <button onClick={toggleDrawer} className="w-16 h-8 mt-2 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer">
          Filter
        </button>
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            className='bla bla bla'>
            <div className='bg-gray-50'>
            <Filter dateRange={dateRange} setDateRange={setDateRange} salaryRange={salaryRange} setSalaryRange={setSalaryRange} jobType={jobType}  setJobType={setJobType} experienceType={experienceType}
              setExperienceType={setExperienceType} setJobData={setJobData}jobData={jobData} setFilterData = {setFilterData} setAction = {setAction}
          />
            </div>
        </Drawer>
        </div>
      <div className='hidden md:block w-64'>
        <Filter dateRange={dateRange} setDateRange={setDateRange} salaryRange={salaryRange} setSalaryRange={setSalaryRange} jobType={jobType}  setJobType={setJobType} experienceType={experienceType}
          setExperienceType={setExperienceType} setJobData={setJobData}jobData={jobData} setFilterData = {setFilterData} setAction = {setAction}
          />
      </div>
        
      {/* main body  */}
        <div className='pt-7 w-full'>
          {/* search bar */}
            <div className='mt-7 ml-10 flex justify-center '>
                <SearchBox  
                  setJobData={setJobData}
                  jobData={jobData}
                  setFilterData = {setFilterData}
                  setAction = {setAction}/>
            </div>

            <div className="flex flex-col min-h-[32rem] ">
                <div className="flex-grow flex 0 justify-center ">
                  <div className="flex flex-col justify-center md:w-4/6 ">
                    {currentJobs.map((job) => (
                      <JobCard  key={job.id} id={job.id} img={job.employer.profile_pic} title={job.title} posted={job.posteDate} applybefore={job.applyBefore} 
                        empname={job.employer.user_full_name} jobtype={job.jobtype} salary={job.lpa} experiance={job.experiance} location={job.location}/>
                    ))}

                  </div>
                </div>
                <div className="">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
           
        </div>
    </div>
  )
}

export default CandidateHome
