import React from 'react';
import { useSelector } from 'react-redux';
//import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectClient = () => {
    const {clientInfo} = useSelector(state => state.userAuth)
    
    if (clientInfo) {
        return <Outlet/>
    } else {
        return <Navigate to={`/login`} replace={true} />
    }
};

export default ProtectClient;