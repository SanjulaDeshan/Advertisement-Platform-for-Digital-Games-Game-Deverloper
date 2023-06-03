import React from 'react'
import './logOut.css'

// Mui icons import
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogOut() {
  return (
    <div className='log-out'>
        <LogoutIcon />
        <span>Log Out</span>
    </div>
  );
}
