import React from 'react';

const ScrollingItems = ({ personUsedpic }) => {
  // Create multiple items for seamless scrolling
  const items = Array.isArray(personUsedpic) ? personUsedpic : []; // More items for smoother looping

  return (
    <div className="relative w-full overflow-hidden mt-20">
      {/* Scrolling container */}
      <div className="flex gap-5 animate-scroll">
        {/* Duplicate items for infinite loop */}
        {[...items, ...items, ...items, ...items].map((c, index) => (
          <div key={`scroll-${index}`} className="flex flex-row gap-x-2 justify-center items-center shrink-0">
            <figure className="p-4 rounded-full">
              <img className="object-cover w-7 h-7 rounded-full" src={c.coinImg} alt="crypto" />
            </figure>
            <h2 className="text-txt-200 flex gap-x-2 items-center whitespace-nowrap">${c.rate}</h2>
            {/* <p className="flex gap-x-2 items-center text-green-900 whitespace-nowrap">25%</p> */}
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-secondary/40 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-secondary/40 to-transparent pointer-events-none"></div>

      {/* Tailwind CSS for Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-10%); } /* Moves half the width */
        }

        .animate-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default ScrollingItems;
