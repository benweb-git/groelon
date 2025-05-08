import React from 'react';

const Index = () => {
    return (
        <>
           <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Hello, admin</h1>
        <h2 className="text-3xl font-bold uppercase">{'current report'}</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-6 mb-12">
        <div className="bg-zinc-900 group hover:bg-accent-400 hover:text-txt-100 p-6 rounded-lg text-txt-400">
          <div className="bg-white group-hover:bg-txt-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
            {/* Shopping Cart Icon */}
            <svg className="w-8 h-8 text-accent-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H5.62L6.72 16.37C6.86 17.86 8.14 19 9.64 19H17.59C19.05 19 20.29 17.92 20.5 16.48L21.77 7.52C21.89 6.62 21.17 5.82 20.26 5.82H6.82" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 21C10.5523 21 11 20.5523 11 20C11 19.4477 10.5523 19 10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44772 21 10 21Z" 
                    fill="currentColor"/>
              <path d="M17 21C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19C16.4477 19 16 19.4477 16 20C16 20.5523 16.4477 21 17 21Z" 
                    fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-lg mb-2 uppercase">total coins</h3>
          <p className="text-4xl font-bold">{''}</p>
        </div>

        <div className="bg-zinc-900 group hover:bg-accent-400 hover:text-txt-100 p-6 rounded-lg text-txt-400">
          <div className="bg-white group-hover:bg-txt-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
            {/* Truck Icon */}
            <svg className="w-8 h-8 text-accent-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3H1V16H16V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8H20L23 11V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 21C6.88071 21 8 19.8807 8 18.5C8 17.1193 6.88071 16 5.5 16C4.11929 16 3 17.1193 3 18.5C3 19.8807 4.11929 21 5.5 21Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 21C19.8807 21 21 19.8807 21 18.5C21 17.1193 19.8807 16 18.5 16C17.1193 16 16 17.1193 16 18.5C16 19.8807 17.1193 21 18.5 21Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg mb-2 uppercase"> total token/network</h3>
          <p className="text-4xl font-bold">{}</p>
        </div>

        <div className="bg-zinc-900 group hover:bg-accent-400 hover:text-txt-100 p-6 rounded-lg text-txt-400">
          <div className="bg-white group-hover:bg-txt-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
            {/* User Icon */}
            <svg className="w-8 h-8 text-accent-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg mb-2 uppercase">total clients</h3>
          <p className="text-4xl font-bold">{}</p>
        </div>
      </div>

    
    </div>

       </>

    );
};

export default Index;