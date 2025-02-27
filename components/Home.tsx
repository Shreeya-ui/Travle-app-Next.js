import React from 'react';
import Hero from './Home/Hero/page';
import Destination from './Home/Destination/Destination';


const Home = () => {
  return (
    <div className='overflow-hidden h-[10000px]'>
      <Hero/>
      <Destination/>
    </div>
    
  )
}

export default Home