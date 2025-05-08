import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../../store/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const Login = () => {
    const navigate = useNavigate()
    const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [stateInfo,setStateInfo]=useState({
            username:"",
            password:"",
            remember:false

        })

        const handleState =(e)=>{
            setStateInfo({
                ...stateInfo,
               [e.target.name]:e.target.value
           })
        }
    
    const checkSubmitData=(e)=>{
        e.preventDefault()
        dispatch(admin_login(stateInfo))
       
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
        if (userInfo) {
            navigate(`/${process.env.REACT_APP_DASHBOARD_ROUTE}`)
        }
    },[successMessage,errorMessage])

    return (
       <>
         <div className='w-full h-screen bg-gray-500/20 flex flex-col gap-5 justify-center items-center text-txt-500'>

             <h2 className='text-2xl font-bold '>Admin login</h2>

                <form onSubmit={checkSubmitData} className="max-w-sm mx-auto bg-primary rounded-lg py-7 px-5 relative">
                    {
                        loader?<div className=' absolute top-0 left-0 w-full h-full bg-accent-100/30 flex justify-center items-center'> <p className='text-green-500'>loading...</p></div>:<></>
                    }
                <div className="mb-5">
                   
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input onChange={handleState} value={stateInfo.username} type="text" name='username'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"/>
                </div>
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={handleState} value={stateInfo.password} type="password" name='password'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*********" />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                    <input onChange={(e)=>(setStateInfo({...stateInfo,[e.target.name]:!stateInfo.remember}))} value={stateInfo.remember}  type="checkbox" name='remember' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>


         </div>
       </>
    );
};

export default Login;