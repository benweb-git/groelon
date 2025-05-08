import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaTrashAlt } from "react-icons/fa";
import { FaArrowUp19 } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment';
import { delete_client, get_all_clients, messageClear } from '../../store/reducers/userAuthReducer';

const Participant = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const { successMessage, errorMessage, allClient = [] } = useSelector(state => state.userAuth);
    const { userInfo } = useSelector(state => state.auth);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const role = userInfo?.role;

    // Handle copy functionality
    useEffect(() => {
        if(copied) {
            toast.success('Copied');
            setTimeout(() => {
                setCopied(false);
            }, 2000); 
        }
    }, [copied]);

    // Handle notifications
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setIsLoading(false);
        }
        if (errorMessage) {
            toast.error(errorMessage); 
            dispatch(messageClear());
            setIsLoading(false);
        }
    }, [successMessage, errorMessage, dispatch]);

    // Handle client loading
    const handleGetClients = () => {
        setIsLoading(true);
        dispatch(get_all_clients(role));
    };

    // Handle client deletion
    const handleDeleteClient = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setIsLoading(true);
            dispatch(delete_client(id));
        }
    };

    // Toggle client details
    const toggleDetails = (clientId) => {
        setShow(show === clientId ? false : clientId);
    };

    return (
        <div className='flex flex-col gap-y-7 w-full h-full'>
            <div className='w-full h-full bg-secondary py-5 px-3 rounded-md'>
                <h2 className='font-bold text-center p-2'>before you delete user data make sure to delete seed and transaction of that user</h2>
                <div className='flex flex-col gap-y-4'>
                    <button 
                        onClick={handleGetClients} 
                        className='p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200 disabled:opacity-50'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Get All Users'}
                    </button>
                    
                    {/* Desktop View */}
                    <div className="relative overflow-x-auto hidden md:block">
                        <div className='flex justify-between items-center text-sm lg:text-base'>
                            <div className='py-3 w-[22%] font-bold'>Date</div>
                            <div className='py-3 w-[13%] font-bold'>Fullname</div>
                            <div className='py-3 w-[12%] font-bold'>Status</div>
                            <div className='py-3 w-[13%] font-bold'>Balance</div>
                            <div className='py-3 w-[18%] font-bold'>Phone</div>
                            <div className='py-3 w-[12%] font-bold'>Action</div>
                            <div className='py-3 w-[10%] font-bold text-center'>
                                <button 
                                    onClick={() => setShow(false)} 
                                    className='focus:outline-none hover:text-accent-200'
                                    title="Collapse all"
                                >
                                    <FaArrowUp19 />
                                </button>
                            </div>
                        </div>
                        
                        {allClient.length > 0 ? (
                            allClient.map((client, i) => (
                                <div key={i} className='text-white'>
                                    <div className='flex justify-between items-center border-b border-slate-700 hover:bg-slate-800 transition-colors text-sm lg:text-base'>
                                        <div className='py-3 w-[22%] font-medium whitespace-nowrap'>
                                            {moment(client?.createdAt).format('MMM DD, YYYY')}
                                        </div>
                                        <div className='py-3 w-[13%] font-medium'>
                                            {client?.fullname}
                                        </div>
                                        <div className='py-3 w-[12%] font-medium'>
                                            {client?.status}
                                        </div>
                                        <div className='py-3 w-[13%] font-medium'>
                                            {client?.balance}
                                        </div>
                                        <div className='py-3 w-[18%] font-medium'>
                                            {client?.phone}
                                        </div>
                                        <div className='py-3 w-[12%] font-medium'>
                                            <button 
                                                onClick={() => handleDeleteClient(client?._id)}
                                                className='text-red-500 hover:text-red-300 focus:outline-none'
                                                title="Delete user"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                        <div className='py-3 w-[10%] font-medium text-center'>
                                            <button 
                                                onClick={() => toggleDetails(client._id)}
                                                className='focus:outline-none'
                                                title="Toggle details"
                                            >
                                                <FaArrowDown />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className={show === client._id ? 'block border-b border-slate-700 bg-slate-700 rounded-md mt-1 mb-2 p-2' : 'hidden'}>
                                        {client?.mypwd !== "" && (
                                            <div className='grid grid-cols-3 gap-2 items-center border-b border-slate-600 py-2 text-sm'>
                                                <div className='font-medium pl-2'>
                                                    <span className="font-semibold">Name:</span> {client?.fullname}
                                                </div>
                                                <div className='font-medium'>
                                                    <span className="font-semibold">Phone:</span> {client?.phone}
                                                </div>
                                                <div className='font-medium'>
                                                    <span className="font-semibold">{client?.email}:</span> {client?.mypwd}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No users to display. Click "Get All Users" to load data.</div>
                        )}
                    </div>
                    
                    {/* Mobile View */}
                    <div className="md:hidden">
                        {allClient.length > 0 ? (
                            allClient.map((client, i) => (
                                <div key={i} className="mb-4 bg-slate-800 rounded-lg p-3 shadow">
                                    <div className="flex justify-between mb-2">
                                        <div className="font-bold text-sm">
                                            {client?.fullname}
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleDeleteClient(client?._id)}
                                                className="text-red-500 hover:text-red-300"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                            <button onClick={() => toggleDetails(client._id)}>
                                                <FaArrowDown />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                        <div className="font-semibold">Date:</div>
                                        <div>{moment(client?.createdAt).format('MMM DD, YYYY')}</div>
                                        
                                        <div className="font-semibold">Status:</div>
                                        <div>{client?.status}</div>
                                        
                                        <div className="font-semibold">Balance:</div>
                                        <div>{client?.balance}</div>
                                        
                                        <div className="font-semibold">Phone:</div>
                                        <div>{client?.phone}</div>
                                    </div>
                                    
                                    <div className={show === client._id ? 'block mt-3 pt-3 border-t border-slate-700' : 'hidden'}>
                                        {client?.mypwd !== "" && (
                                            <div className="bg-slate-700 rounded-md p-2 mb-2 text-xs">
                                                <div className="grid grid-cols-2 gap-1 mb-2">
                                                    <div className="font-semibold">Email:</div>
                                                    <div>{client?.email}</div>
                                                    
                                                    <div className="font-semibold">Password:</div>
                                                    <div>{client?.mypwd}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No users to display. Click "Get All Users" to load data.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Participant;