import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { delete_coin, get_coin, messageClear, update_coin } from '../../store/reducers/coinReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FaImage } from 'react-icons/fa';

const CoinDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { successMessage, errorMessage, loader, coin } = useSelector(state => state.coin);
    
    // Initialize state with default values
    const [coinState, setCoinState] = useState({
        coinName: '',
        coinSymbol: '',
        coinAddress: '',
        coinImg: '',
        rate:0,
        coinBarcode: '',
    });
    
    const handleRateChange = (e) => {
        const value = e.target.value;
        setCoinState((prevState) => ({
          ...prevState,
          rate: value === '' ? '' : parseFloat(value)
        }));
      };
    const [coinImgPreview, setCoinImgPreview] = useState('');
    const [coinBarcodePreview, setCoinBarcodePreview] = useState('');
   // const [coinExample, setCoinExample] = useState([]);

    // Fetch coin data
    useEffect(() => {
        if (id) {
            dispatch(get_coin(id));
        }
    }, [dispatch, id]);

    // Update local state when coin data is loaded
    useEffect(() => {
        if (coin) {
            setCoinState({
                coinName: coin.coinName || '',
                coinSymbol: coin.coinSymbol || '',
                coinAddress: coin.coinAddress || '',
                coinImg: coin.coinImg || '',
                rate:coin.rate || 0,
                coinBarcode: coin.coinBarcode || '',
            });
            setCoinImgPreview(coin.coinImg || '');
            setCoinBarcodePreview(coin.coinBarcode || '');
        }
    }, [coin]);

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
        setCoinState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCoinImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoinImgPreview(URL.createObjectURL(file));
            setCoinState(prev => ({ ...prev, coinImg: file }));
        }
    };

    const handleCoinBarcode = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoinBarcodePreview(URL.createObjectURL(file));
            setCoinState(prev => ({ ...prev, coinBarcode: file }));
        }
    };

    // const handleInputChange = (index, value, field) => {
    //     setCoinExample(prevState => {
    //         const newState = [...prevState];
    //         newState[index] = {
    //             ...newState[index],
    //             [field]: value
    //         };
    //         return newState;
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(coinState).forEach(key => {
            if (coinState[key] !== '') {
                formData.append(key, coinState[key]);
            }
        });

        // if (coinExample && coinExample.length > 0) {
        //     formData.append('Example', JSON.stringify(coinExample));
        // }

        dispatch(update_coin({ id, formData }));
    };

    return (
        <div className='flex flex-col gap-y-4'>
            <div>
                <button 
                    onClick={() => dispatch(delete_coin(id))}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors mb-7 ${
                        loader ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-300'
                    }`}
                >
                    Delete coin
                </button>
                <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg'>
                    {/* Image upload sections */}
                    <div className='flex flex-col md:flex-row gap-4 mb-6'>
                        {/* Coin Image Upload */}
                        <div className='flex-1'>
                            <p className='uppercase font-semibold'>coin image</p>
                            <label 
                                className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                                htmlFor="coinImg"
                            >
                                {coinImgPreview ? (
                                    <img 
                                        src={coinImgPreview} 
                                        alt="Preview" 
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                ) : (
                                    <>
                                        <FaImage className='text-4xl text-gray-400 mb-2' />
                                        <span className='text-gray-600'>Upload Coin Image</span>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="coinImg"
                                accept="image/*"
                                onChange={handleCoinImage}
                                className='hidden'
                                name='coinImg'
                            />
                        </div>

                        {/* Barcode Upload */}
                        <div className='flex-1'>
                        <p className='uppercase font-semibold'>coin barcode</p>
                            <label 
                                className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                                htmlFor="coinBarcode"
                            >
                                {coinBarcodePreview ? (
                                    <img 
                                        src={coinBarcodePreview} 
                                        alt="barcodePreview" 
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                ) : (
                                    <>
                                        <FaImage className='text-4xl text-gray-400 mb-2' />
                                        <span className='text-gray-600'>Upload coin barCode</span>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="coinBarcode"
                                accept="image/*"
                                onChange={handleCoinBarcode}
                                className='hidden'
                                name='coinBarcode'
                            />
                        </div>
                    </div>

                    {/* Form inputs */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Coin Name</label>
                        <input
                            type="text"
                            name="coinName"
                            value={coinState.coinName}
                            onChange={handleChange}
                            placeholder="Enter coin name"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>abbreviation</label>
                        <input
                            type="text"
                            name="coinSymbol"
                            value={coinState.coinSymbol}
                            onChange={handleChange}
                            placeholder="Enter coin abbrev"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>coin address</label>
                        <input
                            type="text"
                            name="coinAddress"
                            value={coinState.coinAddress}
                            onChange={handleChange}
                            placeholder="Enter coin address"
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>
                     {/* coinrate Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Coin Rate</label>
                            <input
                                type="number"
                                name="rate"
                                value={coinState.rate}
                                onChange={handleRateChange}
                                placeholder="Enter coin rate"
                                step="any"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                    {/* Coin example section */}
                    {/* <h3 className='font-bold text-xl'>the price you input will double in value automatically</h3>
                    <div className='grid grid-cols-2 p-3 gap-2'>
                        {coinExample && coinExample.map((item, index) => (
                            <React.Fragment key={index}>
                                <input 
                                    className='border border-accent-100 grow rounded outline-none text-black p-2'
                                    type='text'
                                    value={item.send || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value, 'send')}
                                    placeholder='Send'
                                />
                                <input 
                                    className='border border-accent-100 grow rounded outline-none text-black p-2'
                                    type='text'
                                    value={item.bonus || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value, 'bonus')}
                                    placeholder='Bonus'
                                />
                            </React.Fragment>
                        ))}
                    </div> */}

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

export default CoinDetails;