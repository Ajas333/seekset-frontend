import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmployerWrapper from './components/employer/EmployerWrapper'
import CandidateWrapper from './components/candidate/CandidateWrapper'
import AdminWrapper from './components/admin/AdminWrapper'
import LandingPage from './pages/LandingPage'
import useStore from './Redux/useStore'
import { Provider } from 'react-redux'
import ResetPassword from './pages/Common/ResetPassword'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginSignup from './pages/Common/LoginSignup'
import ForgetPassword from './pages/Common/ForgetPassword'
import Otp from './pages/Common/Otp'
import 'react-image-crop/dist/ReactCrop.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleid } from './validation/ClientId'
import InterviewRoom from '../../frontend/src/pages/Common/InterviewRoom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={useStore}>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition: Bounce
          />
          <GoogleOAuthProvider clientId={googleid}>
            <Routes>
              <Route path='/' element={<LandingPage/>}></Route>
              <Route path='/login' element={<LoginSignup/>}></Route>
              <Route path='/forgot' element={<ForgetPassword/>}></Route>
              <Route path='/interview/:id' element={<InterviewRoom/>}></Route>
              <Route path='/otp' element={<Otp/>}></Route>
              <Route path='employer/*' element={<EmployerWrapper/>}></Route>
              <Route path='/reset_password/:id' element={<ResetPassword/>} ></Route>
              <Route path='candidate/*' element={<CandidateWrapper/>}></Route>
              <Route path='admin/*' element={<AdminWrapper/>}></Route>
            </Routes>
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App
