import { React, useEffect, useState } from "react";
import "./games.css";
import axios from "axios";

//Import globle component
import Navbar from "../../Globle_component/Navbar";
import SideNav from "../../Globle_component/SideNav";


export default function Games() {

  const [ownGames, setOwnGames] = useState([]);

  const [reload, setReload] = useState(false);

  const devId = "Mt7f3EKL7qTVVtzjoqo2";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/developers/${devId}`).then((x) => {
      setOwnGames(x.data);
      console.log(x.data);
    });
  }, [reload]);

  const [popupActive, setPopupActive] = useState(false);

  const [form, setForm] = useState({
    ad_cost_rate: 0,
    ad_units: ["ddd", "ddd"],
    game_icon: "dddd",
    game_name: "",
    game_type: "ddd",
    platform: "",
    published_date: "dddd",
    rank: 0,
    status: "dd"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // if(form.Name.length === 0 ){
    //   alert("Name must be filled")
    //   return
    // }

    if (form.name === "" || form.platform === "") {
      alert("Please fill out all fields");
      return;
    }
    // addDoc(gameDataCollectionRef, form);
    axios
      .put(`http://localhost:8000/api/games/${devId}`, {
        // ad_cost_rate: 2.5,
        // ad_units: ["Hit22IjjmV2BrF6tiYFG", "niSBRhPkYVxTpwh9oAhI", "PFt9OEPOHXHrjam10sZT"],
        // game_icon: "sssss",
        // game_name: "Test Game",
        // game_type: "oEZRAx7BGkAbZsRuLC7q",
        // platform: "Ios",
        // published_date: "June 3, 2023 at 6:52:18 PM UTC+5:30",
        // rank: 19,
        // status: "approved"
        // ad_cost_rate: form.ad_cost_rate,
        // ad_units: form.ad_units,
        // game_icon: form.game_icon,
        game_name: form.game_name,
        // game_type: form.type,
        platform: form.platform,
        // published_date: form.published_date,
        // rank: form.rank,
        // status: form.status
        user_id: devId
      })
      .then((response) => {
        setReload((x) => !x);
      })
      .catch((error) => {
        console.error(error);
      });

    setForm({
      ad_cost_rate: 0,
      ad_units: [],
      game_icon: "",
      game_name: "",
      game_type: "",
      platform: "",
      published_date: "",
      rank: 0,
      status: ""
    });

    setPopupActive(false);
  };

  const removeData = (devId, gameId) => {
    // deleteDoc(doc(db, "GamesCollection", id));
    axios
      .delete(`http://localhost:8000/api/games/${devId}/${gameId}`)
      .then(() => {
        // console.log(reload);
        setReload((x) => !x);
        // console.log(reload);
      });
  };

  return (
    <div className="games">
      <SideNav />
      <Navbar />
      <div className="games-container">
        <div className="games-topic">
          <h1>Games</h1>
        </div>

        <button
          className="games-btn"
          onClick={() => setPopupActive(!popupActive)}
        >
          Add Game
        </button>

        {popupActive && (
          <div className="popup">
            <div class="games-form-style">
              <h1>Adding Games</h1>

              {/* https://www.sanwebe.com/2014/08/css-html-forms-designs */}

              <form onSubmit={handleSubmit}>
                {/* <input
                  type="text"
                  value={form.Status}
                  name="field5"
                  placeholder="Status"
                  onChange={(e) => setForm({ ...form, Status: e.target.value })}
                /> */}
                <input
                  type="text"
                  value={form.game_name}
                  name="field1"
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, game_name: e.target.value })}
                />

                {/* <input
                  type="text"
                  value={form.Owner_ID}
                  name="field2"
                  placeholder="Owner ID"
                  onChange={(e) =>
                    setForm({ ...form, Owner_ID: e.target.value })
                  }
                /> */}

                {/* <input
                  type="text"
                  value={form.Platform}
                  name="field3"
                  placeholder="Platform"
                  onChange={(e) =>
                    setForm({ ...form, Platform: e.target.value })
                  }
                /> */}
                <select
                  value={form.platform}
                  name="field3"
                  onChange={(e) =>
                    setForm({ ...form, platform: e.target.value })
                  }
                >
                  <option value="">Platform</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                </select>
                {/* <input
                  type="number"
                  value={form.rank}
                  name="field4"
                  placeholder="Rank"
                  onChange={(e) =>
                    setForm({ ...form, rank: parseInt(e.target.value) })
                  }
                /> */}

                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )}

        <table className="games-table">
          <tr>
            <th>Game ID</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Delete</th>
          </tr>
          {ownGames.map((gameData, i) => (
            <tr
              key={i}
              onClick={() => {
                console.log(gameData);

                console.log("Clicked " + i);
              }}
            >
              <td>{gameData.game_id}</td>
              <td>{gameData.game_name}</td>
              <td>{gameData.platform}</td>
              <td>
                {" "}
                <button
                  className="delete-games"
                  onClick={() => removeData(devId, gameData.id)}
                >
                  Delete
                </button>{" "}
              </td>

              {/* 
                  Platform
                */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
