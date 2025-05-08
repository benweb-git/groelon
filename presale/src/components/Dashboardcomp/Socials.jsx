import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSocialDetails, get_all_socials, messageClear, update_socials } from '../../store/reducers/socialReducer';
import { PropagateLoader } from 'react-spinners';

const Socials = () => {
    const [ShowDetails, SetShowDetails] = useState(false);
    const { successMessage, errorMessage, loader, socialDetails } = useSelector(state => state.social);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        twitter: "",
        discord: "",
        whatsapp: "",
        instagram: "",
        facebook: "",
        reddit: ""
    });

    // Fetch social details on component mount
    useEffect(() => {
        dispatch(get_all_socials());
    }, [dispatch]);

    // Update state when socialDetails changes
    useEffect(() => {
        if (socialDetails && Object.keys(socialDetails).length > 0) {
            setState(socialDetails);
            SetShowDetails(true);
        } else {
            setState({
                twitter: "",
                discord: "",
                whatsapp: "",
                instagram: "",
                facebook: "",
                reddit: ""
            });
            SetShowDetails(false);
        }
    }, [socialDetails]);
    // Handle success and error messages
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);  // Changed from success to error
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ShowDetails && socialDetails._id) {  // Check if _id exists
            dispatch(update_socials({
                id: socialDetails._id,  // Pass as an object with id and state
                state: state
            }));
        }else {
            dispatch(createSocialDetails({ ...state }));
        }
    };

    return (
        <div className='flex flex-col gap-y-4 p-9 justify-center items-center h-full w-full'>
            <form className='flex flex-col w-2/4 h-2/3 gap-y-6' onSubmit={handleSubmit}>
                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="twitter">twitter link</label>
                    <input value={state.twitter} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='twitter' id='twitter' placeholder='enter twitter link' />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="discord">discord link</label>
                    <input value={state.discord} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='discord' id='discord' placeholder='enter discord link' />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="whatsapp">whatsapp Link</label>
                    <input value={state.whatsapp} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='whatsapp' id='whatsapp' placeholder='enter whatsapp link' />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="instagram">instagram Link</label>
                    <input value={state.instagram} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='instagram' id='instagram' placeholder='enter instagram link' />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="reddit">reddit Link</label>
                    <input value={state.reddit} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='reddit' id='reddit' placeholder='enter reddit link' />
                </div>

                <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor="facebook">facebook link</label>
                    <input value={state.facebook} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" name='facebook' id='facebook' placeholder='enter facebook link' />
                </div>

                <button disabled={loader} className='bg-red-500 w-[200px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                    {loader ? <PropagateLoader color='#fff' /> : ShowDetails ? 'Update Changes' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default Socials;