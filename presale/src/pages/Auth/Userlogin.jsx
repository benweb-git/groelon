import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { client_login, messageClear } from '../../store/reducers/userAuthReducer';
import toast from 'react-hot-toast';
import { useHomeDetails } from '../../hooks/useHomeDetails';

const LoginPage = () => {
   const homeDetails = useHomeDetails();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const {errorMessage,successMessage,clientInfo } = useSelector(state => state.userAuth)
  const dispatch = useDispatch()

  const [stateInfo,setStateInfo]=useState({
          email:"",
          password:"",
          remember:false

      })

      const handleState =(e)=>{
          setStateInfo({
              ...stateInfo,
             [e.target.name]:e.target.value
         })
      }
  
  const checkSubmitData=(e)=>{
      e.preventDefault()
      dispatch(client_login(stateInfo))
     
  }
  useEffect(() => { 
      if (successMessage) {
          toast.success(successMessage)
          dispatch(messageClear())  
      } 
      if (errorMessage) {
          toast.error(errorMessage)
          dispatch(messageClear())  
      } 
      if (clientInfo) {
          navigate(`/dashboard`)
      }
  },[successMessage,errorMessage])


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
     <Header homeDetails={homeDetails}/>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
          <img src={homeDetails?.homeDetails?.TokenImage} alt="iToken Logo" className="h-8 w-8 mb-2" />
            <h2 className="text-white text-3xl font-bold">Login</h2>
            <p className="text-gray-400 mt-2">Welcome to {homeDetails?.homeDetails?.TokenName}! Please enter your details</p>
          </div>

          <form onSubmit={checkSubmitData} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email address</label>
              <input
                type="email"
                id="email"
                name='email'
                placeholder="email@example.com"
                onChange={handleState}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Enter password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleState}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                    <input onChange={(e)=>(setStateInfo({...stateInfo,[e.target.name]:!stateInfo.remember}))} value={stateInfo.remember}  type="checkbox" name='remember' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-300 dark:text-gray-300">Remember me</label>
                </div>
           

            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Login
            </button>


            <div className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer homeDetails={homeDetails}/>
    </div>
  );
};

export default LoginPage;