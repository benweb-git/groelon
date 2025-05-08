import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment';
import { delete_transaction, get_all_transactions, messageClear, update_transaction } from '../../store/reducers/participantReducer';

const Transactions = () => {
    const dispatch = useDispatch();
    const [expandedId, setExpandedId] = useState(null);
    const { successMessage, errorMessage, allTransactions } = useSelector(state => state.participant);
    const [copied, setCopied] = useState(false);
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
    
    // Generate unique user data
    useEffect(() => {
        if (allTransactions && allTransactions.length > 0) {
            // Create a map to store unique users with their first transaction
            const uniqueUserMap = new Map();
            
            allTransactions.forEach(transaction => {
                if (!uniqueUserMap.has(transaction.userId)) {
                    uniqueUserMap.set(transaction.userId, transaction);
                }
            });
            
            // Convert map values to array
            const uniqueUsersArray = Array.from(uniqueUserMap.values());
            setUniqueUsers(uniqueUsersArray);
            setIsLoading(false);
        }
    }, [allTransactions]);

    // Toggle transaction details
    const toggleDetails = (userId) => {
        setExpandedId(expandedId === userId ? null : userId);
    };

    // Handle status update
    const handleStatusUpdate = (id, confirmationStatus) => {
        setIsLoading(true);
        dispatch(update_transaction({ id, confirmationStatus }));
    };

    // Handle data loading
    const handleGetTransactions = () => {
        setIsLoading(true);
        dispatch(get_all_transactions());
    };

    // Handle delete transaction
    const handleDeleteTransaction = (id) => {
        if (window.confirm("Are you sure you want to delete all transactions for this user?")) {
            setIsLoading(true);
            dispatch(delete_transaction(id));
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
                        {isLoading ? 'Loading...' : 'Get All Transaction'}
                    </button>
                    
                    {/* Desktop View - Hidden on small screens */}
                    <div className="relative overflow-x-auto hidden md:block">
                        <div className='flex justify-between items-center text-sm lg:text-base'>
                            <div className='py-2 w-[22%] font-bold'>User ID</div>
                            <div className='py-2 w-[22%] font-bold'>Ref</div>
                            <div className='py-2 w-[10%] font-bold'>Currency</div>
                            <div className='py-2 w-[10%] font-bold'>Amount</div>
                            <div className='py-2 w-[15%] font-bold'>Address</div>
                            <div className='py-2 w-[10%] font-bold'>Tokens</div>
                            <div className='py-2 w-[13%] font-bold'>Status</div>
                            <div className='py-2 w-[12%] font-bold'>Date</div>
                            <div className='py-2 w-[8%] font-bold text-center'>Actions</div>
                        </div> 
                        
                        {uniqueUsers.length > 0 ? (
                            uniqueUsers.map((user, i) => (
                                <div key={i} className='text-white'>
                                    <div className='flex justify-between items-center border-b border-slate-700 hover:bg-slate-800 transition-colors text-sm lg:text-base'>
                                        <div className='py-2 w-[22%] font-medium'>{truncateText(user.userId, 15)}</div>
                                        <div className='py-2 w-[10%] font-medium'>{user.referraled}</div>
                                        <div className='py-2 w-[10%] font-medium'>{user.currency}</div>
                                        <div className='py-2 w-[10%] font-medium'>{user.Amount}</div>
                                        <div className='py-2 w-[15%] font-medium'>{truncateText(user.address, 10)}</div>
                                        <div className='py-2 w-[10%] font-medium'>{user.TokenAmount}</div>
                                        <div className='py-2 w-[13%] font-medium'>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                user.paymentStatus === 'completed' ? 'bg-green-700 text-green-100' : 
                                                user.paymentStatus === 'canceled' ? 'bg-red-700 text-red-100' : 
                                                'bg-yellow-700 text-yellow-100'
                                            }`}>
                                                {user.paymentStatus}
                                            </span>
                                        </div>
                                        <div className='py-2 w-[12%] font-medium'>{moment(user.createdAt).format('MM/DD/YY')}</div>
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
                                        <div className="grid grid-cols-7 gap-2 text-xs font-bold mb-2 px-2">
                                            <div>Order ID</div>
                                            <div>Ref</div>
                                            <div>date</div>
                                            <div>Status</div>
                                            <div>Amount</div>
                                            <div>Tokens</div>
                                            <div>Address</div>
                                            <div colSpan={2} className="text-center">Actions</div>
                                        </div>
                                        {allTransactions
                                            .filter(transaction => transaction.userId === user.userId)
                                            .map((transaction, index) => (
                                                <div key={index} className='grid grid-cols-7 gap-2 items-center border-b border-slate-600 py-2 text-xs'>
                                                    <div className='font-medium pl-2'>{truncateText(transaction.orderId, 8)}</div>
                                                    <div className='font-medium pl-1'>{transaction?.referraled}</div>
                                                    <div className='font-medium pl-1'>{truncateText(moment(transaction.createdAt).format('MM/DD/YY'), 8)}</div>
                                                    <div className='font-medium'>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            transaction.paymentStatus === 'completed' ? 'bg-green-700 text-green-100' : 
                                                            transaction.paymentStatus === 'canceled' ? 'bg-red-700 text-red-100' : 
                                                            'bg-yellow-700 text-yellow-100'
                                                        }`}>
                                                            {transaction.paymentStatus}
                                                        </span>
                                                    </div>
                                                    <div className='font-medium'>{transaction.Amount}</div>
                                                    <div className='font-medium'>{transaction.TokenAmount}</div>
                                                    <div className='font-medium'>{truncateText(transaction.address, 8)}</div>
                                                    {
                                                     transaction.paymentStatus === 'completed'?<></>:<button 
                                                        onClick={() => handleStatusUpdate(transaction._id, "completed")} 
                                                        className='rounded-md bg-green-600 hover:bg-green-700 text-white py-1 px-2 text-xs'
                                                        disabled={transaction.paymentStatus === 'completed'}
                                                    >
                                                        Complete
                                                    </button>
                                                    }
                                                   
                                                    <button 
                                                        onClick={() => handleStatusUpdate(transaction._id, "canceled")} 
                                                        className='rounded-md bg-red-600 hover:bg-red-700 text-white py-1 px-2 text-xs'
                                                        disabled={transaction.paymentStatus === 'canceled'}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>  
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No transactions to display. Click "Get All Participants" to load data.</div>
                        )}
                    </div>
                    
                    {/* Mobile View - Shows on small screens */}
                    <div className="md:hidden">
                        {uniqueUsers.length > 0 ? (
                            uniqueUsers.map((user, i) => (
                                <div key={i} className="mb-4 bg-slate-800 rounded-lg p-3 shadow">
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
                                        <div className="font-semibold">Currency:</div>
                                        <div>{user.currency}</div>
                                        
                                        <div className="font-semibold">Amount:</div>
                                        <div>{user.Amount}</div>
                                        
                                        <div className="font-semibold">Tokens:</div>
                                        <div>{user.TokenAmount}</div>
                                        
                                        <div className="font-semibold">Status:</div>
                                        <div>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                user.paymentStatus === 'completed' ? 'bg-green-700 text-green-100' : 
                                                user.paymentStatus === 'canceled' ? 'bg-red-700 text-red-100' : 
                                                'bg-yellow-700 text-yellow-100'
                                            }`}>
                                                {user.paymentStatus}
                                            </span>
                                        </div>
                                        
                                        <div className="font-semibold">Date:</div>
                                        <div>{moment(user.createdAt).format('MM/DD/YY')}</div>
                                    </div>
                                    
                                    <div className={expandedId === user.userId ? 'block mt-3 pt-3 border-t border-slate-700' : 'hidden'}>
                                        <div className="text-sm font-bold mb-2">All Transactions</div>
                                        {allTransactions
                                            .filter(transaction => transaction.userId === user.userId)
                                            .map((transaction, index) => (
                                                <div key={index} className="bg-slate-700 rounded-md p-2 mb-2 text-xs">
                                                    <div className="grid grid-cols-2 gap-1 mb-2">
                                                        <div className="font-semibold">Order ID:</div>
                                                        <div>{truncateText(transaction.orderId, 10)}</div>
                                                        <div className="font-semibold">Ref</div>
                                                        <div>{transaction?.referraled}</div>
                                                        
                                                        <div className="font-semibold">Status:</div>
                                                        <div>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                                transaction.paymentStatus === 'completed' ? 'bg-green-700 text-green-100' : 
                                                                transaction.paymentStatus === 'canceled' ? 'bg-red-700 text-red-100' : 
                                                                'bg-yellow-700 text-yellow-100'
                                                            }`}>
                                                                {transaction.paymentStatus}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="font-semibold">Amount:</div>
                                                        <div>{transaction.Amount}</div>
                                                        
                                                        <div className="font-semibold">Tokens:</div>
                                                        <div>{transaction.TokenAmount}</div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2 mt-2">
                                                        <button 
                                                            onClick={() => handleStatusUpdate(transaction._id, "completed")}
                                                            className="flex-1 rounded-md bg-green-600 hover:bg-green-700 text-white py-2 text-xs"
                                                            disabled={transaction.paymentStatus === 'completed'}
                                                        >
                                                            Complete
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusUpdate(transaction._id, "canceled")}
                                                            className="flex-1 rounded-md bg-red-600 hover:bg-red-700 text-white py-2 text-xs"
                                                            disabled={transaction.paymentStatus === 'canceled'}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">No transactions to display. Click "Get All Participants" to load data.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;