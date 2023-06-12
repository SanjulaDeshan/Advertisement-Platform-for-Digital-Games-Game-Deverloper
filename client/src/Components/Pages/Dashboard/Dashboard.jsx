import { React, useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";

//Import globle component
import SideNav from "../../Globle_component/SideNav";
import Navbar from "../../Globle_component/Navbar";

export default function Dashboard() {
  const [gameDetails, setGameDetails] = useState([]);
  const [ownGames, setOwnGames] = useState([]);
  const [revenue, setRevenue] = useState({});

  const devId = "Qz1RiCIt50l1RsGT82JI";

  useEffect(() => {
    axios.get("http://localhost:8000/api/games").then((x) => {
      setGameDetails(x.data);
      console.log(x.data)
    });

    axios.get(`http://localhost:8000/api/developers/${devId}`).then((x) => {
      setOwnGames(x.data);
    });

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
  }, []);

  return (
    <div className="dashboard">
      <SideNav />
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-topic">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-box-container">
          <div className="dashboard-box-raw">
            <div className="dashboard-box">
              <h3>Today</h3>
              <p>$ {revenue.daily_revenue}</p>
            </div>

            <div className="dashboard-box">
              <h3>Last 7 day</h3>
              <p>$ {revenue.weekly_revenue}</p>
            </div>

            <div className="dashboard-box">
              <h3>Last 30 days</h3>
              <p>$ {revenue.monthly_revenue}</p>
            </div>
          </div>

          <div className="dashboard-box-raw">
            <div className="dashboard-box">
              <h3>Daily Views</h3>
              <p>{revenue.daily_views}</p>
            </div>

            <div className="dashboard-box">
              <h3>Weekly Views</h3>
              <p>{revenue.weekly_views}</p>
            </div>

            <div className="dashboard-box">
              <h3>Monthly views</h3>
              <p>{revenue.monthly_views}</p>
            </div>
          </div>

          <div className="dashboard-box-raw">
            <div className="dashboard-box">
              <h3>Total Games</h3>
              <p>{ownGames.length}</p>
            </div>

            <div className="dashboard-box">
              <h3>Total AdUnits</h3>
              <p> {revenue.nAds}</p>
            </div>

            <div className="dashboard-box">
              <h3>Top AdUnit</h3>
              <p>{revenue.mostReveAd}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-topic">
          <h2>Top Games</h2>
        </div>

        <table className="dashboard-table">
          <tr>
            <th>Game ID</th>
            <th>Game Name</th>
            <th>Platform</th>
            <th>Rank</th>
          </tr>
          {gameDetails.map((gameData) => (
            <tr key={gameData.id}>
              <td>{gameData.id}</td>
              <td>{gameData.game_name}</td>
              <td>{gameData.platform}</td>
              <td>{gameData.rank}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
