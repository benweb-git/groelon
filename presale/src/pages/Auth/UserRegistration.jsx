import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { client_register, messageClear } from '../../store/reducers/userAuthReducer';
import toast from 'react-hot-toast';
import { useHomeDetails } from '../../hooks/useHomeDetails';

const RegisterPage = () => {
   const homeDetails = useHomeDetails();
   const {referralID} = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [formValid, setFormValid] = useState(false);
  
  const navigate = useNavigate();
  const {loader, errorMessage, successMessage, clientInfo} = useSelector(state => state.userAuth);
  const dispatch = useDispatch();

  const [stateInfo, setStateInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    referral:"",
  });

  const handleState = (e) => {
    setStateInfo({
      ...stateInfo,
      [e.target.name]: e.target.value
    });
    
    // Password strength validation
    if (e.target.name === 'password') {
      validatePasswordStrength(e.target.value);
      // Check if confirm password matches whenever password changes
      if (confirmPassword) {
        setPasswordMatch(e.target.value === confirmPassword);
      }
    }
  };

  useEffect(() => {
    if (referralID) {
      setStateInfo({
        ...stateInfo,
        referral:referralID
      });
    }
}, [referralID]);
 
const ReCaponChange =(value)=>{
   if (value){
    setNotRobot(true)
   }
}
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === stateInfo.password);
  };

  const validatePasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    });
  };

  // Check overall form validity
  useEffect(() => {
    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
    const isFormComplete = stateInfo.fullname && 
                           stateInfo.email && 
                           stateInfo.phone && 
                           stateInfo.password && 
                           confirmPassword && 
                           passwordMatch;
    
    setFormValid(isPasswordStrong && isFormComplete && notRobot);
  }, [stateInfo, confirmPassword, passwordMatch, passwordStrength,notRobot]);

  const checkSubmitData = (e) => {
    e.preventDefault();
    
    if (!formValid) {
      toast.error("Please complete all fields correctly");
      return;
    }
    
    dispatch(client_register(stateInfo));
    
  };

  useEffect(() => { 
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } 
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (clientInfo && clientInfo.role) {
      navigate(`/login`);
    }
  }, [successMessage, errorMessage, clientInfo, dispatch, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <Header homeDetails={homeDetails}/>
      {/* Registration Form */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
          <img src={homeDetails?.homeDetails?.TokenImage} alt="iToken Logo" className="h-8 w-8 mb-2" />
            <h2 className="text-white text-3xl font-bold">Sign up</h2>
            <p className="text-gray-400 mt-2">Welcome to {homeDetails?.homeDetails?.TokenName}! Please enter your details</p>
          </div>

          <form onSubmit={checkSubmitData} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={stateInfo.fullname}
                name="fullname"
                onChange={handleState}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email" 
                value={stateInfo.email}
                name="email"
                onChange={handleState}
                placeholder="email@example.com"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={stateInfo.phone}
                name="phone"
                onChange={handleState}
                placeholder="+123 (456) 789-0123"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={stateInfo.password}
                  name="password"
                  onChange={handleState}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
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
              
              {/* Password strength indicators */}
              {stateInfo.password && (
                <div className="mt-2 space-y-1">
                  <p className="text-gray-300 text-sm font-medium">Password must contain:</p>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="flex items-center gap-1">
                      {passwordStrength.length ? 
                        <FaCheck className="text-green-500" /> : 
                        <FaTimes className="text-red-500" />}
                      <span className={passwordStrength.length ? "text-green-500" : "text-gray-400"}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.hasUpperCase ? 
                        <FaCheck className="text-green-500" /> : 
                        <FaTimes className="text-red-500" />}
                      <span className={passwordStrength.hasUpperCase ? "text-green-500" : "text-gray-400"}>
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.hasLowerCase ? 
                        <FaCheck className="text-green-500" /> : 
                        <FaTimes className="text-red-500" />}
                      <span className={passwordStrength.hasLowerCase ? "text-green-500" : "text-gray-400"}>
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.hasNumber ? 
                        <FaCheck className="text-green-500" /> : 
                        <FaTimes className="text-red-500" />}
                      <span className={passwordStrength.hasNumber ? "text-green-500" : "text-gray-400"}>
                        Number
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.hasSpecial ? 
                        <FaCheck className="text-green-500" /> : 
                        <FaTimes className="text-red-500" />}
                      <span className={passwordStrength.hasSpecial ? "text-green-500" : "text-gray-400"}>
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Repeat your password"
                  className={`w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 
                    ${confirmPassword ? (passwordMatch ? 'focus:ring-green-500 border-green-500' : 'focus:ring-red-500 border-red-500') : 'focus:ring-blue-500'} pr-10`}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-sm mt-1 ${passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
                  {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="referral" className="block text-gray-300 text-sm font-medium mb-2 capitalize"><span className='text-green-500'>*</span> optional: referral link / ID  </label>
              <input
                type="text"
                id="referral"
                value={stateInfo.referral}
                name="referral"
                onChange={handleState}
                placeholder="Enter referral link or ID"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {
               <ReCAPTCHA
              sitekey="6Le-tTArAAAAAHoOxFCxR38XOhVcRyaaFxESGLbH"
              onChange={ReCaponChange}
            />
            }

           

            

            <button
              type="submit"
              disabled={!formValid || loader}
              className={`w-full font-medium py-2 px-4 rounded-md transition-colors duration-200 
                ${formValid ? 'bg-gray-200 hover:bg-white text-gray-900' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
            >
              {loader ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            By clicking continue, you agree to our{" "}
            <Link to="/privacy" className="text-gray-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <Footer homeDetails={homeDetails}/>
    </div>
  );
};

export default RegisterPage;
