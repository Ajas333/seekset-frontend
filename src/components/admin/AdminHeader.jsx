import React from 'react'
import logo from '../../assets/logo.png'
import default_img from '../../assets/default.png'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Space } from 'antd';


function AdminHeader() {
    const authentication_user = useSelector((state)=> state.authentication_user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout = ()=>{
        localStorage.clear();
        dispatch(
          set_Authentication({
            name: null,
            email:null,
            isAuthenticated: false,
            isAdmin: false,
            usertype:null,
          })
        );
       
        navigate('/admin/')
      }
      const items = [
        {
          label: (
            <p>Profile</p>
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
  return (
    <div className=' fixed w-full flex justify-between h-12 bg-blue-200 z-50' >
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
    <div className='flex'>
        <div className='pt-1 mx-2'>
          <hr className='h-10 border-l-4 border-solid border-gray-500' />
        </div>
        <div className='flex gap-7 px-3'>
            
           
            <div className='flex flex-col justify-center items-center '>
             
              <Dropdown menu={{items,}}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {authentication_user.isAuthenticated ? 
                        <p className='text-md font-medium text-gray-500'>{authentication_user.name}</p>
                        :
                        <p className='text-xs font-medium text-gray-500'>Admin</p>
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

export default AdminHeader
