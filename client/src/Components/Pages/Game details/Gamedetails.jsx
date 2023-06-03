import React from 'react';
import Navbar from '../../Globle_component/Navbar';
import SideNav from '../../Globle_component/SideNav';
import './gamedetails.css';

export default function GameDetails() {
  return (
    <div className='game-details'>
      <SideNav />
      <Navbar />

        <div className="game-details-container">

          <div className="game-details-topic"><h1>Game Details</h1></div>
            
        </div>
        
    </div>
  )
}
