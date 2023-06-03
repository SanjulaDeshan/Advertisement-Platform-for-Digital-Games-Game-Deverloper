import {React, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.css'; 

// Mui icons import
import DashboardIcon from "@mui/icons-material/Dashboard";
import GamesIcon from "@mui/icons-material/Games";
import BalanceIcon from "@mui/icons-material/Balance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogOut from './LogOut';

export default function SideNav() {

    
    // const [activeComponent, setActiveComponent] = useState("dashboard");

    // function updateComponent(component){
    //     setActiveComponent(component);
    // }

    
  return (
    <nav className="side-nav">

      <div className="top-sec">
        <h1>Game Deverloper</h1>
      </div>

  
        {/* <NavLink exact to="/Game Deverloper/Dashboard">
        <div onClick={() => updateComponent('dashboard')} className={activeComponent=='dashboard'? "active" : "inactive"}>  
            <DashboardIcon /> &nbsp; Dashboard
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/Games">
        <div onClick={() => updateComponent('games')} className={activeComponent=='games'? "active" : "inactive"}>  
            <GamesIcon /> &nbsp; Games
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/Balance">
        <div onClick={() => updateComponent('balance')} className={activeComponent=='balance'? "active" : "inactive"}>  
            <BalanceIcon /> &nbsp; Balance
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/Monitization">
        <div onClick={() => updateComponent('monitization')} className={activeComponent=='monitization'? "active" : "inactive"}>  
            <MonetizationOnIcon /> &nbsp; Monitization
        </div>
        </NavLink>
    
        <NavLink to="/Game Deverloper/Add Unit">
        <div onClick={() => updateComponent('addUnit')} className={activeComponent=='addUnit'? "active" : "inactive"}>  
            <AdUnitsIcon /> &nbsp; Ad Unit
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/Game Details">
        <div onClick={() => updateComponent('gameDetails')} className={activeComponent=='gameDetails'? "active" : "inactive"}>  
            <SportsEsportsIcon /> &nbsp; Game Details
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/User Settings">
        <div onClick={() => updateComponent('settings')} className={activeComponent=='settings'? "active" : "inactive"}>  
            <SettingsIcon /> &nbsp; User Settings
        </div>
        </NavLink>

        <NavLink to="/Game Deverloper/Help & Support">
        <div onClick={() => updateComponent('help')} className={activeComponent=='help'? "active" : "inactive"}>  
            <InfoIcon /> &nbsp; Help & Support
        </div>
        </NavLink> */}



        <ul className="side-nav-list">
          <li className="side-nav-item">
            <NavLink exact to="/Game Deverloper/Dashboard" activeClassName="active"><DashboardIcon /> &nbsp; Dashboard</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/Games" activeClassName="active"><GamesIcon /> &nbsp; Games</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/Balance" activeClassName="active"><BalanceIcon /> &nbsp; Balance</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/Monitization" activeClassName="active"><MonetizationOnIcon /> &nbsp; Monitization</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink exact to="/Game Deverloper/AdUnit" activeClassName="active"><AdUnitsIcon /> &nbsp; Ad Unit</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/GameDetails" activeClassName="active"><SportsEsportsIcon /> &nbsp; Game Details</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/UserSettings" activeClassName="active"><SettingsIcon /> &nbsp; User Settings</NavLink>
          </li>
          <li className="side-nav-item">
            <NavLink to="/Game Deverloper/Help" activeClassName="active"><InfoIcon /> &nbsp; Help & Support</NavLink>
          </li>
        </ul>
    
      <div className="bottom-sec">
        <LogOut />
      </div>

    </nav>
  );
}
