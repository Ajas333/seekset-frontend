import {jwtDecode} from "jwt-decode";
import axios from "axios";


// const baseURL = "http://127.0.0.1:8000";

const updateAdminToken = async () => {
  const baseURL = import.meta.env.VITE_API_BASEURL
  const refreshToken = localStorage.getItem("refresh");

  try {
    const res = await axios.post(baseURL + "/api/account/token/refresh/", {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const fetchisAdmin = async () => {
    console.log("admin data fetch...............")
  const token = localStorage.getItem("access");

  try {
    const res = await axios.get(baseURL + "/api/account/user/details/", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("res data...........",res);
    return res.data.data.is_superuser; 
  } catch (error) {
    return false;
  }
};

const isAuthAdmin = async () => {
    console.log("auth admin.....................")
  const accessToken = localStorage.getItem("access");
  
  if (!accessToken) {
    return { name: null, isAuthenticated: false, isAdmin: false };
  }
  
  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);
  if (decoded.exp > currentTime) {

    let checkAdmin = await fetchisAdmin(); // Await the result
    console.log("check admin..............",checkAdmin);
    return {
      name: decoded.name,
      isAuthenticated: true,
      isAdmin: checkAdmin,
    };
  } else {
    const updateSuccess = await updateAdminToken();
    console.log("update admin token",updateSuccess);

    if (updateSuccess) {
      let decoded = jwtDecode(accessToken);
      let checkAdmin = await fetchisAdmin(); // Await the result
      console.log("after refresh check admin.......",checkAdmin);
      return {
        name: decoded.name,
        isAuthenticated: true,
        isAdmin: checkAdmin,
      };
    } else {
      return { name: null, isAuthenticated: false, isAdmin: false };
    }
  }
};

export default isAuthAdmin;