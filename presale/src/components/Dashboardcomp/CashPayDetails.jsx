import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FaImage } from 'react-icons/fa';
import { delete_cash, get_cash, messageClear, update_cash } from '../../store/reducers/cashReducer';

const CashPayDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { successMessage, errorMessage, loader, cash } = useSelector(state => state.cash);
    
    // Initialize state with default values
   const [cashState, setCashState] = useState({
           cashName: '',
           cashSymbol: '',
           cashImg:'',
           rate:0,
           cashMessage:'',
           cashPayTag:'',
         });
    
    const handleRateChange = (e) => {
        const value = e.target.value;
        setCashState((prevState) => ({
          ...prevState,
          rate: value === '' ? '' : parseFloat(value)
        }));
      };
    const [cashImgPreview, setCashImgPreview] = useState('');
   

    // Fetch coin data
    useEffect(() => {
        if (id) {
            dispatch(get_cash(id));
        }
    }, [dispatch, id]);

    // Update local state when coin data is loaded
    useEffect(() => {
        if (cash) {
            setCashState({
                cashName: cash.cashName || '',
                cashSymbol: cash.cashSymbol || '',
                cashImg: cash.cashImg || '',
                cashMessage: cash.cashMessage || '',
                rate:cash.rate || 0,
                cashPayTag: cash.cashPayTag || '',
            });
            setCashImgPreview(cash.cashImg || '');
           
        }
    }, [cash]);

    // Handle messages
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            navigate(-1);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch,navigate]);

    const handleChange = (e) => {
        setCashState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCashImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCashImgPreview(URL.createObjectURL(file));
            setCashState(prev => ({ ...prev, coinImg: file }));
        }
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(cashState).forEach(key => {
            if (cashState[key] !== '') {
                formData.append(key, cashState[key]);
            }
        });

        // if (coinExample && coinExample.length > 0) {
        //     formData.append('Example', JSON.stringify(coinExample));
        // }

        dispatch(update_cash({ id, formData }));
    };

    return (
        <div className='flex flex-col gap-y-4'>
            <div>
                <button 
                    onClick={() => dispatch(delete_cash(id))}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors mb-7 ${
                        loader ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-300'
                    }`}
                >
                    Delete cash
                </button>
                <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg'>
                    {/* Image upload sections */}
                    <div className='flex flex-col md:flex-row gap-4 mb-6'>
                        {/* Coin Image Upload */}
                        <div className='flex-1'>
                            <p className='uppercase font-semibold'>cash image</p>
                            <label 
                                className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                                htmlFor="cashImg"
                            >
                                {cashImgPreview ? (
                                    <img 
                                        src={cashImgPreview} 
                                        alt="Preview" 
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                ) : (
                                    <>
                                        <FaImage className='text-4xl text-gray-400 mb-2' />
                                        <span className='text-gray-600'>Upload Cash Image</span>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="cashImg"
                                accept="image/*"
                                onChange={handleCashImage}
                                className='hidden'
                                name='cashImg'
                            />
                        </div>

                       

                    </div>

                    {/* Form inputs */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Cash Name</label>
                        <input
                            type="text"
                            name="cashName"
                            value={cashState.cashName}
                            onChange={handleChange}
                            placeholder="Enter cash name"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>cash Symbol</label>
                        <input
                            type="text"
                            name="cashSymbol"
                            value={cashState.cashSymbol}
                            onChange={handleChange}
                            placeholder="Enter cash Symbol eg $"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>
                      {/* cashTag Input */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>cash PayTag </label>
                        <input
                            type="text"
                            name="cashPayTag"
                            value={cashState.cashPayTag}
                            onChange={handleChange}
                            placeholder="Enter cash PayTag"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>
                     {/* cash message Input */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>cash message </label>
                        <input
                            type="text"
                            name="cashMessage"
                            value={cashState.cashMessage}
                            onChange={handleChange}
                            placeholder="Enter cash message e.g send money to this payment tag"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>
                     {/* cashrate Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">cash Rate</label>
                            <input
                                type="number"
                                name="rate"
                                value={cashState.rate}
                                onChange={handleRateChange}
                                placeholder="Enter cash rate"
                                step="any"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loader}
                        className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                            loader ? 'bg-gray-400' : 'bg-accent-100 hover:bg-accent-100/50'
                        }`}
                    >
                        {loader ? (
                            <FadeLoader color="#fff" loading={true} height={15} />
                        ) : (
                            'update coin'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default CashPayDetails;