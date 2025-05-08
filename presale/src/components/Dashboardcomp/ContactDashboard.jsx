import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaArrowUp19,} from 'react-icons/fa6';
import { delete_contact, get_all_contacts, messageClear } from '../../store/reducers/contactReducer';
import moment from 'moment';


const ContactDashboard = () => {
     const dispatch = useDispatch()
     const [show, setShow] =  useState(false)
     const { successMessage, errorMessage, contacts } = useSelector(state => state.contact);
     

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
     

    

    return (
        <>
         <div className='flex flex-col gap-y-7 w-full h-full'>
           <div className='w-full h-full bg-secondary py-5 px-3 rounded-md'>
            {
             <div className='flex flex-col gap-y-4  '>
                <button onClick={()=>dispatch(get_all_contacts())} className='p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200'>get all contacts</button>
                
                <div class="relative overflow-x-auto">


                  
                     

                      <div className=' flex justify-between items-center'>
                          <div className='py-3 w-[25%] font-bold'>date</div>
                          <div className='py-3 w-[13%] font-bold'>email</div>
                          <div className='py-3 w-[18%] font-bold'>subject</div>
                          <div className='py-3 w-[18%] font-bold'>Message</div>
                          <div className='py-3 w-[18%] font-bold'>Action </div>
                          <div onClick={()=>setShow(false)} className='py-3 w-[8%] font-bold uppercase'><FaArrowUp19/> </div> 
                      </div> 
                         

                     {
                    contacts.length>0?contacts?.map((n,i) =>  <div className='text-txt-500'>
                        <div className=' flex justify-between items-start border-b border-slate-700'>
                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>{moment(n?.createdAt).format('MMM DD, YYYY')}</div>
                            <div className='py-3 w-[13%] font-medium'>{n?.email}</div>
                            <div className='py-3 w-[18%] font-medium'>{n?.subject}</div>
                            <div className='py-3 w-[18%] font-medium'>{n?.textMessage.slice(0,7)}</div>
                            <div className='py-3 w-[18%] font-medium'>
                                <span onClick={()=>dispatch(delete_contact(n?._id))} className=' hover:text-red-500 uppercase cursor-pointer'>Delete Message</span>
                                </div>
                            <div onClick={(e) => setShow(n._id)} className='py-3 w-[8%] font-medium'><FaArrowDown/></div> 
                        </div> 
                        
                        
                          <div className={show === n._id? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden'}>
                              
                        {
                          n?.textMessage!==""&&<div className=' flex justify-start items-start border-b border-slate-700'>
                              <div className='py-2 w-[90%] font-medium pl-2'>{n?.textMessage}</div>
                              <div onClick={()=>{const id=n?._id;dispatch(delete_contact(id));}} className='py-3 w-[18%] font-medium'><FaTrashAlt className='text-red-500 hover:text-red-300'/></div> 
                            </div>
                        }
                        
                                </div>  
                            </div> ):<></>
                    }
                    
                </div>    
             </div>
            }
            

           </div>
           
        </div>
        </>
       
    );
};



export default ContactDashboard;