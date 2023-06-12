import { React, useEffect, useState } from "react";
import Navbar from '../../Globle_component/Navbar';
import SideNav from '../../Globle_component/SideNav';
import './user.css';
import axios from "axios";

//Import firebase files


export default function UserSettings() {

  const devId = "Qz1RiCIt50l1RsGT82JI";

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/developers/details/${devId}`).then((x) => {
      setUserDetails(x.data);
      // console.log(x.data);
    });


  }, []);

  return (
    <div className='user-settings'>

      <SideNav />
      <Navbar />

      <div className="user-settings-container">

        <div className="user-settings-topic"><h1>User Settings</h1></div>

        <table className="user-settings-table">


          <tbody key={userDetails.id} size="sm">
            <tr>
              <td>First Name</td>
              <td>{userDetails.fname}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{userDetails.lname}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td>{userDetails.email}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{userDetails.id}</td>
            </tr>
            <tr>
                <td>User Type</td>
                <td>{userDetails.user_type}</td>
              </tr>
          </tbody>



        </table>

      </div>
    </div>
  )
}
