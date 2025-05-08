import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  FaImage} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { create_network, messageClear } from '../../store/reducers/networkReducer';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';


const Createnetwork = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate();
     const { coinName,networkId } = useParams();
   
     const { successMessage, errorMessage, loader} = useSelector(state => state.network);
     const [networkBarcodePreview, setNetworkBarcodePreview] = useState('')
     const [NetworkState, setNetworkState] = useState({
        networkName: '',
        networkAddress: '',
        networkBarcode: '',
      });

      useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate(-1);
        }
        if (errorMessage) {
            toast.error(errorMessage); 
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch,navigate]);
     
      const handleChange = (e) => {
        setNetworkState({
            ...NetworkState,
            [e.target.name]: e.target.value
        })
    }

    const handleCoinBarcode = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNetworkBarcodePreview(URL.createObjectURL(file))
            setNetworkState(prev => ({ ...prev, networkBarcode: file }))
          
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all form fields to FormData
        Object.keys(NetworkState).forEach(key => {
            if (NetworkState[key] !== '') {
                formData.append(key, NetworkState[key]);
            }
        });
    
    
        // If you want to see the content of formData
    
        dispatch(create_network({networkId,formData}));
    };
        
        

    

    return (
        <>
         <div className='flex flex-col gap-y-7 w-full h-full'>
           <div className='w-full h-full bg-secondary py-5 px-3 rounded-md'>
           <div className='flex justify-between bg-secondary text-txt-500 text-xl font-semibold p-3 rounded'>
             <h2 className=' uppercase font-semibold'>you will be creating a token for {coinName}</h2>
           </div>

            {

             <div className='flex flex-col gap-y-4 '>
                <div>
                <form onSubmit={handleSubmit} className='cursor-pointer w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg'>
                <div className='flex flex-col md:flex-row gap-4 mb-6'>
                    {/* coinBarcode Upload */}
                    <div className='flex-1'>
                        <label 
                            className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                            htmlFor="coinBarcode"
                        >
                            {networkBarcodePreview ? (
                                <img 
                                    src={networkBarcodePreview} 
                                    alt="varcodePreview" 
                                    className='w-full h-full object-cover rounded-lg'
                                />
                            ) : (
                                <>
                                    <FaImage className='text-4xl text-gray-400 mb-2' />
                                    <span className='text-gray-600'>Upload network barCode</span>
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

                {/* coinName Input */}
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>network name</label>
                    <input
                        type="text"
                        name="networkName"
                        value={NetworkState.networkName}
                        onChange={handleChange}
                        placeholder="eg trc20 for usdt"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>

              
                  {/* coinAddress Input */}
                  <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>network address</label>
                    <input
                        type="text"
                        name="networkAddress"
                        value={NetworkState.networkAddress}
                        onChange={handleChange}
                        placeholder="Enter network wellet address"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
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
                        'Create network'
                    )}
                </button>
                 </form>
                </div>  
             </div>
            }
            

           </div>
           
        </div>
        </>
       
    );
};


export default Createnetwork;