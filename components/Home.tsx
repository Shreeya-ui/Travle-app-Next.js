import React from 'react';
import Hero from './Home/Hero/page';
import Destination from './Home/Destination/Destionation';


const Home = () => {
  return (
    <div className='overflow-hidden h-[10000px]'>
      <Hero/>
      <Destination/>
    </div>
    
  )
}

export default Home