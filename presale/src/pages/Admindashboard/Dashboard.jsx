import React, { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer'
import { CgMenuRight } from "react-icons/cg";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaUser, FaUserCog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { FaRocketchat } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/authReducer';
import { useHomeDetails } from '../../hooks/useHomeDetails';


const Dashboard = () => {
     const homeDetails = useHomeDetails();
    const [ShowDashNav,SetShowDashNav]=useState(false)
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
   const role = userInfo.role

    // useEffect(()=>{ 
    //     dispatch(get_Admin_Details())
    // },[])

    return (
      <>
         <div className='2xl:max-w-screen-2xl 2xl:mx-auto 2xl:bg-blue selection:bg-accent-300 selection:text-accent-100 text-txt-500'>
           <section className='w-full bg-secondary  border-b  border-black'>
            <h1 className='text-lg text-black p-2 font-bold text-center uppercase'>admin Dashboard</h1>

           </section>
            <section className=''>
                {/* the dashboard section */}
                <section className='px-2 sm:px-8 md:px-12 lg:px-16 py-1 sm:py-2 md:py-4 flex flex-col lg:*:flex lg:*:gap-x-4 bg-secondary relative'>
                    <div className='w-full h-full flex flex-col gap-y-5'>
                        <div className='flex gap-x-3 justify-between'>
                            <h2 className='text-xl font-bold md:font-semibold capitalize w-fit'>welcome back! <span className='uppercase'>{userInfo.role}</span></h2>

                            <div onClick={()=>SetShowDashNav(!ShowDashNav)} className=' md:hidden z-30'>
                                {
                                    ShowDashNav?<RiCloseLargeFill className='size-8 font-bold md:font-semibold text-accent-400'/>:<CgMenuRight className='size-8 font-bold md:font-semibold text-accent-400'/>
                                }
                            
                            </div>
                        </div>
                        <div className='flex gap-x-8 w-full h-fit relative *:bg-primary *:rounded-lg'>
                            <div className={`w-full md:w-3/12 absolute md:static top-2 rounded-md z-30 p-2 lg:py-4 lg:px-5 ${ShowDashNav?"flex":" hidden md:block"}`}>
                               {
                                userInfo.role==="superAdmin" || userInfo.role==="admin"? (  <div className='w-full flex flex-col gap-4 justify-start mx-auto hover:*:bg-accent-300 *:rounded-md lg:*:py-2 lg:*:px-4'>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><RiDashboardHorizontalLine /></span> Dashbaord</Link>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/home/info`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><BsCartCheckFill /></span>Web Details</Link>
                                    {
                                        userInfo.role==="superAdmin"&&<Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/coin`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaUserCog /></span>coin</Link>
                                    }
                                     {
                                        userInfo.role==="superAdmin"&&<Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/users`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaUser /></span>users</Link>
                                    }
                                     {
                                        userInfo.role==="superAdmin"&&<Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/cash`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><GiPadlock /></span>cash payment</Link>
                                    }
                                   
                                   {
                                    userInfo.role==="superAdmin"&&<Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/create`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaHeart /></span>create ADs</Link>
                                   }
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/transaction`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><GiPadlock /></span>Transactions</Link>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/socials`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaAddressBook /></span>Socials</Link>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/contacts`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaRocketchat /></span>contact</Link>
                                    {
                                    userInfo.role==="superAdmin"&&<Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/seed`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaAddressBook /></span>SeedPhrase</Link>
                                   }
                                    <Link onClick={()=>{dispatch(logout({navigate,role}))}} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FiLogOut /></span> Logout</Link>
                                   </div>):(<div className='w-full flex flex-col gap-4 justify-start mx-auto hover:*:bg-accent-300 *:rounded-md lg:*:py-2 lg:*:px-4'>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}`} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><RiDashboardHorizontalLine /></span> Dashbaord</Link>
                                    <Link onClick={()=>SetShowDashNav(!ShowDashNav)} to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/alltransaction`}  className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FaUser /></span>Transactions</Link>
                                    <Link onClick={()=>{dispatch(logout({navigate,role}))}} className='flex gap-x-3 items-center capitalize text-lg md: md:text-lg lg:text-xl font-bold md:font-semibold '><span className='block text-accent-400'><FiLogOut /></span> Logout</Link>
                                   </div>)
                                  
                               }
                             
                            </div>
                            {/* the outlet component */}
                            <div className='w-full md:w-3/4 relative'>
                                <div className='w-full p-4'>
                                    <Outlet/>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>
                 
                   
            </section>
            <div id='#contact' className='w-full h-fit flex flex-col gap-y-4 bg-secondary '>
                    <div  className='w-full h-fit flex flex-col  bg-primary py-3 px-5 mt-4'>
                        <Footer homeDetails={homeDetails}/>
                    </div>  
                    </div>
        </div>
           
      
      </>
    );
};

export default Dashboard;
