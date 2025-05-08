import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiDollarSign, FiHelpCircle, FiBarChart2, FiHome, FiCreditCard, FiChevronLeft,FiChevronRight } from 'react-icons/fi';
import { MdLogout } from "react-icons/md";
import { logout, get_client } from '../../store/reducers/userAuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHomeDetails } from '../../hooks/useHomeDetails';

export default function DashboardClient() {
  const homeDetails = useHomeDetails();
  const [isShowed,setIsShowed]=useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {clientInfo,userInfo} = useSelector(state => state.userAuth)
  const role = clientInfo.role
   
  useEffect(() => {
    if(clientInfo.id){
      dispatch(get_client(clientInfo.id))  
    }
  }, [clientInfo.id, dispatch]);

// console.log(clientInfo,"\n",userInfo)
  
  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <div className={`${isShowed?"block":"hidden"} w-40 min-h-full bg-black border-r border-neutral-800`}>
        <div className="p-4 border-b border-neutral-800 flex items-center">
          <span className="font-bold">{homeDetails?.homeDetails?.TokenName}</span>
        </div>
        
        <div className="py-4">
          <div className="mb-4">
            <div className="px-4 py-2 text-xs text-neutral-400">ACCOUNT</div>
            <SidebarItem 
              onClick={()=>setIsShowed(false)}
              icon={<FiHome size={16} />} 
              label="Dashboard" 
              to="/dashboard" 
            />
            <SidebarItem 
              onClick={()=>setIsShowed(false)}
              icon={<FiUser size={16} />} 
              label="My Profile" 
              to="/dashboard/profile" 
            />
            <SidebarItem 
              onClick={()=>setIsShowed(false)}
              icon={<FiBarChart2 size={16} />} 
              label="Status" 
              to="/dashboard/status" 
            />
          </div>
          
          <div className="mb-4">
            <div className="px-4 py-2 text-xs text-neutral-400">FINANCES</div>
            <SidebarItem 
             onClick={()=>setIsShowed(false)}
              icon={<FiDollarSign size={16} />} 
              label="Buy Token" 
              to="/dashboard/buy-token" 
            />
            <SidebarItem 
              onClick={()=>setIsShowed(false)}
              icon={<FiCreditCard size={16} />} 
              label="My Tokens" 
              to="/dashboard/my-token" 
            />
          </div>
          
          <div className="mb-4">
            <div className="px-4 py-2 text-xs text-neutral-400">INFORMATION</div>
            <SidebarItem 
              onClick={()=>{setIsShowed(false); console.log("triggered much from how to by")}}
              icon={<FiHelpCircle size={16} />} 
              label="How to Buy" 
              to="/dashboard/how-to-buy" 
            />
          </div>
          <div onClick={()=>{dispatch(logout({navigate,role}))}} className="mb-4">
            <div className="px-4 py-2 text-xs text-neutral-400">Logout</div>
            <SidebarItem 
              icon={<MdLogout size={16} />} 
              label="Logout" 
              
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-full flex-1 overflow-auto">
        <div className="p-4 flex items-center ">
          <button onClick={()=>setIsShowed(!isShowed)} className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-600">
            {
              isShowed?<FiChevronLeft size={20} className='animate-bounce' />:<FiChevronRight size={20} className='animate-bounce' />
            }
            
          </button>
        </div>
        
        {/* This is where the routed content will be rendered */}
        <div className="p-6 w-full">
          <Outlet context={{ homeDetails,userInfo}}/>
        </div>
      </div>
    </div>
  );
}

// Sidebar Item component using NavLink for active state management
// Sidebar Item component using NavLink for active state management
function SidebarItem({ icon, label, to, onClick }) {  // Add onClick to props
  return (
    <NavLink 
      to={to} 
      onClick={onClick}  // Change from 'onclick' to 'onClick'
      className={({ isActive }) => 
        `flex items-center px-4 py-2 text-sm ${isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`
      }
    >
      <div className="mr-3 text-neutral-400">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
}


