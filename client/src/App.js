import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import SideNav from './Components/Globle_component/SideNav';

import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Games from './Components/Pages/Games/Games';
import Balance from './Components/Pages/Balance/Balance';
import AdUnit from './Components/Pages/Add unit/AdUnit';
import UserSettings from './Components/Pages/User settings/UserSettings';
import Help from './Components/Pages/Help & support/Help';



function App() {
  return (
    
    <Router>
      <div>
        <SideNav />
        <Routes>
          <Route exact path="/Game Deverloper/Dashboard" element = {<Dashboard />} />
          <Route path="/Game Deverloper/Games" element = {<Games />} />
          <Route path="/Game Deverloper/Balance" element = {<Balance />}/> 
          <Route path="/Game Deverloper/AdUnit" element = {<AdUnit />} /> 
          <Route path="/Game Deverloper/UserSettings" element = {<UserSettings />} />
          <Route path="/Game Deverloper/Help" element = {<Help />} />
        </Routes>
        
          
      </div>
    </Router>
    
  );
}

export default App;
