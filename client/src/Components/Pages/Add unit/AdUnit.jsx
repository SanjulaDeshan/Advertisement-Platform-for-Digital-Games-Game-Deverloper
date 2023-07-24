import { React, useEffect, useState } from "react";
import "./adUnit.css";
import axios from "axios";

//Import globle component
import Navbar from "../../Globle_component/Navbar";
import SideNav from "../../Globle_component/SideNav";

//Import firebase files

export default function AdUnit() {
  const devId = "o4QAcesrFl5FNFnlnamb";

  const [adUnitDetails, setAdUnitDetails] = useState([]);
  const [ownGames, setOwnGames] = useState([]);
  const [adTypes, setAdTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/developers/adUnits/${devId}`)
      .then((x) => {
        setAdUnitDetails(x.data);
        // console.log(x.data);
      });
    axios.get(`http://localhost:8000/api/developers/${devId}`).then((x) => {
      setOwnGames(x.data);
      console.log(x.data);
    });
    axios.get(`http://localhost:8000/api/games/adtypes`).then((x) => {
      setAdTypes(x.data);
      // console.log(x.data);
    });
  }, []);

  //Adding ad units via form

  const [popupActive, setPopupActive] = useState(false);

  const [form, setForm] = useState({
    AdUnit_Name: "",
    AdUnit_Type: "",
    Game_Id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("running");
    if (form.AdUnit_Name === "") {
      alert("Please fill out all fields");
      return;
    }
    // console.log(form);

    axios
      .post(`http://localhost:8000/api/games/addadunit`, {
        ad_unit_name: form.AdUnit_Name,
        ad_unit_type: form.AdUnit_Type,
        game_id: form.Game_Id,
      })
      .then((res) => {
        axios
          .get(`http://localhost:8000/api/developers/adUnits/${devId}`)
          .then((x) => {
            setAdUnitDetails(x.data);
          });
      });

    setForm({
      AdUnit_Name: "",
      AdUnit_Type: "",
      Game_Id: "",
    });

    setPopupActive(false);
  };

  const removeData = async (id) => {
    if (window.confirm('Do you want to delete this ?')) {
      // deleteDoc(doc(db, "AdUnitCollection", id));
      // return;
      // console.log(id);

      // setAdUnitDetails(adUnitDetails.filter((ad) => ad.id !== id));

      const game = ownGames.filter((elem) => elem.ad_units.includes(id));
      // console.log(game);

      console.log({ game_id: game[0].game_id, ad_unit_id: id });

      axios
        .post(`http://localhost:8000/api/games/deleteadunit`, {
          game_id: game[0].game_id,
          ad_unit_id: id,
        })
        .then((res) => {
          console.log("deleted");
          console.log(res.data);
          // axios.get(`http://localhost:8000/api/developers/adUnits/${devId}`).then((x) => {
          //   setAdUnitDetails(x.data);
          // })
        });

      const deleteAdUnit = await axios.post(
        `http://localhost:8000/api/games/deleteadunit`,
        { game_id: game[0].game_id, ad_unit_id: id }
      );

      const reloadAdUnit = await axios.get(`http://localhost:8000/api/developers/adUnits/${devId}`);
      setAdUnitDetails(reloadAdUnit.data);
    }
  };

  return (
    <div className="ad-unit">
      <SideNav />
      <Navbar />
      <div className="ad-unit-container">
        <div className="ad-unit-topic">
          <h1>Ad Unit</h1>
        </div>

        <button
          className="ad-unit-btn"
          onClick={() => setPopupActive(!popupActive)}
        >
          Add Unit
        </button>

        {popupActive && (
          <div className="popup">
            <div class="ad-unit-form-style">
              <h1>Adding AdUnit</h1>

              {/* https://www.sanwebe.com/2014/08/css-html-forms-designs */}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={form.AdUnit_Name}
                  name="field1"
                  placeholder="Ad unit name"
                  onChange={(e) =>
                    setForm({ ...form, AdUnit_Name: e.target.value })
                  }
                />

                {/* <input
                type="text"
                value={form.AdUnit_Type}
                name="field2"
                placeholder="Type of the ad unit"
                onChange={e => setForm({ ...form, AdUnit_Type: e.target.value })}
              /> */}

                <select
                  value={form.AdUnit_Type}
                  name="field2"
                  onChange={(e) =>
                    setForm({ ...form, AdUnit_Type: e.target.value })
                  }
                >
                  <option value="">Type of the ad unit</option>
                  {adTypes.map((adType) => (
                    <option value={adType.id}>{adType.ad_type}</option>
                  ))}
                </select>

                <select
                  value={form.Game_Id}
                  name="field3"
                  onChange={(e) =>
                    setForm({ ...form, Game_Id: e.target.value })
                  }
                >
                  <option value="">Game ID</option>
                  {ownGames.map((game) => (
                    <option value={game.game_id}>{game.game_name}</option>
                  ))}
                </select>
                <p>Game ID: {form.Game_Id} </p>
                {/* <input
                type="text"
                value={form.Game_Id}
                name="field3"
                placeholder="Game ID"
                onChange={e => setForm({ ...form, Game_Id: e.target.value })}
              /> */}

                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )}

        <table className="ad-unit-table">
          <tr>
            <th>Ad unit Name</th>
            <th>Ad unit Type</th>
            <th>Ad unit ID</th>
            <th>Delete Ad unit</th>
          </tr>
          {adUnitDetails.map((adUnitData, i) => (
            <tr key={i}>
              <td>{adUnitData.ad_unit_name}</td>
              <td>{adUnitData.ad_unit_type}</td>
              <td>{adUnitData.id}</td>
              <td>
                {" "}
                <button
                  className="delete-adunit"
                  onClick={() => removeData(adUnitData.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
