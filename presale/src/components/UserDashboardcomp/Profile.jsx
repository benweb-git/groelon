import { useEffect, useState } from 'react';
import { FaCheck, FaEye, FaEyeSlash, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { BiSolidDollarCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { messageClear, update_client_info } from '../../store/reducers/userAuthReducer';

const Profile = () => {
  const { homeDetails, userInfo } = useOutletContext();
  const { loader, errorMessage, successMessage } = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateInfo, setStateInfo] = useState({
    password: "",
    userId:userInfo._id,
    phone: userInfo?.phone
    
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
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

  const updateData = (e) => {
    e.preventDefault();
    
    if (!formValid) {
      toast.error("Please complete all fields correctly");
      return;
    }
    dispatch(update_client_info(stateInfo));
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
  }, [successMessage, errorMessage, dispatch]);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
    const isFormComplete = stateInfo.phone && 
                           stateInfo.password && 
                           confirmPassword && 
                           passwordMatch;
    
    setFormValid(isPasswordStrong && isFormComplete);
  }, [stateInfo.phone, stateInfo.password, confirmPassword, passwordMatch, passwordStrength]);

  const handleWhatsAppClick = () => {
    window.open(homeDetails?.socialDetails?.whatsapp, "_blank"); 
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Profile Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Balance Card */}
        <div className="bg-neutral-800 rounded-lg p-6">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-neutral-700 rounded-full mr-2">
              <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="w-4 h-4 sm:w-4 sm:h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">{userInfo?.balance}</h2>
          <p className="text-xs text-neutral-400">Current Balance in {homeDetails?.homeDetails?.TokenName}</p>
        </div>
      
        {/* USDT Equivalent Card */}
        <div className="bg-neutral-800 rounded-lg p-6">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-neutral-700 rounded-full mr-2">
              <BiSolidDollarCircle size={16}/>
            </div>
          </div>
          <h2 className="text-2xl font-bold">{(userInfo?.balance)*homeDetails?.homeDetails?.TokenRate}</h2>
          <p className="text-xs text-neutral-400">USDT Equivalent</p>
        </div>
      </div>
      
      {/* Personal Information Form */}
      <div className="bg-neutral-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Personal information</h2>
        
        <form onSubmit={updateData} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input 
              type="text" 
              value={userInfo?.fullname}
              disabled={true}
              className="w-full bg-neutral-700 border border-neutral-600 rounded p-2 text-white"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input 
              type="email" 
              value={userInfo?.email}
              disabled={true}
              className="w-full bg-neutral-700 border border-neutral-600 rounded p-2 text-white"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input 
              type="tel" 
              value={stateInfo.phone}
              name="phone"
              onChange={handleState}
              className="w-full bg-neutral-700 border border-neutral-600 rounded p-2 text-white"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
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

          <button
            type="submit"
            disabled={!formValid || loader}
            className={`w-full font-medium py-2 px-4 rounded-md transition-colors duration-200 
              ${formValid ? 'bg-gray-200 hover:bg-white text-gray-900' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
          >
            {loader ? 'Save changes...' : 'Save changes'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center w-full mb-4">
            If you have any complaint or questions contact the support team
          </p>

          <div className="flex justify-center items-center gap-6">
            {homeDetails?.socialDetails?.whatsapp ? (
              <>
                <Link to="/contact" className="flex flex-col items-center">
                  <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                    <MdEmail className="w-8 h-8 text-blue-600 hover:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-400 mt-1">Email</span>
                </Link>
                
                <div className="flex flex-col items-center">
                  <div className="h-10 w-px bg-gray-400"></div>
                  <p className="font-bold text-lg text-gray-300 my-1">OR</p>
                  <div className="h-10 w-px bg-gray-400"></div>
                </div>
                
                <button onClick={handleWhatsAppClick} className="flex flex-col items-center">
                  <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                    <FaWhatsapp className="w-8 h-8 text-green-500 hover:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-400 mt-1">WhatsApp</span>
                </button>
              </>
            ) : (
              <Link to="/contact" className="flex flex-col items-center">
                <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                  <MdEmail className="w-8 h-8 text-blue-600 hover:text-blue-400" />
                </div>
                <span className="text-sm text-gray-400 mt-1">Email</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;