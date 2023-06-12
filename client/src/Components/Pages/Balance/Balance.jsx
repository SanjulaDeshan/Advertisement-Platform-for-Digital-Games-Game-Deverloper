import { React, useEffect, useState } from "react";
import "./balance.css";
import axios from "axios";

import SideNav from "../../Globle_component/SideNav";
import Navbar from "../../Globle_component/Navbar";

export default function Balance() {
  const [drawingsDetails, setDrawingsDetails] = useState([]);

  const [revenue, setRevenue] = useState({});

  const devId = "Mt7f3EKL7qTVVtzjoqo2";

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/games/revenue", {
        dev_id: devId,
      })
      .then((x) => {
        console.log(x.data);
        setRevenue(x.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.get("http://localhost:8000/api/developers/withdrawals").then((x) => {
    //   setDrawingsDetails(x.data);
    // });
    axios.get(`http://localhost:8000/api/developers/trans/${devId}`).then((x) => {
      setDrawingsDetails(x.data);
      console.log(x.data);
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
              <p>$ {revenue.daily_revenue}</p>
            </div>

            <div className="balance-box">
              <h3>Last 7 day</h3>
              <p>$ {revenue.weekly_revenue}</p>
            </div>

            <div className="balance-box">
              <h3>Last 30 days</h3>
              <p>$ {revenue.monthly_revenue}</p>
            </div>

            <div className="balance-box">
              <h3>Total AdUnits</h3>
              <p> {revenue.nAds}</p>
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
              <td>{drawingData.trans_id}</td>
              <td>{new Date(drawingData.requested_date._seconds * 1000).toLocaleString()}</td>
              <td>{drawingData.withdrowal_amount}</td>
              <td>{drawingData.current_balance}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
