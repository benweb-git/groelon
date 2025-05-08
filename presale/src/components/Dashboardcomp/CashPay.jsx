import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { createCashDetails, get_all_cash, messageClear } from '../../store/reducers/cashReducer';


const CashPay = () => {
     //const loader =false
     const dispatch = useDispatch()
     const { successMessage, errorMessage, loader, cashes } = useSelector(state => state.cash);
     const [showContent, setShowContent]=useState(false)
     const [cashImgPreview, setCashImgPreview] = useState('')
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
     
      const handleChange = (e) => {
        setCashState({
            ...cashState,
            [e.target.name]: e.target.value
        })
    }

    const handleCoinImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCashImgPreview(URL.createObjectURL(file))
            setCashState(prev => ({ ...prev, cashImg: file }))
          
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all form fields to FormData
        Object.keys(cashState).forEach(key => {
            if (cashState[key] !== '') {
                formData.append(key, cashState[key]);
            }
        });
        dispatch(createCashDetails(formData));
    };

       
        

    

    return (
        <>
         <div className='flex flex-col gap-y-7 w-full h-full'>
           <div className='flex justify-between bg-secondary text-txt-500 text-xl font-semibold p-3 rounded'>
           <h4 onClick={()=>setShowContent(false)} className={`cursor-pointer uppercase pl-2 hover:text-gray-700 w-2/4 p-2 text-start rounded-md transform ${showContent?'':'hover:bg-accent-100/80 scale-105 bg-accent-100 rounded-r-none'}`}>Show all Cashes</h4>
            <div className='h-3/4 w-1 bg-black text-black font-bold mx-2 items-center self-center my-2'>
            </div>
            <h4 onClick={()=>setShowContent(true)} className={`cursor-pointer uppercase pr-2 hover:text-gray-700   w-2/4 p-2 text-end rounded-md transform  ${showContent?'hover:bg-accent-100/80 scale-105 bg-accent-100 rounded-l-none':''}`}>Create Cash</h4>
            
           </div>

           <div className='w-full h-full bg-secondary py-5 px-3 rounded-md'>

            {
            showContent? 
             <div className='flex flex-col gap-y-4 '>
                <div>
                <form onSubmit={handleSubmit} className='cursor-pointer w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg'>
                <div className='flex flex-col md:flex-row gap-4 mb-6'>
                    {/* coinImg Upload */}
                    <div className='flex-1'>
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
                            onChange={handleCoinImage}
                            className='hidden'
                            name='cashImg'
                        />
                    </div>

                </div>

                {/* cashName Input */}
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

                {/* cashSymbol Input */}
                <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>Cash symbol</label>
                    <input
                        type="text"
                        name="cashSymbol"
                        value={cashState.cashSymbol}
                        onChange={handleChange}
                        placeholder="Enter cash abbrev"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                  {/* cash message Input */}
                  <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>Cash message</label>
                    <input
                        type="text"
                        name="cashMessage"
                        value={cashState.cashMessage}
                        onChange={handleChange}
                        placeholder="Enter cash Message"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                 {/* cash Tag Input */}
                <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>Cash Tag</label>
                    <input
                        type="text"
                        name="cashPayTag"
                        value={cashState.cashPayTag}
                        onChange={handleChange}
                        placeholder="Enter cash Tag"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                 {/* cashrate Input */}
                 <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Cash Rate</label>
                    <input
                        type="number"
                        name="rate"
                        value={cashState.rate}
                        onChange={handleRateChange}
                        placeholder="Enter coin rate"
                        step="any"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                 </div>

                {/* {the coin example part} */}
                {/* <h3 className='font-bold text-xl'>the price you input will fields</h3>
                  */}

                    {/* <div className='grid grid-cols-2 p-3 gap-2'>
                    {coinExample.map((item, index) => (
                        <React.Fragment key={index}>
                        <input 
                            className='border border-accent-100 grow rounded outline-none text-black p-2'
                            type='text'
                            value={item.send}
                            onChange={(e) => handleInputChange(index, e.target.value, 'send')}
                            placeholder='Send'
                        />
                        <input 
                            className='border border-accent-100 grow rounded outline-none text-black p-2'
                            type='text'
                            value={item.bonus}
                            onChange={(e) => handleInputChange(index, e.target.value, 'bonus')}
                            placeholder='Bonus'
                        />
                        </React.Fragment>
                    ))}
                    </div> */}
                {/* Submit Button */}
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
                        'Create coin'
                    )}
                </button>
                 </form>
                </div>  
             </div>:
             <div className='flex flex-col gap-y-4  '>
                <button onClick={()=>dispatch(get_all_cash())} className='p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200'>get all cash</button>
                
                <div class="relative overflow-x-auto">

                    {
                        cashes.length>0?<table class="w-full text-sm text-left rtl:text-right text-black ">
                        <thead class="text-xs text-black uppercase bg-primary rounded font-semibold">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                  Image 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  cash currency
                                </th>
                                <th scope="col" class="px-6 py-3">
                                   PayTag
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  cashmessage 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              cashes.map((c,i)=> <tr key={i} class="bg-secondary border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <figure className='p-1 bg-primary rounded-full w-fit h-fit'>
                                        <img className='size-9 object-cover rounded-full' src={c?.cashImg} alt='cash img'/>
                                    </figure>
                                </th>
                                <td class="px-6 py-4 capitalize">
                                   {c?.cashName}
                                </td>
                                <td class="px-6 py-4 uppercase">
                                   {c?.cashSymbol}
                                </td>
                                <td class="px-6 py-4">
                                 {c?.cashPayTag.slice(0,7)}
                                </td>
                                <td class="px-6 py-4">
                                 {c?.cashMessage.slice(0,7)}
                                </td>
                                <td class="px-6 py-4">
                                    <Link to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/cash/${c._id}`} href="#" className="font-medium text-accent-300 hover:text-accent-200"><FaEye /></Link>
                                </td>
                            </tr>)  
                            }
                           
                        </tbody>
                    </table>:<h3 className='font-semibold text-xl'>{cashes.length===0?"nothing to show":` no coin has been created yet, create a coin`}</h3>
                    }
                    
                </div>    
             </div>
            }
            

           </div>
           
        </div>
        </>
       
    );
};



export default CashPay;