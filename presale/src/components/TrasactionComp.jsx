import React from 'react';
import moment from 'moment';

const TransactionTable = ({ transactions }) => {
  // Function to truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Function to format date with moment
  const formatDate = (dateString) => {
    return moment(dateString).format('MMM DD, YYYY • h:mm A');
  };

  return (
    <div className="relative py-5 px-2 rounded-md w-full">
      {/* Desktop view */}
      <div className="hidden md:block max-h-96 overflow-auto">
        <table className="w-full text-sm text-left text-gray-200 rounded-md">
          <thead className="text-xs uppercase bg-gray-600 sticky top-0 rounded-md">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Currency</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Sent To</th>
              <th className="px-4 py-3">Token Bought</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={i}
                className="bg-gray-primary/80 border-b border-gray-700 fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <td className="px-4 py-3 whitespace-nowrap">#{tx.orderId}</td>
                <td className="px-4 py-3 whitespace-nowrap">{tx.currency}</td>
                <td className="px-4 py-3 whitespace-nowrap">{tx.Amount}</td>
                <td className="px-4 py-3 whitespace-nowrap">{truncateAddress(tx.address)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{tx.TokenAmount}</td>
                <td className="px-4 py-3 whitespace-nowrap">{tx.status}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tx.paymentStatus === 'Completed' || tx.paymentStatus === 'completed'
                        ? 'bg-green-500 text-gray-100'
                        : tx.paymentStatus === 'Pending' || tx.paymentStatus === 'pending'
                        ? 'bg-yellow-500 text-gray-100'
                        : 'bg-red-500 text-gray-100'
                    }`}
                  >
                    {tx.paymentStatus.charAt(0).toUpperCase() + tx.paymentStatus.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(tx.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - cards instead of table */}
      <div className="md:hidden space-y-4">
        {transactions.map((tx, i) => (
          <div 
            key={i} 
            className="bg-gray-primary/80 rounded-lg p-4 shadow fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">#{tx.orderId}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  tx.paymentStatus === 'Completed' || tx.paymentStatus === 'completed'
                    ? 'bg-green-500/40 text-gray-100'
                    : tx.paymentStatus === 'Pending' || tx.paymentStatus === 'pending'
                    ? 'bg-yellow-500/40 text-gray-100'
                    : 'bg-blue-500/40 text-gray-100'
                }`}
              >
                {tx.paymentStatus.charAt(0).toUpperCase() + tx.paymentStatus.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Currency</p>
                <p>{tx.currency}</p>
              </div>
              <div>
                <p className="text-gray-400">Amount</p>
                <p>{tx.Amount}</p>
              </div>
              <div>
                <p className="text-gray-400">Token Bought</p>
                <p>{tx.TokenAmount}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p>{tx.status}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Sent To</p>
                <p className="truncate">{tx.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Date</p>
                <p>{formatDate(tx.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No transactions found</p>
        </div>
      )}

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-in forwards;
          opacity: 0; /* start hidden */
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionTable;