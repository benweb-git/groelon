import React, { useState } from 'react';
import { FiUser, FiChevronDown, FiMail} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Status = () => {
     const [expandedStatus, setExpandedStatus] = useState('legend');
     const { homeDetails,userInfo } = useOutletContext();

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
      
      const toggleStatus = (status) => {
        if (expandedStatus === status) {
          setExpandedStatus(null);
        } else {
          setExpandedStatus(status);
        }
      };
      function StatusAccordion({ title, isExpanded, onToggle, content }) {
        return (
          <div className="bg-neutral-800 rounded-lg overflow-hidden">
            <button 
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={onToggle}
            >
              <div className="flex items-center">
                <FiMail className="mr-2" size={16} />
                <span>{title}</span>
              </div>
              <FiChevronDown 
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                size={16} 
              />
            </button>
            
            {isExpanded && (
              <div className="px-4 pb-4">
                {content || <p className="text-sm text-neutral-400">Status details go here</p>}
              </div>
            )}
          </div>
        );
      }
    return (
        <>
             {/* Bronze Status Card */}
             <div className="bg-neutral-800 rounded-lg p-6 mb-4">
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
               
               <Link to={`/dashboard/buy-token`} className=" inline-block w-full p-1 mt-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 rounded hover:from-gray-500 hover:to-gray-600">
                <span className='block text-center'>Buy {homeDetails?.homeDetails?.TokenName} Now! </span> 
               </Link>
             </div>
             
             {/* Status Level Accordions */}
             <div className="space-y-3">
               <StatusAccordion 
                 title="Bronze Status" 
                 isExpanded={expandedStatus === 'bronze'} 
                 onToggle={() => toggleStatus('bronze')}
                 content={
                    <div className="mt-3 space-y-2 text-sm">
                      <p>Bronze Status</p>
                      <p>Deposit bonus: 5% tokens when buying 40 tokens or more.</p>
                      <p>Access to exclusive Apple device wallpapers</p>
                      <p>Thank you email from Apple</p>
                    </div>  
                  }
               />
               
               <StatusAccordion 
                 title="Silver Status" 
                 isExpanded={expandedStatus === 'silver'} 
                 onToggle={() => toggleStatus('silver')}
                 content={
                    <div className="mt-3 space-y-2 text-sm">
                      <p>Silver Status</p>
                      <p>Deposit bonus: 7% tokens when buying 200 tokens or more.</p>
                      <p>Early access to iOS/macOS beta versions</p>
                      <p>Apple Fan of Honor e-certificate</p>
                      <p>Apple Store discount coupon (up to 5%)</p>
                    </div>
                  }
               />
               
               <StatusAccordion 
                 title="Gold Status" 
                 isExpanded={expandedStatus === 'gold'} 
                 onToggle={() => toggleStatus('gold')}
                 content={
                    <div className="mt-3 space-y-2 text-sm">
                      <p>Gold Status</p>
                      <p>Deposit bonus: 10% tokens when buying 500 tokens or more.</p>
                      <p>Exclusive digital autograph of Tim Cook</p>
                      <p>Invitation to private online Apple presentations</p>
                      <p>Expanded access to Apple Arcade (3 months free)</p>
                    </div>
                  }
               />
               
               <StatusAccordion 
                 title="Platinum Status" 
                 isExpanded={expandedStatus === 'platinum'} 
                 onToggle={() => toggleStatus('platinum')}
                 content={
                    <div className="mt-3 space-y-2 text-sm">
                      <p>Platinum Status</p>
                      <p>Deposit bonus: 15% tokens when buying 1000 tokens or more.</p>
                      <p>Physical postcard signed by Tim Cook (replica)</p>
                      <p>VIP access to Apple Support with priority service</p>
                      <p>Exclusive discounts on Apple accessories (up to 10%)</p>
                      <p>VIP status in Apple Store with a personal manager</p>
                    </div>
                  }
               />
               
               <StatusAccordion 
                 title="Diamond Status" 
                 isExpanded={expandedStatus === 'diamond'} 
                 onToggle={() => toggleStatus('diamond')}
                 content={
                    <div className="mt-3 space-y-2 text-sm">
                      <p>Diamond Status</p>
                      <p>Deposit bonus: 15% tokens when buying 5000 tokens or more.</p>
                      <p>Original Tim Cook autograph on digital media</p>
                      <p>Invitation to private Apple events</p>
                      <p>6 months free Apple One subscription</p>
                    </div>
                  }
               />
               
               <StatusAccordion 
                 title="Legend Status" 
                 isExpanded={expandedStatus === 'legend'} 
                 onToggle={() => toggleStatus('legend')}
                 content={
                   <div className="mt-3 space-y-2 text-sm">
                     <p>Legend Status</p>
                     <p>Deposit bonus: 20% tokens when buying 50000 tokens or more.</p>
                     <p>Personalized thank you video from Apple</p>
                     <p>Invitation to Apple's live presentation in Cupertino</p>
                     <p>Exclusive Apple souvenir set (t-shirt, cap, accessories)</p>
                     <p>VIP status in Apple Store with a personal manager</p>
                   </div>
                 }
               />
             </div>
           </>
    );
};

export default Status;