import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createHomeDetails, get_home_details, messageClear, updateHomeDetails } from '../../store/reducers/homeReducer';
import { FaImage } from 'react-icons/fa';
import { FadeLoader } from 'react-spinners';

const HomeDetails = () => {
    const dispatch = useDispatch()
    const { successMessage, errorMessage, loader, homeDetails } = useSelector(state => state.home)
    const [imageShow, setImageShow] = useState('')
    const [editId, setEditId] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)

    const [state, setState] = useState({
        TokenName: '',
        TokenImage: '',
        TokenRate: '',
        TokenSymbol:'',
    })
    //add token symbol
    useEffect(() => {
       dispatch(get_home_details()) 
    }, [dispatch])

    useEffect(() => {
        if (homeDetails) {
            setEditId(homeDetails._id);
            populateFormWithExistingData();
        }
    }, [homeDetails]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        
        // Append all form fields to FormData
        Object.keys(state).forEach(key => {
            if (state[key] !== '') {
                formData.append(key, state[key])
            }
        })
        
        if (isUpdate) {
            dispatch(updateHomeDetails({ id: editId, formData }))
        } else {
            dispatch(createHomeDetails(formData))
        }
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageShow(URL.createObjectURL(file))
            setState(prev => ({ ...prev, TokenImage: file }))
        }
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            if (!isUpdate) {
                resetForm()
            }
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage, dispatch, isUpdate])

    const populateFormWithExistingData = () => {
        if (homeDetails) {
            setState({
                TokenName: homeDetails.TokenName || '',
                TokenImage: homeDetails.TokenImage || '',
                TokenRate: homeDetails.TokenRate || '',
                TokenSymbol: homeDetails.TokenSymbol || '',
            })
            setImageShow(homeDetails.TokenImage || '')
            setIsUpdate(true)
        }
    }

    const resetForm = () => {
        setState({
            TokenName: '',
            TokenImage: '',
            TokenRate: '',
            TokenSymbol:''
        })
        setImageShow('')
        setIsUpdate(false)
    }

    const switchToCreateMode = () => {
        resetForm()
    }

    return (
        <div className='w-full h-full bg-primary flex flex-col gap-y-4 justify-center items-center p-4'>
            {isUpdate && (
                <button 
                    onClick={switchToCreateMode} 
                    className='w-full self-end py-2 px-4 bg-accent-100'
                >
                    Switch to Create Mode
                </button>
            )}
            
            <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg'>
                <div className='flex flex-col md:flex-row gap-4 mb-6'>
                    {/* Image Upload */}
                    <div className='flex-1'>
                        <label 
                            className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                            htmlFor="TokenImage"
                        >
                            {imageShow ? (
                                <img 
                                    src={imageShow} 
                                    alt="Preview" 
                                    className='w-full h-full object-cover rounded-lg'
                                />
                            ) : (
                                <>
                                    <FaImage className='text-4xl text-gray-400 mb-2' />
                                    <span className='text-gray-600'>Upload Image</span>
                                </>
                            )}
                        </label>
                        <input
                            type="file"
                            id="TokenImage"
                            name="TokenImage"
                            accept="image/*"
                            onChange={handleImage}
                            className='hidden'
                        />
                    </div>
                </div>

                {/* TokenName Input */}
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Token Name</label>
                    <input
                        type="text"
                        name="TokenName"
                        value={state.TokenName}
                        onChange={handleChange}
                        placeholder="Enter token name"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                  {/* TokenSymbol Input */}
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Token symbol</label>
                    <input
                        type="text"
                        name="TokenSymbol"
                        value={state.TokenSymbol}
                        onChange={handleChange}
                        placeholder="Enter token name"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>

                {/* TokenRate Input */}
                <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>Token Rate</label>
                    <input
                        type="number"
                        name="TokenRate"
                        value={state.TokenRate}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                                setState({
                                    ...state,
                                    [e.target.name]: e.target.value
                                })
                            }
                        }} 
                        placeholder="Enter token rate"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loader}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                        loader ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {loader ? (
                        <FadeLoader color="#fff" loading={true} height={15} />
                    ) : isUpdate ? (
                        'Update Details'
                    ) : (
                        'Create Entry'
                    )}
                </button>
            </form>
        </div>
    );
};

export default HomeDetails;