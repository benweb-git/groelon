import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectUser = () => {
    const {userInfo} = useSelector(state => state.auth)
    

    if (userInfo) {
        return <Outlet/>
    } else {
        return <Navigate to={`${process.env.REACT_APP_LOGIN_ROUTE?`/${process.env.REACT_APP_LOGIN_ROUTE}`:'/'}`} replace={true} />
    }
};

export default ProtectUser;