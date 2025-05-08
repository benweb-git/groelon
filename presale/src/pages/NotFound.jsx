import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
    return (
        
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-800 text-gray-100">
        <figure>
          <TbError404 className="h-[300px] w-[500px] text-red-500" />
        </figure>
      
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-2">Page Not Found</p>
          <p className="md:text-lg lg:text-xl text-gray-300 mt-8">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link
            to={`/`}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-400 text-white px-4 py-2 mt-12 rounded transition duration-150"
            title="Return Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Return Home</span>
          </Link>
        </div>
      </div>
      
    );
};

export default NotFound;