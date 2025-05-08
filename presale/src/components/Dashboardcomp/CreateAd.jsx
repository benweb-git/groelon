import React, { useEffect, useState } from 'react';
import { admin_register, delete_admin, get_all_admin, messageClear } from '../../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';


const CreateAd = () => {
    const navigate = useNavigate()
    const {loader,errorMessage,successMessage,allAdmin,userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()

      const [stateInfo,setStateInfo]=useState({
            username:"",
            password:"",
        })

        const handleState =(e)=>{
            setStateInfo({
                ...stateInfo,
               [e.target.name]:e.target.value
           })
        }

        //  useEffect(() => { 
        //    dispatch(get_all_Admin())
        //   },[])
    
    const checkSubmitData=(e)=>{
        e.preventDefault()
    
        dispatch(admin_register(stateInfo))     
       
    }
    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        }
        
    },[successMessage,errorMessage,userInfo.role,dispatch,navigate])


    return (
        

       <div className='w-full h-screen bg-gray-500/20 flex flex-col gap-5 justify-center items-center text-txt-500 relative'>
              <div onClick={()=>dispatch(get_all_admin(userInfo.role))} className='absolute top-10 right-2 bg-accent-500 text-txt-500 z-10 cursor-pointer py-2 px-6'>
                        show all admins
                    </div>

             <h2 className='text-2xl font-bold '>Admin register</h2>

                <form onSubmit={checkSubmitData} className="max-w-sm mx-auto bg-primary rounded-lg py-7 px-5 relative">
                    {
                        loader?<div className=' absolute top-0 left-0 w-full h-full bg-accent-100/30 flex justify-center items-center'> <FadeLoader/></div>:<></>
                    }
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input onChange={handleState} value={stateInfo.username} type="text" name='username'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"/>
                </div>
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={handleState} value={stateInfo.password} type="password" name='password'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*********" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

                

                <div class="relative overflow-x-auto">
                   
                    <table class="w-full text-sm text-left rtl:text-right text-txt-500 dark:text-gray-400">
                        <thead class="text-xs text-black uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    password
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                             {
                                allAdmin.map((a,i)=> <tr key={i} class="bg-primary border-accent-100">
                                <th scope="row" class="px-6 py-4 font-medium text-txt-500 whitespace-nowrap dark:text-white">
                                    {a.username}
                                </th>
                                <td class="px-6 py-4">
                                    {a.password}
                                </td>
                                <td class="px-6 py-4">
                                   {a.role}
                                </td>
                                <td class="px-6 py-4">
                                  <Link onClick={()=>dispatch(delete_admin(a._id))} className='text-blue'>delete</Link>
                                </td>
                            </tr>)
                             }
                        </tbody>
                    </table>
                </div>


               


         </div>
    );
};

export default CreateAd;