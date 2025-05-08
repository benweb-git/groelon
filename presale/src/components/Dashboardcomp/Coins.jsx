import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { createCoinDetails, get_all_coins, messageClear } from '../../store/reducers/coinReducer';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const Coins = () => {
     //const loader =false
     const dispatch = useDispatch()
     const { successMessage, errorMessage, loader, coins } = useSelector(state => state.coin);
     const [showContent, setShowContent]=useState(false)
     const [coinImgPreview, setCoinImgPreview] = useState('')
     const [coinBarcodePreview, setCoinBarcodePreview] = useState('')
     const [coinState, setCoinState] = useState({
        coinName: '',
        coinSymbol: '',
        coinAddress: '',
        coinImg:'',
        rate:0,
        coinBarcode:'',
      });
      const handleRateChange = (e) => {
        const value = e.target.value;
        setCoinState((prevState) => ({
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
        setCoinState({
            ...coinState,
            [e.target.name]: e.target.value
        })
    }

    const handleCoinImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCoinImgPreview(URL.createObjectURL(file))
            setCoinState(prev => ({ ...prev, coinImg: file }))
          
        }
    }
    const handleCoinBarcode = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCoinBarcodePreview(URL.createObjectURL(file))
            setCoinState(prev => ({ ...prev, coinBarcode: file }))
         
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all form fields to FormData
        Object.keys(coinState).forEach(key => {
            if (coinState[key] !== '') {
                formData.append(key, coinState[key]);
            }
        });
    
        // Add coin example data if it exists
        // if (coinExample) {
        //     formData.append('coin_example', JSON.stringify(coinExample));
        // }
    
    

    
        dispatch(createCoinDetails(formData));
    };

        // const [coinExample, setCoinExample] = useState([
        //     { send: '', bonus: '' },
        //     { send: '', bonus: '' },
        //     { send: '', bonus: '' },
        //     { send: '', bonus: '' },
        //     { send: '', bonus: '' },
        //     { send: '', bonus: '' }
        //   ]);
        
        //   const handleInputChange = (index, value, field) => {
        //     setCoinExample(prevState => {
        //       const newState = [...prevState];
        //       newState[index] = {
        //         ...newState[index],
        //         [field]: value
        //       };
        //       return newState;
        //     });
            
        //   };
        

    

    return (
        <>
         <div className='flex flex-col gap-y-7 w-full h-full'>
           <div className='flex justify-between bg-secondary text-txt-500 text-xl font-semibold p-3 rounded'>
           <h4 onClick={()=>setShowContent(false)} className={`cursor-pointer uppercase pl-2 hover:text-gray-700 w-2/4 p-2 text-start rounded-md transform ${showContent?'':'hover:bg-accent-100/80 scale-105 bg-accent-100 rounded-r-none'}`}>Show all coins</h4>
            <div className='h-3/4 w-1 bg-black text-black font-bold mx-2 items-center self-center my-2'>
            </div>
            <h4 onClick={()=>setShowContent(true)} className={`cursor-pointer uppercase pr-2 hover:text-gray-700   w-2/4 p-2 text-end rounded-md transform  ${showContent?'hover:bg-accent-100/80 scale-105 bg-accent-100 rounded-l-none':''}`}>Create coin</h4>
            
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

                    {/* coinBarcode Upload */}
                    <div className='flex-1'>
                        <label 
                            className='flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg'
                            htmlFor="coinBarcode"
                        >
                            {coinBarcodePreview ? (
                                <img 
                                    src={coinBarcodePreview} 
                                    alt="varcodePreview" 
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

                {/* coinName Input */}
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

                {/* coinSymbol Input */}
                <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>Coin symbol</label>
                    <input
                        type="text"
                        name="coinSymbol"
                        value={coinState.coinSymbol}
                        onChange={handleChange}
                        placeholder="Enter coin abbrev"
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                </div>
                  {/* coinAddress Input */}
                  <div className='mb-6'>
                    <label className='block text-gray-700 mb-2'>coin address</label>
                    <input
                        type="text"
                        name="coinAddress"
                        value={coinState.coinAddress}
                        onChange={handleChange}
                        placeholder="Enter coin abbrev"
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
                <button onClick={()=>dispatch(get_all_coins())} className='p-3 cursor-pointer hover:bg-accent-200 rounded bg-accent-100 justify-center w-full font-semibold uppercase focus:bg-accent-200'>get all coins</button>
                
                <div class="relative overflow-x-auto">

                    {
                        coins.length>0?<table class="w-full text-sm text-left rtl:text-right text-black ">
                        <thead class="text-xs text-black uppercase bg-primary rounded font-semibold">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                  Image 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Coin abbrev
                                </th>
                                <th scope="col" class="px-6 py-3">
                                   Address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              coins.map((c,i)=> <tr key={i} class="bg-secondary border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <figure className='p-1 bg-primary rounded-full w-fit h-fit'>
                                        <img className='size-9 object-cover rounded-full' src={c.coinImg} alt='coin img'/>
                                    </figure>
                                </th>
                                <td class="px-6 py-4 capitalize">
                                   {c.coinName}
                                </td>
                                <td class="px-6 py-4 uppercase">
                                   {c.coinSymbol}
                                </td>
                                <td class="px-6 py-4">
                                 {c.coinAddress.slice(0,7)}
                                </td>
                                <td class="px-6 py-4">
                                    <Link to={`/${process.env.REACT_APP_DASHBOARD_ROUTE}/coin/${c._id}`} href="#" className="font-medium text-accent-300 hover:text-accent-200"><FaEye /></Link>
                                </td>
                            </tr>)  
                            }
                           
                        </tbody>
                    </table>:<h3 className='font-semibold text-xl'>{coins.length===0?"nothing to show":` no coin has been created yet, create a coin`}</h3>
                    }
                    
                </div>    
             </div>
            }
            

           </div>
           
        </div>
        </>
       
    );
};

export default Coins;