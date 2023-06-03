import { React, useEffect, useState } from "react";
import "./games.css";
import axios from "axios";

//Import globle component
import Navbar from "../../Globle_component/Navbar";
import SideNav from "../../Globle_component/SideNav";

//Import firebase files
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

export default function Games() {
  const [gameDetails, setGameDetails] = useState([]);

  const gameDataCollectionRef = collection(db, "GamesCollection");
  const [ownGames, setOwnGames] = useState([]);

  const [reload, setReload] = useState(false);

  const devId = "3yyBzU23QUwAXU2mdh51";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/developers/${devId}`).then((x) => {
      setOwnGames(x.data);
      console.log(x.data);
    });
  }, [reload]);

  const [popupActive, setPopupActive] = useState(false);

  const [form, setForm] = useState({
    Status: "",
    Name: "",
    Owner_ID: "",
    Platform: "",
    rank: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // if(form.Name.length === 0 ){
    //   alert("Name must be filled")
    //   return
    // }

    if (!form.Name || !form.Owner_ID || !form.Platform) {
      alert("Please fill out all fields");
      return;
    }

    // addDoc(gameDataCollectionRef, form);

    axios
      .put("http://localhost:8000/api/games/1D7haD1qnqmbxvkLaqNX", {
        Status: form.Status,
        ad_cost_rate: 2.5,
        game_icon: "",
        game_name: form.Name,
        game_type: "93FrWQCWdWqUDMNhp1eM",
        platform: form.Platform,
        rank: form.rank,
      })
      .then((response) => {
        setReload((x) => !x);
      })
      .catch((error) => {
        console.error(error);
      });

    setForm({
      Status: "",
      Name: "",
      Owner_ID: "",
      Platform: "",
      rank: 0,
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
                <input
                  type="text"
                  value={form.Status}
                  name="field5"
                  placeholder="Status"
                  onChange={(e) => setForm({ ...form, Status: e.target.value })}
                />
                <input
                  type="text"
                  value={form.Name}
                  name="field1"
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, Name: e.target.value })}
                />

                <input
                  type="text"
                  value={form.Owner_ID}
                  name="field2"
                  placeholder="Owner ID"
                  onChange={(e) =>
                    setForm({ ...form, Owner_ID: e.target.value })
                  }
                />

                <input
                  type="text"
                  value={form.Platform}
                  name="field3"
                  placeholder="Platform"
                  onChange={(e) =>
                    setForm({ ...form, Platform: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={form.rank}
                  name="field4"
                  placeholder="Rank"
                  onChange={(e) =>
                    setForm({ ...form, rank: parseInt(e.target.value) })
                  }
                />

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
