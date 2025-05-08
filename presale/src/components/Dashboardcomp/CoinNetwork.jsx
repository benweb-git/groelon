import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { delete_network, get_all_networks, messageClear } from '../../store/reducers/networkReducer';

import toast from 'react-hot-toast';
import { FaArrowUp19,} from 'react-icons/fa6';

const CoinNetwork = () => {
     const dispatch = useDispatch()
     const [show, setShow] =  useState(false)
     const { successMessage, errorMessage, networks } = useSelector(state => state.network);

      useEffect(() => {
        dispatch(get_all_networks())
      }, [dispatch]);


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
     
    let id,networkName;

    

    return (
        <>
         <div className='flex flex-col gap-y-7 w-full h-full'>
           <div className='w-full h-full bg-secondary py-5 px-3 rounded-md'>
            {
             <div className='flex flex-col gap-y-4  '>
                <button onClick={()=>dispatch(get_all_networks())} className='p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200'>get networks</button>
                
                <div class="relative overflow-x-auto">


                  
                     

                      <div className=' flex justify-between items-center'>
                          <div className='py-3 w-[25%] font-bold'>coin id</div>
                          <div className='py-3 w-[13%] font-bold'>coin name</div>
                          <div className='py-3 w-[18%] font-bold'>network name</div>
                          <div className='py-3 w-[18%] font-bold'>network address</div>
                          <div className='py-3 w-[18%] font-bold'>Action </div>
                          <div onClick={()=>setShow(false)} className='py-3 w-[8%] font-bold uppercase'><FaArrowUp19/> </div> 
                      </div> 
                         

                     {
                       networks.map((n,i) =>  <div className='text-txt-500'>
                        <div className=' flex justify-between items-start border-b border-slate-700'>
                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>#{n.coinId.slice(0,7)}</div>
                            <div className='py-3 w-[13%] font-medium'>${n.coinSymbol}</div>
                            <div className='py-3 w-[18%] font-medium'>{""}</div>
                            <div className='py-3 w-[18%] font-medium'>{""}</div>
                            <div className='py-3 w-[18%] font-medium'>
                                <Link className=' hover:text-blue-500 uppercase' to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/token/${n.coinSymbol}/${n._id}`}>add new token</Link>
                                </div>
                            <div onClick={(e) => setShow(n._id)} className='py-3 w-[8%] font-medium'><FaArrowDown/></div> 
                        </div> 
                        
                        
                          <div className={show === n._id? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden'}>
                              
                        {
                           n?.coinNetworks.length>0&&n?.coinNetworks.map((nt, i) =><div className=' flex justify-start items-start border-b border-slate-700'>
                            <figure className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>
                                        <img className='size-9 object-cover rounded-full' src={nt.coinImg} alt='coin img'/>
                             </figure>
                               <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>{nt.networkName}</div>
                              <div className='py-3 w-[13%] font-medium'>{nt?.networkAddress.slice(0,7)}</div>
                              <figure className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>
                                        <img className='size-9 object-cover rounded-full' src={nt.networkBarcode} alt='network barcode img'/>
                             </figure>
                              <div onClick={()=>{id=n._id;networkName=nt.networkName;dispatch(delete_network({id,networkName}));}} className='py-3 w-[18%] font-medium'><FaTrashAlt className='text-red-500 hover:text-red-300'/></div> 
                            </div>)
                        }
                        
                                </div>  
                            </div> )
                    }
                    
                </div>    
             </div>
            }
            

           </div>
           
        </div>
        </>
       
    );
};


export default CoinNetwork;