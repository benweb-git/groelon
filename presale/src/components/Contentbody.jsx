import React from 'react';
import ScrollingItems from './ScrollingItems';
import { Link } from 'react-router-dom';

const Contentbody = ({homeDetails}) => {

    return (
       <>
            <div className='w-full min-h-screen bg-primary/80 flex flex-col gap-y-5 py-3 px-5 items-center'> 
      <ScrollingItems personUsedpic={homeDetails?.coinDetails}/>
      <div className='flex flex-col gap-y-10 md:flex-row gap-x-7 w-full'>
        <div className='flex flex-col justify-center items-center gap-y-9 w-full md:w-1/2'>
          <figure className='p-1 shadow-md shadow-accent-300 rounded-md'>
            <img className='object-cover size-40 md:size-80 rounded-md' src={homeDetails?.homeDetails?.celebImage} alt='crypto' />
          </figure>
          <h3 className='text-xl font-semibold'>{homeDetails?.homeDetails?.celebName} {homeDetails?.homeDetails?.logo} Giveaway</h3>
          <p className='text-justify text-base md:text-lg'>Good Luck Everyone! A great opportunity to grow your capital!</p>
          <p className='text-justify text-base md:text-lg'>The giveaway? It's our way to say: "Thank you!".</p>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full'>
            {homeDetails?.coinDetails?.length>0?homeDetails?.coinDetails?.map((c, i) => (
              <Link
                key={i}
                to={`/giveaway/${c.coinSymbol}`}
                className='py-2 px-4 bg-accent-100 rounded-md uppercase font-semibold text-lg hover:bg-accent-100/70 hover:text-white text-txt-500 w-full'
              >
                {c.coinSymbol} <span className='capitalize'>Giveaway</span>
              </Link>
            )):<></>
            }
          </div>
        </div>

        <div className='flex flex-col gap-y-7 w-full md:w-1/2'>
          <div className='relative w-full pt-[56.25%]'>
          <video 
              src={homeDetails?.homeDetails?.celebVideo} 
              controls
              // className='w-full h-full object-cover rounded-lg'
              className='absolute top-0 left-0 w-full h-full rounded-lg'
          />

            {/* <iframe
              className='absolute top-0 left-0 w-full h-full rounded-lg'
              src="https://www.youtube.com/embed/bc9q__VbYL4"
              title="Giveaway Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
          </div>

          <h4 className='text-xl font-semibold font-serif text-center'>
            watch video to learn more!
          </h4>
        </div>
        
      </div>
    </div>
       </>
    );
};

export default Contentbody;