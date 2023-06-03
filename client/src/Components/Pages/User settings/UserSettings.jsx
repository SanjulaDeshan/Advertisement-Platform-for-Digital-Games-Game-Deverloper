import { React, useEffect, useState }  from "react";
import Navbar from '../../Globle_component/Navbar';
import SideNav from '../../Globle_component/SideNav';
import './user.css';

//Import firebase files
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config";


export default function UserSettings() {

  const [gameDeveAccountDetails, setGameDeveAccountDetails] = useState([]);

  const gameDeveCreateAccountRef = collection(db, "gameDeveCreateAccount");

  const q = query(gameDeveCreateAccountRef, where("ID", "==", "8CURIZM4QJNw9lwjuW5i"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setGameDeveAccountDetails(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewng: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className='user-settings'>

      <SideNav />
      <Navbar />

      <div className="user-settings-container">

        <div className="user-settings-topic"><h1>User Settings</h1></div>

        <table className="user-settings-table">
          
            {gameDeveAccountDetails.map((gameDeveAccountData) => (
              <tbody  key={gameDeveAccountData.id} size="sm">
                <tr>
                  <td>First Name</td>
                  <td>{gameDeveAccountData.FirstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{gameDeveAccountData.LastName}</td>
                </tr>
                <tr>
                  <td>Email Address</td>
                  <td>{gameDeveAccountData.EmailAddress}</td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>{gameDeveAccountData.ID}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{gameDeveAccountData.Address}</td>
                </tr>
                <tr>
                  <td>Contact Number</td>
                  <td>{gameDeveAccountData.ContactNumber}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>{gameDeveAccountData.PaymentMethod}</td>
                </tr>
              </tbody>
            ))}
          

        </table>

      </div>
    </div>
  )
}
