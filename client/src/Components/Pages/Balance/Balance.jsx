import { React, useEffect, useState } from "react";
import "./balance.css";
import axios from "axios";

//Import firebase files
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";
import SideNav from "../../Globle_component/SideNav";
import Navbar from "../../Globle_component/Navbar";

export default function Balance() {
  const [drawingsDetails, setDrawingsDetails] = useState([]);
  const drawingsRef = collection(db, "drawings");

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/developers/dashboard").then((x) => {
      setDashboard(x.data);
    });

    axios.get("http://localhost:8000/api/developers/withdrawals").then((x) => {
      setDrawingsDetails(x.data);
    });
  }, []);

  return (
    <div className="balance">
      <SideNav />
      <Navbar />
      <div className="balance-container">
        <div className="balance-topic">
          <h1>Balance</h1>
        </div>

        <div className="balance-box-container">
          <div className="balance-box-raw">
            <div className="balance-box">
              <h3>Today</h3>
              <p>$ {dashboard.todaysIncome}</p>
            </div>

            <div className="balance-box">
              <h3>Last 7 days</h3>
              <p>$ {dashboard.sevenDayIncome}</p>
            </div>

            <div className="balance-box">
              <h3>Last 28 days</h3>
              <p>$ {dashboard.monthIncome}</p>
            </div>

            <div className="balance-box">
              <h3>LIfe Time</h3>
              <p>$ {dashboard.totalIncome}</p>
            </div>
          </div>
        </div>

        <div className="balance-topic">
          <h2>Drawing history</h2>
        </div>

        <table className="balance-table">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Current balanace</th>
          </tr>
          {drawingsDetails.map((drawingData) => (
            <tr key={drawingData.id}>
              <td>{drawingData.id}</td>
              <td>{drawingData.time}</td>
              <td>{drawingData.amount}</td>
              {/* <td>{drawingData.current_balance}</td> */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
