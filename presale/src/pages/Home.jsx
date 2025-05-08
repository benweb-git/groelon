import { useHomeDetails } from '../hooks/useHomeDetails';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { TbLockAccess } from 'react-icons/tb';
import { BsRobot } from 'react-icons/bs';
import { SlBadge } from "react-icons/sl";

const Home = () => {
  // Get home details once
  const homeDetails = useHomeDetails();
 
  
  
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  // Toggle mobile menu
 
  const faqItems = [
    {
      question: `What is the purpose of ${homeDetails?.homeDetails?.TokenName}?`,
      answer: `${homeDetails?.homeDetails?.TokenName} is a digital currency designed to change how we handle transactions and assets, providing a secure and efficient way to conduct financial operations.`
    },
    {
      question: "Price prediction.",
      answer: `Our market makers predict a listing price of $${homeDetails?.homeDetails?.TokenRate*3} per ${homeDetails?.homeDetails?.TokenName}. The listing is scheduled for June 8, 2025 on all major exchanges.`
    },
    {
      question: `How can I invest in ${homeDetails?.homeDetails?.TokenName}?`,
      answer: `You can invest in ${homeDetails?.homeDetails?.TokenName} by clicking the 'Purchase Tokens' button above and following the simple steps on our secure platform.`
    },
    {
      question: "What are the investment restrictions?",
      answer: "Investment restrictions vary by region. Please ensure you comply with your local regulations before investing."
    },
    {
      question: "What payment methods are accepted?",
      answer: `We accept major cryptocurrencies, credit/debit cards, and bank transfers for purchasing ${homeDetails?.homeDetails?.TokenName}.`
    }
  ];

  return (
    <div id='home' className="min-h-screen bg-gray-900 text-white">
      <Header homeDetails={homeDetails}/>

      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 lg:py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full bg-blue-400 blur-3xl opacity-5 w-96 h-96 -top-24 left-1/4"></div>
          <div className="absolute rounded-full bg-blue-400 blur-3xl opacity-5 w-64 h-64 top-1/2 -right-12"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="inline-block px-6 py-2 rounded-full bg-gray-800 mb-6">
            <span className="text-sm">Official Token Presale</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">The Future of Digital Currency</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 flex justify-center items-center">
            <img src={homeDetails?.homeDetails?.TokenImage} alt="Apple logo" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 mr-2" />
            {homeDetails?.homeDetails?.TokenName} Presale Now Live!
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-400 mb-10 md:mb-12 px-4">
            Discover the future of finance with the {homeDetails?.homeDetails?.TokenName}, a digital currency designed to change
            how we handle transactions and assets.
          </p>

          {/* Countdown Timer */}
          {/* <div className="flex justify-center gap-2 sm:gap-4 mb-6 md:mb-8">
            <div className="bg-gray-800 p-2 sm:p-4 w-14 sm:w-16 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Days</div>
            </div>
            <div className="bg-gray-800 p-2 sm:p-4 w-14 sm:w-16 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Hours</div>
            </div>
            <div className="bg-gray-800 p-2 sm:p-4 w-14 sm:w-16 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Minutes</div>
            </div>
          </div> */}

          {/* <p className="text-xs sm:text-sm text-gray-400 mb-6">H:M:S Until the end of the Presale</p> */}

          <Link to={`/dashboard/buy-token`} className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
            Purchase Tokens
          </Link>
        </div>
      </section>

      {/* Phase Alpha Section */}
      <section id='price' className="mx-4 sm:mx-6 md:mx-12 lg:mx-24 bg-gray-800 rounded-xl p-4 sm:p-6 mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Phase Alpha is currently underway.</h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2 sm:px-4">
          This is a unique opportunity that is available for a limited time only, allowing you to join our community at an early stage.
        </p>

        <div className="mb-4 flex justify-between items-center">
          <div>
            <span className="text-xs sm:text-sm">Current price</span>
            <div>
              <img src={homeDetails?.homeDetails?.TokenImage} alt="{homeDetails?.homeDetails?.TokenName} icon" className="inline h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-sm sm:text-base">1.00 = ${homeDetails?.homeDetails?.TokenRate}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm sm:text-base">55%</span>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '55%' }}></div>
        </div>

        <Link to="/login" className="block w-full bg-white text-gray-900 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
          <span className='block text-center justify-center'>Buy Now!</span>
        </Link>
      </section>

      {/* Tokenomics Section */}
      <section id='tokenomics' className="mx-4 sm:mx-6 md:mx-12 lg:mx-24 bg-gray-800 rounded-xl p-4 sm:p-6 mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Tokenomics</h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2 sm:px-4">
          This is a special chance to get involved with our community during its early phase, and it won't last long!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Token Distribution */}
          <div>
            <h3 className="font-bold mb-4 text-sm sm:text-base">Token distribution</h3>
            
            {/* Public Sale */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Public Sale</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1">
                <div className="bg-gray-500 h-1.5 sm:h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            
            {/* Development */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Development</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1">
                <div className="bg-gray-500 h-1.5 sm:h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            {/* Team & Advisors */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Team & Advisors</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1">
                <div className="bg-gray-500 h-1.5 sm:h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            {/* Marketing */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Marketing</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1">
                <div className="bg-gray-500 h-1.5 sm:h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            {/* Reserve */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Reserve</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-1">
                <div className="bg-gray-500 h-1.5 sm:h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Token Details */}
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4 text-sm">
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Token details</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Token Name</span>
                <span>{homeDetails?.homeDetails?.TokenName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Token Symbol</span>
                <span>{homeDetails?.homeDetails?.TokenSymbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Supply</span>
                <div className="flex items-center text-xs sm:text-sm">
                  <img src={homeDetails?.homeDetails?.TokenImage} alt={`${homeDetails?.homeDetails?.TokenName} symbol`} className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>1,000,000,000.00</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Price</span>
                <span>${homeDetails?.homeDetails?.TokenRate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Soft Cap</span>
                <span className="text-xs sm:text-sm">$5,000,000,000.00</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Hard Cap</span>
                <span className="text-xs sm:text-sm">$20,000,000,000.00</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6">
          Our market makers predict a listing price of ${homeDetails?.homeDetails?.TokenRate*3} per {homeDetails?.homeDetails?.TokenName}. The listing is scheduled for June 8, 2025 on all major exchanges.
        </p>
      </section>

      {/* Prize Pool Section */}
      <section id='price-pool' className="mx-4 sm:mx-6 md:mx-12 lg:mx-24 mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Special prize pool</h2>
        <p className="text-gray-400 text-center text-sm mb-4 sm:mb-6 px-2 sm:px-4">
          Don't miss out on this exclusive chance to be part of our community from the ground up. Join now to take advantage of our special prize pool, available for a limited time.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1 */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <div className="bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <RiSecurePaymentLine size={16}/>
            </div>
            <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Lifetime free transactions</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Enjoy unlimited and hassle-free transactions for all your financial needs.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <div className="bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <TbLockAccess size={16}/>
            </div>
            <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Priority access</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Military-grade encryption and secure blockchain technology.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <div className="bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <BsRobot size={16}/>
            </div>
            <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">AI Integration</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Advanced AI capabilities for smart transactions and analytics.
            </p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <div className="bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
             <SlBadge size={16}/>
            </div>
            <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Special rewards</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Special rewards and privileges for early adopters.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='faq' className="mx-4 sm:mx-6 md:mx-12 lg:mx-24 mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">FAQ</h2>
        
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <button 
                className="w-full p-3 sm:p-4 text-left flex justify-between items-center hover:bg-gray-750 transition-colors text-sm sm:text-base"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <svg 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {openFAQ === index && (
                <div className="p-3 sm:p-4 bg-gray-750 border-t border-gray-700 text-sm">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Join Revolution */}
      <section className="text-center py-6 sm:py-8">
        <Link to="register" className="bg-gray-800 px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition-colors">
          Join The Revolution
        </Link>
      </section>

      {/* Footer */}
      <div className="py-8 sm:py-12 flex flex-wrap justify-center items-center gap-6 sm:gap-12 px-4">
        <img src={`${process.env.REACT_APP_FRONTEND_HOST}/sponsorsImage/openai.png`} alt="OpenAi" className="h-10 sm:h-20" />
        <img src={`${process.env.REACT_APP_FRONTEND_HOST}/sponsorsImage/microsoft.png`} alt="Microsoft" className="h-10 sm:h-20" />
        <img src={`${process.env.REACT_APP_FRONTEND_HOST}/sponsorsImage/tesla.png`} alt="Tesla" className="h-10 sm:h-20" />
        {/* <img src={`${process.env.REACT_APP_FRONTEND_HOST}/sponsorsImage/apple_logo.png`} alt="Apple" className="h-8 sm:h-18" /> */}
        <img src={`${process.env.REACT_APP_FRONTEND_HOST}/sponsorsImage/AmericanExpress.png`} alt="american express" className="h-10 sm:h-20" />
      </div>
      <Footer homeDetails={homeDetails}/>
     
    </div>
  );
};

export default Home;