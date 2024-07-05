import React from "react";
import { Dropdown, Space } from "antd";
import logo from "../../assets/logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { set_Authentication } from "../../Redux/Authentication/authenticationSlice";

function EmployerHeader() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const userBasicDetails = useSelector((state) => state.user_basic_details);
  const baseURL = import.meta.env.VITE_API_BASEURL;
  const profile_image = `${baseURL}${userBasicDetails.profile_pic}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        email: null,
        isAuthenticated: false,
        isAdmin: false,
        usertype: null,
      })
    );
    navigate("/login");
  };

  const items = [
    {
      label: <p>Profile</p>,
      key: "0",
    },
    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "1",
    },
  ];
  return (
    <div className="fixed z-50 shadow-xl w-full flex justify-between h-12 bg-blue-200">
      <Link to={"/"}>
        <div className="ml-3  flex cursor-pointer">
          <div className="mt-2">
            <img src={logo} alt="" className="w-10 h-8" />
          </div>
          <p className="mt-2 text-xl font-bold font-sans text-indigo-900 cursor-pointer">
            SeekSet
          </p>
        </div>
      </Link>

      <div className="flex">
        <div className="pt-1 mx-2">
          <hr className="h-10 border-l-4 border-solid border-gray-500" />
        </div>
        <div className="flex gap-7 px-3 items-center">
          <div className="flex flex-col justify-center items-center ">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img class="w-10 h-10 rounded-full" src={profile_image} alt="Rounded avatar"/> 

               
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerHeader;
