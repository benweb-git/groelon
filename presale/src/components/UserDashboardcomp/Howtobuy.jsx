import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Howtobuy = () => {
  const { homeDetails } = useOutletContext();
  return (
    <div className="p-6 bg-black text-white min-h-screen ">
      <h1 className="text-2xl font-bold mb-2">How to buy {homeDetails?.homeDetails?.TokenName}?</h1>
      <p className="text-gray-400 mb-6">Follow these simple steps to purchase {homeDetails?.homeDetails?.TokenName} and join our growing community. New to crypto? Check out our guide for beginners below.</p>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Buy Crypto via TrustWallet or MetaMask</h2>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">1 Install TrustWallet or MetaMask</h3>
          <p className="text-sm text-gray-400">Download TrustWallet or MetaMask from the App Store or Google Play. Ensure you download from official sources.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">2 Use Your Credit/Debit Card</h3>
          <p className="text-sm text-gray-400">Inside the app, choose "Buy crypto", select USDT, ETH, or BTC and pay securely with your credit or debit card.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">3 Secure Your Wallet</h3>
          <p className="text-sm text-gray-400">Keep your seed phrase safe. Never share it with anyone.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">4 Transfer Crypto to Address you got</h3>
          <p className="text-sm text-gray-400">Once you have purchased crypto, transfer it to the address provided on the Buy Token page.</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Buy Crypto via Crypto Exchanges</h2>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">1 Create an Exchange Account</h3>
          <p className="text-sm text-gray-400">Sign up on Binance, Kraken, or Coinbase. Verify your identity with basic documents to get started.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">2 Buy USDT or ETH</h3>
          <p className="text-sm text-gray-400">Use your credit/debit card to purchase USDT (Tether) or ETH (Ethereum) on the exchange.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">3 Withdraw to Address</h3>
          <p className="text-sm text-gray-400">Once you have purchased crypto, transfer it to the address provided on the Buy Token page.</p>
        </div>
        
        <Link to="https://youtu.be/yQQykHfkkZ0?si=6TYNTr0s7HOLR-OJ" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 mb-4">Learn how to withdraw from Binance</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg scale-95 hover:scale-100">
          <div className="font-bold mb-2 flex items-center">
            <span className="mr-2">🔒</span> Secure Transactions
          </div>
          <div className="text-sm text-gray-400">Every transaction is protected with top-tier encryption and security measures.</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg scale-95 hover:scale-100">
          <div className="font-bold mb-2 flex items-center">
            <span className="mr-2">⏱️</span> Instant Processing
          </div>
          <div className="text-sm text-gray-400">Tokens are credited immediately after payment confirmation.</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg scale-95 hover:scale-100">
          <div className="font-bold mb-2 flex items-center">
            <span className="mr-2">💱</span> Multiple Currencies
          </div>
          <div className="text-sm text-gray-400">Choose from BTC, ETH, USDT, and more to complete your purchase.</div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg scale-95 hover:scale-100">
          <div className="font-bold mb-2 flex items-center">
            <span className="mr-2">💲</span> Competitive Rates
          </div>
          <div className="text-sm text-gray-400">Get the best value with our highly competitive token pricing.</div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Step-by-Step X Coin Purchase Guide</h2>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">1 Select Your Currency</h3>
          <p className="text-sm text-gray-400">Choose your preferred cryptocurrency from the available options in the Buy Token page.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">2 Enter Amount</h3>
          <p className="text-sm text-gray-400">Input the amount you wish to invest. The system will calculate the iTokens you'll receive.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">3 Review Transaction</h3>
          <p className="text-sm text-gray-400">Carefully review the transaction details before proceeding.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-2 scale-95 hover:scale-100">
          <h3 className="font-bold">4 Complete Payment</h3>
          <p className="text-sm text-gray-400">Send the exact amount to the provided wallet address. Verify the address to avoid errors.</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg scale-95 hover:scale-100">
          <h3 className="font-bold">5 Receive Tokens</h3>
          <p className="text-sm text-gray-400">Once your payment is confirmed, the iTokens will be credited to your account.</p>
        </div>
      </div>
    </div>
  );
};

export default Howtobuy;