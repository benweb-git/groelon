import React, { useEffect, useState } from 'react';
import { IoMdClose, IoMdCopy } from "react-icons/io";
import { GoArrowSwitch } from "react-icons/go";
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import {Watch} from 'react-loader-spinner'
import { useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { trasaction_Confirm } from '../../store/reducers/participantReducer';

const BuyToken = () => {
  // Define initial coin data
  const { homeDetails,userInfo } = useOutletContext();
  const dispatch = useDispatch();

  // State management
  const [securePay, setSecurePay] = useState(false);
  const [Paid, setPaid] = useState(false);
  const [CrossCheck, setCrossCheck] = useState(true);
  const [AddtoPay, setAddtoPay] = useState(true);
  const [PaymentConfirmation, setPaymentConfirmation] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchCurrency, setSwitchCurrency] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [rangeAmount, setRangeAmount] = useState(0);
  const [coinKeys, setCoinKeys] = useState([]);
  const [cashKeys, setCashKeys] = useState([]);
  const [selectedCash, setSelectedCash] = useState(null);
  const [transactionState, setTransactionState] = useState({
     userId:'',
     orderId:'',
     Amount:'',
     currency:'',
     address:'',
     status:'',
     TokenAmount:''
  })
  const [conversionData, setConversionData] = useState({
    youPay: '',
    youReceive: '',
    userStatus: ''
  });
  useEffect(() => {
    // Initialize with an empty array if homeDetails?.coinDetails is undefined
    setCoinKeys(homeDetails?.coinDetails || []);
    setCashKeys(homeDetails?.CashPayDetails || []);
    
  }, [homeDetails]);

  const handleCopy = (text) => {
     copy(text);
     toast.success('Copied')
   
  }
  const handleConfirm = () => {

    const mid = Math.floor(selectedCoin?.coinAddress.length / 2) - 2;
    const middleFour = selectedCoin?.coinAddress.slice(mid, mid + 4) || '';
    const randomFourDigit = Math.floor(1001 + Math.random() * 9009) + middleFour ;
    
    const updatedTransaction = {
      userId: userInfo._id,
      orderId: randomFourDigit,
      Amount: conversionData?.youReceive,
      currency: selectedCoin?.coinSymbol,
      address: selectedCoin?.coinAddress,
      status: conversionData?.userStatus,
      TokenAmount:conversionData?.youPay,
      referraled:userInfo?.referral
    };
  
    setTransactionState(updatedTransaction);
     dispatch(trasaction_Confirm(updatedTransaction));
   
  };
   
  

  // Constants
  const minAmount = 40;
  const maxAmount = 100000;
  const tickValues = [40, 50000,100000];

  // Filter coins based on search term
  useEffect(() => {
    if (!homeDetails?.coinDetails) {
      setCoinKeys([]);
      return;
    }
  
    if (searchTerm === '') {
      setCoinKeys(homeDetails.coinDetails);
    } else {
      const filtered = homeDetails.coinDetails.filter(coin => 
        coin?.coinName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin?.coinSymbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoinKeys(filtered);
    }
  }, [searchTerm, homeDetails]);

  //filter cash
  useEffect(() => {
    if (!homeDetails?.CashPayDetails) {
      setCashKeys([]);
      return;
    }
  
    if (searchTerm === '') {
      setCashKeys(homeDetails.CashPayDetails);
    } else {
      const filtered = homeDetails.CashPayDetails.filter(cash => 
        cash?.cashName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cash?.cashSymbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCashKeys(filtered);
    }
  }, [searchTerm, homeDetails]);

  // Handle conversion calculations when inputs change
  useEffect(() => {
    if (!selectedCoin || selectedAmount === '') {
      setConversionData({
        youPay: '',
        youReceive: '',
        userStatus: ''
      });
      return;
    }

    const amount = parseFloat(selectedAmount);
    if (isNaN(amount)) {
      setConversionData({
        youPay: '',
        youReceive: '',
        userStatus: ''
      });
      return;
    }

    let youPay, youReceive, newRangeAmount;

    // Calculate based on currency direction
    if (switchCurrency) {
      // Converting from selected coin to itoken
      youPay =Number((amount).toPrecision(3)) ;
      youReceive = Number(((amount * selectedCoin?.rate) / homeDetails?.homeDetails?.TokenRate).toPrecision(3)) ;
      newRangeAmount = (amount * selectedCoin?.rate) / homeDetails?.homeDetails?.TokenRate ;
    } else {
      // Converting from itoken to selected coin
      youPay = Number((amount).toPrecision(3));
      youReceive = Number(((amount * homeDetails?.homeDetails?.TokenRate) / selectedCoin?.rate).toPrecision(3))
      newRangeAmount = amount;
    }

    // Determine user status based on amount
    let userStatus;
    if (newRangeAmount >= 40 && newRangeAmount<=199) {
      userStatus = "Bronze";
    } else if (newRangeAmount >= 200 && newRangeAmount <= 499) {
      userStatus = "Silver";
    } else if (newRangeAmount >= 500 && newRangeAmount <= 999) {
      userStatus = "Gold";
    } else if (newRangeAmount >= 1000 && newRangeAmount <= 4999) {
      userStatus = "Platinum";
    } else if (newRangeAmount >= 5000 && newRangeAmount <= 49999) {
      userStatus = "Diamond";
    } else if (newRangeAmount >= 50000 && newRangeAmount <= 100000) {
      userStatus = "Legend";
    } else if(newRangeAmount >= 100001) {
      userStatus = "Super Legend";
    }

    setRangeAmount(newRangeAmount);
    setConversionData({
      youPay,
      youReceive,
      userStatus
    });
  }, [selectedAmount, selectedCoin, switchCurrency, homeDetails?.homeDetails?.TokenRate]);

  // Handle switch currency with value preservation
  const handleSwitchCurrency = () => {
    if (!selectedCoin || selectedAmount === '') {
      setSwitchCurrency(!switchCurrency);
      return;
    }
    
    const amount = parseFloat(selectedAmount);
    if (isNaN(amount)) {
      setSwitchCurrency(!switchCurrency);
      return;
    }
    
    // Calculate the equivalent amount in the new currency mode
    let newAmount;
    if (switchCurrency) {
      // Switching from coin to itoken
      newAmount = (amount * selectedCoin.rate) / homeDetails?.homeDetails?.TokenRate;
    } else {
      // Switching from itoken to coin
      newAmount = (amount * homeDetails?.homeDetails?.TokenRate) / selectedCoin.rate;
    }
    
    // Round to 2 decimal places for better display
    newAmount = Math.round(newAmount * 100) / 100;
    
    // Update state
    setSelectedAmount(newAmount.toString());
    setSwitchCurrency(!switchCurrency);
  };

  // Handle slider change
  const handleSliderChange = (e) => {
    setSelectedAmount(Number(e.target.value));
  };

  // Get discount percentage based on status
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

  return (
    <div className="w-full p-6 bg-black text-white min-h-screen relative">
      {
        securePay? <div className=" absolute flex items-center justify-center w-full h-screen bg-black bg-opacity-70 z-30">
            <div className="w-fit bg-gray-800 rounded-lg p-6 text-white relative">
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={()=>{setSecurePay(false);}}
              >
                <IoMdClose size={24}/>
              
              </button>
              
              {/* Heading */}
              <h1 className="text-3xl font-bold mb-6">Secure Payment Process</h1>
              
              {/* Transaction Details */}
              {
                CrossCheck? <div className="mb-6 w-full max-w-lg mx-auto px-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-wide mb-4">TRANSACTION DETAILS</h2>
                
                {/* Payment Amount */}
                <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mb-3 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="text-gray-300 text-base sm:text-lg mb-1 sm:mb-0">Payment amount</div>
                  <div className="text-white text-lg sm:text-xl font-medium break-words">
                  {selectedCoin?.cashMessage?selectedCoin?.coinSymbol:""} {switchCurrency ? selectedAmount : conversionData?.youReceive} {selectedCoin?.cashMessage?"":selectedCoin?.coinSymbol}
                  </div>
                </div>
                
                {/* Tokens to receive */}
                <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mb-3 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="text-gray-300 text-base sm:text-lg mb-1 sm:mb-0">Tokens to receive</div>
                  <div className="flex items-center">
                    <figure className="mr-2 rounded-full flex-shrink-0">
                      <img className="rounded-full w-6 h-6 sm:w-8 sm:h-8" src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenName} />
                    </figure>
                    <span className="font-medium text-lg sm:text-xl break-words">
                      {switchCurrency ? conversionData?.youReceive : selectedAmount} {homeDetails?.homeDetails?.TokenSymbol}
                    </span>
                  </div>
                </div>
                
                {/* Bonus Tokens */}
                <div className="bg-gray-900 bg-opacity-70 p-3 sm:p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="text-gray-300 text-base sm:text-lg mb-1 sm:mb-0">Bonus Tokens</div>
                  <div className="flex items-center">
                    <figure className="mr-2 rounded-full flex-shrink-0">
                      <img className="rounded-full w-6 h-6 sm:w-8 sm:h-8" src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenName} />
                    </figure>
                    <span className="font-medium text-lg sm:text-xl break-words">
                      {switchCurrency
                        ? ((getDiscountPercentage(conversionData.userStatus) / 100) * conversionData?.youReceive)
                        : (getDiscountPercentage(conversionData.userStatus) / 100) * selectedAmount} {homeDetails?.homeDetails?.TokenSymbol}
                    </span>
                  </div>
                </div>
                
                {/* Confirm Button */}
                <button 
                  onClick={() => {setCrossCheck(false);setAddtoPay(true)}} 
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 font-semibold text-base sm:text-lg rounded-full hover:opacity-90 transition-opacity"
                >
                  Confirm Purchase
                </button>
              </div>:AddtoPay?<>
            {/* Amount to Send */}
            <div className="mb-3 md:mb-4">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-1 md:mb-2">SEND  {selectedCoin?.cashMessage?selectedCoin?.coinSymbol:""}{conversionData?.youReceive}  {selectedCoin?.cashMessage?"":selectedCoin?.coinSymbol}</p>
              
              <div className="bg-gray-700 rounded-lg p-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <figure className="bg-transparent rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-white mr-2">
                    <img className="text-xs md:text-base size-8 rounded-full" src={selectedCoin.coinImg} alt={selectedCoin.coinSymbol} />
                  </figure>
                  <span className="text-sm sm:text-base md:text-xl">{conversionData?.youReceive}</span>
                </div>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleCopy(conversionData?.youReceive.toString())}
                >
                  <IoMdCopy size={18} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            
            {/* Address/Tag section */}
            {
              selectedCoin?.cashMessage? <div className="mb-4 md:mb-6">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-1 md:mb-2" 
              dangerouslySetInnerHTML={{ 
                __html: selectedCoin?.cashMessage?.replace(/<bold>/g, '<strong>').replace(/<\/bold>/g, '</strong>') 
             }}></p>
              <div className="bg-gray-700 rounded-lg p-3 md:p-4 flex justify-between items-center">
                <div className="overflow-hidden flex-1 mr-2">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg truncate">{selectedCoin?.coinAddress}</p>
                  <div className="w-full h-1 bg-gray-600 mt-1 md:mt-2">
                    <div className="h-full bg-blue-500 w-2/3"></div>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-white flex-shrink-0"
                  onClick={() => handleCopy(selectedCoin?.coinAddress)}
                >
                  <IoMdCopy size={18} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>:  <div className="mb-4 md:mb-6">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-1 md:mb-2">TO THE ADDRESS BELOW</p>
              
              <div className="bg-gray-700 rounded-lg p-3 md:p-4 flex justify-between items-center">
                <div className="overflow-hidden flex-1 mr-2">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg truncate">{selectedCoin?.coinAddress}</p>
                  <div className="w-full h-1 bg-gray-600 mt-1 md:mt-2">
                    <div className="h-full bg-blue-500 w-2/3"></div>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-white flex-shrink-0"
                  onClick={() => handleCopy(selectedCoin?.coinAddress)}
                >
                  <IoMdCopy size={18} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            }

          

             {/* BARCODE */}
             {
             !selectedCoin?.cashMessage &&  ( <div className="mb-4 md:mb-6">
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-1 md:mb-2">SCAN WALLET BARCODE</p>
                
                <div className="rounded-lg p-3 md:p-4 flex justify-between items-center mx-auto">
                 
                   <figure className='size-32 sm:size-52 justify-center flex  items-center mx-auto rounded-md' >
                    <img className='size-32 sm:size-52 justify-center items-center rounded-md' src={selectedCoin?.coinBarcode} alt={selectedCoin?.coinSymbol}/>
                   </figure>
                   
               
                 
                </div>
              </div>)
             }
            
            
            {/* Instructions */}
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 md:p-6 mb-4 md:mb-6">
              <ul className="space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                <li className="flex">
                  <span className="text-gray-300 mr-2">•</span>
                  {selectedCoin?.cashMessage?<p>Contact your bank if payment takes more than 24 hours to confirm.</p>:<p>A minimum of 12 confirmations is required to process this payment.</p>}
                </li>
                <li className="flex">
                  <span className="text-gray-300 mr-2">•</span>
                  <p>Ensure the exact amount is sent to avoid discrepancies.</p>
                </li>
                <li className="flex">
                  <span className="text-gray-300 mr-2">•</span>
                  <p>Your tokens will be credited once payment is confirmed.</p>
                </li>
              </ul>
            </div>
            <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                    <input onChange={(e)=>(setPaid(true))} value={Paid}  type="checkbox" name='remember' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-300 dark:text-gray-300">I have made payment</label>
                </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <button 
                className="bg-gray-700 py-2 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-gray-600"
                onClick={() => {
                  setAddtoPay(false);
                  setCrossCheck(true);
                }}
              >
                Cancel
              </button>
              <button 
                  disabled={!Paid}
                  className={`py-2 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-medium ${
                    Paid 
                      ? "bg-gray-300 text-gray-800 hover:bg-gray-200" 
                      : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() => {
                    handleConfirm();
                    setAddtoPay(false);
                    setPaymentConfirmation(true);
                    setPaid(false)
                  }}
                >
                  Confirm
              </button>
            </div>
          </>:PaymentConfirmation?<>
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20">
        <Watch />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-medium mb-2">Processing your transaction</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Order #{transactionState.orderId} is being processed. Please wait.
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-700 rounded-xl p-4 mb-6">
        {/* Amount */}
        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-gray-300">{!selectedCoin?.cashMessage?"Address":"SENT TO"}:</span>
          <div className="flex items-center">
            <figure className=" rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <img className="text-xs rounded-full" src={selectedCoin.coinImg} alt={selectedCoin.coinSymbol}/>
            </figure>
            <span>{conversionData?.youReceive}</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-gray-300">Address:</span>
          <div className="truncate max-w-35 sm:max-w-48">
            <span className="text-white">{selectedCoin?.coinAddress}</span>
          </div>
        </div>

        {/* Tokens */}
        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-gray-300">Tokens:</span>
          <div className="flex items-center">
          <img className="mr-2 text-white size-3 sm:size-6 rounded-full" src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol}/>
            <span>{switchCurrency ? conversionData?.youReceive : selectedAmount}</span>
          </div>
        </div>

        {/* Bonus */}
        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-gray-300">Bonus:</span>
          <figure className="flex items-center">
          
            <img className="mr-2 text-white size-3 sm:size-6 rounded-full" src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol}/>
            <span>
              {switchCurrency
                ? ((getDiscountPercentage(conversionData?.userStatus) / 100) * conversionData?.youReceive)
                : ((getDiscountPercentage(conversionData?.userStatus) / 100) * selectedAmount)}
            </span>
          </figure>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-3">
          <span className="font-medium">Total:</span>
          <div className="flex items-center">
          <img className="mr-2 text-white size-3 sm:size-6 rounded-full" src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol}/>
            <span className="font-medium">
              {switchCurrency
                ? conversionData?.youReceive * (1 + getDiscountPercentage(conversionData?.userStatus) / 100)
                : selectedAmount * (1 + getDiscountPercentage(conversionData?.userStatus) / 100) }
            </span>
          </div>
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <button 
        onClick={() => {
          setCrossCheck(true);
          setAddtoPay(false)
          setPaymentConfirmation(false);
          setSecurePay(false);
        }} 
        className="w-full bg-gradient-to-r from-gray-400 to-gray-300 text-gray-800 font-medium py-3 rounded-full mb-6 hover:opacity-90 transition-opacity"
      >
        Back to Dashboard
      </button>
    </>:<></>
              }
             
              
              {/* Footer Text */}
              <div className="text-center text-gray-400 text-sm">
                {
                  !AddtoPay?<p>By clicking continue, you agree to our 
                  <Link to={`/privacy`} target="_blank" rel="noopener noreferrer" className="underline cursor-pointer hover:underline-offset-2 hover:text-blue-500"> Privacy Policy </Link>. 
                  </p>:<p>If you're new to cryptocurrency, check out our <Link to={`/dashboard/how-to-buy`} target="_blank" rel="noopener noreferrer" className="underline cursor-pointer hover:underline-offset-2 hover:text-blue-500"> How to buy </Link>guide to get started</p>
                  
                  }
                
              </div>
            </div>
      </div>:<></>
      }

      <h1 className="text-3xl font-bold mb-2">Buy {homeDetails?.homeDetails?.TokenName}</h1>
      <p className="text-gray-400 mb-6">Join the future of finance. Select your preferred currency and calculate your potential rewards.</p>

      {selectedCoin && (
        <div className="bg-gray-900 text-white p-6 rounded-xl w-full mb-3">
          <div className="flex justify-between items-center mb-4 bg-gray-800 rounded-lg p-2">
            <input 
              type="text" 
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                  setSelectedAmount(value);
                }
              }} 
              className="bg-transparent p-2 text-left w-24 focus:outline-none"
              value={selectedAmount}
              min={minAmount}
              max={maxAmount}
            />
            <div className="flex items-center">
              <span className="mr-2">{switchCurrency ? selectedCoin.coinSymbol : homeDetails?.homeDetails?.TokenSymbol}</span>
              <div 
                onClick={handleSwitchCurrency} 
                className="bg-gray-700 p-2 rounded-md cursor-pointer hover:bg-gray-500"
              >
                <GoArrowSwitch width="10" height="10"/>
              </div>
            </div>
          </div>
      
          {/* Min/Max labels */}
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm">Min: {minAmount}</span>
              <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
            </div>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm">Max: {maxAmount}</span>
              <img src={homeDetails?.homeDetails?.TokenImage} alt={homeDetails?.homeDetails?.TokenSymbol} className="size-2 sm:size-4" />
            </div>
          </div>
      
          {/* Range slider */}
          <div className="mb-2">
            <input 
              type="range" 
              min={minAmount} 
              max={maxAmount} 
              value={rangeAmount}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
      
          {/* Tick marks */}
          <div className="flex justify-between mb-6 text-xs text-gray-400">
            {tickValues.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
      
          {/* Exchange info */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg w-full sm:w-1/2">
              <p className="text-gray-400 mb-2 text-sm">{switchCurrency?"You receive":"You pay"}</p>
              <div className="flex items-center">
                <div className="bg-transparent w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2">
                  <img className="w-full h-full rounded-full" src={switchCurrency ? homeDetails?.homeDetails?.TokenImage : selectedCoin.coinImg} alt={switchCurrency ? homeDetails?.homeDetails?.TokenSymbol : selectedCoin.coinName} />
                </div>
                <span className="text-lg sm:text-xl">{conversionData.youReceive}</span>
                <span className="ml-2 text-gray-400">{switchCurrency ? homeDetails?.homeDetails?.TokenSymbol : selectedCoin.coinSymbol}</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-full sm:w-1/2">
              <p className="text-gray-400 mb-2 text-sm">{switchCurrency?"You pay":"You receive"}</p>
              <div className="flex items-center">
                <figure className="bg-transparent rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2">
                  <img className="text-white w-full h-full rounded-full" src={switchCurrency ? selectedCoin.coinImg : homeDetails?.homeDetails?.TokenImage} alt={switchCurrency ? selectedCoin.coinName : homeDetails?.homeDetails?.TokenSymbol}/>
                </figure>
                <span className="text-lg sm:text-xl">{conversionData.youPay}</span>
                <span className="ml-2 text-gray-400">{switchCurrency ? selectedCoin.coinSymbol : homeDetails?.homeDetails?.TokenSymbol}</span>
              </div>
            </div>
          </div>
          
          {/* Status level */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6 relative overflow-hidden">
            <div className="z-10 relative">
              <p className="text-gray-400 text-sm">Status Level:</p>
              <p className="text-xl sm:text-2xl font-bold">{conversionData?.userStatus?conversionData?.userStatus:"beginner"}</p>
            </div>
          
            {/* Purple decoration */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
              <span className="text-lg sm:text-xl font-bold">
                {getDiscountPercentage(conversionData.userStatus)}%
              </span>
            </div>
          
            {/* Purple gradient bar */}
            <div className="absolute bottom-0 right-0 h-2 w-full bg-purple-600 rounded-b-lg"></div>
          
            {/* Purple decoration image */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-30">
              <div className="transform rotate-45 translate-x-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="purple" className="w-24 sm:w-32 h-24 sm:h-32">
                  <path d="M11.26 3.691c2.73 0 5.18 1.08 6.99 2.89 4.66 4.66 1.37 12.42-5.17 12.42-3.52 0-6.65-2.1-8.05-5.25v6.18H3.69V3.691h7.56Zm0 2.34H6.03v5.73c0 2.92 2.31 5.23 5.23 5.23 2.4 0 4.42-1.6 5.08-3.79.89-3-1.23-5.99-4.33-5.99-.86 0-1.61.2-2.23.51.99 1.08 1.81 2.98 1.81 3.94h-2.34c0-.86-.98-2.55-1.2-2.88-.71.66-1.16 1.61-1.16 2.65 0 .96.39 1.89 1.07 2.57.69.66 1.61 1.07 2.57 1.07 1.01 0 1.96-.42 2.65-1.1.36-.36.64-.76.84-1.2.59-1.31.37-2.88-.58-3.92-.76-.84-1.82-1.29-2.96-1.29s-2.14.5-2.86 1.34c-.33.38-.57.79-.74 1.25v-7.11Z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Buy button */}
          <button 
            onClick={() => setSecurePay(true)} 
            disabled={rangeAmount < 40} 
            className="w-full py-3 text-center bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800 font-bold rounded-md hover:from-gray-200 hover:to-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Buy Now!
          </button>
        </div>
      )}


      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for a currency..."
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-2 top-2 bg-gray-200 text-gray-800 px-4 py-1 rounded">Find</button>
      </div>

        {/* the coin and cash maping section */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          cashKeys.length > 0 &&(
            cashKeys.map((cash, index) => (
              <div 
                onClick={() => setSelectedCoin({                   
                 coinName:cash.cashName,
                 coinImg:cash.cashImg,
                 coinSymbol:cash.cashSymbol,
                 coinAddress:cash.cashPayTag,
                 cashMessage:cash.cashMessage,
                 rate:cash.rate
                })} 
                key={index} 
                className="bg-gray-800 p-4 rounded-lg mb-3 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <figure className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                    <img className="w-8 h-8 rounded-full" src={cash.cashImg} alt={`${cash.cashName} logo`} />
                  </figure>
                  <div>
                    <h3 className="font-bold">{cash.cashName}</h3>
                    <p className="text-xs text-gray-400">{cash.cashSymbol}</p>
                  </div>
                </div>
                <p className="text-sm">{`1 ${cash.cashSymbol} = ${cash.rate/homeDetails?.homeDetails?.TokenRate} ${homeDetails?.homeDetails?.TokenSymbol}`}</p>
              </div>
            ))
          )   }
        {coinKeys.length > 0 ? (
          coinKeys.map((coin, index) => (
            <div 
              onClick={() => setSelectedCoin(coin)} 
              key={index} 
              className="bg-gray-800 p-4 rounded-lg mb-3 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center mb-2">
                <figure className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                  <img className="w-8 h-8 rounded-full" src={coin.coinImg} alt={`${coin.coinName} logo`} />
                </figure>
                <div>
                  <h3 className="font-bold">{coin.coinName}</h3>
                  <p className="text-xs text-gray-400">{coin.coinSymbol}</p>
                </div>
              </div>
              <p className="text-sm">{`1 ${coin.coinSymbol} = ${coin.rate/homeDetails?.homeDetails?.TokenRate} ${homeDetails?.homeDetails?.TokenSymbol}`}</p>
            </div>
          ))
        ) :coinKeys.length <= 0 && cashKeys.length <= 0 ?(
          <div className="text-center p-4 text-gray-400 col-span-4">No matching Search found</div>
        ):<></>}
      </div>
    </div>
  );
};

export default BuyToken;
