import React from 'react';
import { FaSackDollar } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";
import { HiDocumentCheck } from "react-icons/hi2";

const Features = ({homeDetails}) => {
        
    return (
        <div
            className="self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center rounded-md bg-gradient-to-tl from-accent-300 via-accent-200 to-secondary py-2 px-4 lg:py-5 lg:px-8"
            style={{
                background: `linear-gradient(
                    to top,
                    rgba(92, 190, 255, 0.8),
                    rgba(10, 33, 78, 0.4) 90%
                )`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
                <div
                   
                    className="flex flex-row items-center gap-4 bg-white/70 rounded-md shadow-md p-4 h-40"
                >
                    <figure className="flex-shrink-0">
                        <img
                            className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg object-cover"
                            src={homeDetails?.homeDetails?.celebImage}
                            alt={`Feature`}
                        />
                    </figure>
                    <div className="flex flex-col gap-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{homeDetails?.homeDetails?.celebName}</h3>
                        <p className="text-sm sm:text-base font-medium text-gray-700">
                          The founder of this event and one of the main sponsors of the event
                        </p>
                    </div>
                </div>

                <div
                   
                   className="flex flex-row items-center gap-4 bg-white/70 rounded-md shadow-md p-4 h-40"
               >
                   <figure className="flex-shrink-0">
                   <FaSackDollar  className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg object-cover text-accent-300"/>
                   </figure>
                   <div className="flex flex-col gap-1 text-center sm:text-left">
                       <h3 className="text-lg sm:text-xl font-bold text-gray-800">$20,000,000</h3>
                       <p className="text-sm sm:text-base font-medium text-gray-700">
                        Allocated for the giveaway
                       </p>
                   </div>
               </div>

               <div
                   
                   className="flex flex-row items-center gap-4 bg-white/70 rounded-md shadow-md p-4 h-40"
               >
                   <figure className="flex-shrink-0">
                   <MdCurrencyExchange  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg object-cover text-accent-100"/>
                   </figure>
                   <div className="flex flex-col gap-1 text-center sm:text-left">
                       <h3 className="text-lg lg:text-xl font-bold text-gray-800">60 BTC/300 ETH</h3>
                       <p className="text-sm lg:text-base font-medium text-gray-700">
                         maximum allocated amount per wallet
                       </p>
                   </div>
               </div>

               <div
                   
                   className="flex flex-row items-center gap-4 bg-white/70 rounded-md shadow-md p-4 h-40"
               >
                   <figure className="flex-shrink-0">
                   <HiDocumentCheck  className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg object-cover text-accent-400"/>
                   </figure>
                   <div className="flex flex-col gap-1 text-center sm:text-left">
                       <h3 className="text-lg sm:text-xl font-bold text-gray-800">Terms of participation</h3>
                       <p className="text-sm sm:text-base font-medium text-gray-700">
                        Important: you can only participate ONCE!
                       </p>
                   </div>
               </div>
           
        </div>
    );
};

export default Features;
