
import React from 'react';
import { FiUser, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { RiVerifiedBadgeFill } from "react-icons/ri";

const IndexPage = () => {
  const { homeDetails,userInfo } = useOutletContext();
  //console.log(process.env.REACT_APP_FRONTEND_HOST)
   // Get discount percentage based on status
   const getDiscountPercentage = (status) => {
    switch (status) {
      case "Bronze": return 5;
      case "Silver": return 10;
      case "Gold": return 15;
      case "Platinum": return 20;
      case "Diamond": return 25;
      case "Legend": return 30;
      default: return 0;
    }
  };
  const celebInfo={
    celeImg:`${process.env.REACT_APP_FRONTEND_HOST}/localImage/celeImg.png`,
    celeName:`gorklon rust`,
    celeHandle:`@elonmusk`,
    celeMsg:`Our NEW Official ${homeDetails?.homeDetails?.TokenName} is HERE! It's time to celebrate everything we stand for: WINNING! Join our very special Apple Community, GET YOUR ${homeDetails?.homeDetails?.TokenName} NOW. Go to Buy Token → Have Fun!`
  }
  
    return (
        <>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Balance Card */}
          <div className="bg-neutral-800 rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-neutral-700 rounded-full mr-2">
                <FiDollarSign size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-bold">{userInfo?.balance}</h2>
            <p className="text-xs text-neutral-400">Current Balance in {homeDetails?.homeDetails?.TokenName}</p>
          </div>
          
          {/* Status Card */}
          <div className="bg-neutral-800 rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-neutral-700 rounded-full mr-2">
                <FiUser size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-bold">{userInfo?.status}</h2>
            <p className="text-xs text-neutral-400">You have {getDiscountPercentage(userInfo?.status)}% bonus</p>
            
            <div className="mt-4">
              <div className="text-xs text-neutral-400 mb-1 flex justify-between">
                <span>Current progress</span>
                <span>{getDiscountPercentage(userInfo?.status)} %</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${getDiscountPercentage(userInfo?.status)}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>{userInfo?.balance} tokens</span>
                <span>100000 tokens</span>
              </div>
            </div>
            
            <Link to='/dashboard/buy-token' className="p-2 inline-block mt-4 bg-neutral-700 text-white py-2 rounded hover:bg-neutral-600">
              Buy Token Now!
            </Link>
          </div>
        </div>
        
        {/* Announcement */}
        <div className="bg-neutral-800 rounded-lg p-6 mb-4">
          <div className="flex items-start mb-2">
            <div className="w-10 h-10 bg-neutral-700 rounded-full mr-3 overflow-hidden flex-shrink-0">
              <img src={celebInfo?.celeImg || `${process.env.REACT_APP_FRONTEND_HOST}/localImage/celeImg.jpg`} alt={celebInfo.celeName} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-bold">{celebInfo.celeName}</h3>
                <div className="ml-1 text-blue-500">
                  <RiVerifiedBadgeFill size={16} />
                </div>
              </div>
              <p className="text-xs text-neutral-400">{celebInfo.celeHandle}</p>
            </div>
          </div>
          <p className="text-sm">{celebInfo?.celeMsg} </p>
         
        </div>
        
        {/* Progress Bar */}
        <div className="bg-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Token Stakes Progress</h2>
          <div className="mb-2">
            <p className="text-sm mb-1">Raised Amount: 6,475,000 {homeDetails?.homeDetails?.TokenName}</p>
            <div className="w-full bg-neutral-700 rounded-full h-3 mb-2">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Token: 9,475,000 {homeDetails?.homeDetails?.TokenName}</span>
              <span>100.00 %</span>
            </div>
          </div>
        </div>
      </>
    );
};

export default IndexPage;



