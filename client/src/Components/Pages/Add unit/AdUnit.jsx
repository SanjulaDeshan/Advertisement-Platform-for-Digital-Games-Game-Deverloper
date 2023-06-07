import { React, useEffect, useState } from "react";
import './adUnit.css'
import axios from "axios";

//Import globle component
import Navbar from '../../Globle_component/Navbar'
import SideNav from '../../Globle_component/SideNav'

//Import firebase files
import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";


export default function AdUnit() {

  const devId = "1qpo3PJy3826ycgCBwzv";
  const [adUnitDetails, setAdUnitDetails] = useState([]);
  const adUnitCollectionRef = collection(db, "AdUnitCollection");

  useEffect(() => {
    // onSnapshot(adUnitCollectionRef, (snapshot) => {
    //   setAdUnitDetails(
    //     snapshot.docs.map((doc) => {
    //       return {
    //         id: doc.id,
    //         viewng: false,
    //         ...doc.data(),
    //       };
    //     })
    //   );
    // });

    axios.get(`http://localhost:8000/api/developers/adUnits/${devId}`).then((x) => {
      setAdUnitDetails(x.data);
      console.log(x.data);
    });
  }, []);



  //Adding ad units via form

  const [popupActive, setPopupActive] = useState(false);

  const [form, setForm] = useState({
    AdUnit_Name: "",
    AdUnit_Type: "",
    Game_Id: ""
  });

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !form.AdUnit_Name ||
      !form.AdUnit_Type ||
      !form.Game_Id
    ) {
      alert("Please fill out all fields")
      return
    }

    addDoc(adUnitCollectionRef, form)

    setForm({
      AdUnit_Name: "",
      AdUnit_Type: "",
      Game_Id: ""
    })

    setPopupActive(false)
  }



  const removeData = (id) => {
    deleteDoc(doc(db, "AdUnitCollection", id));
  };


  return (
    <div className='ad-unit'>
      <SideNav />
      <Navbar />
      <div className="ad-unit-container">

        <div className="ad-unit-topic"><h1>Ad Unit</h1></div>

        <button className="ad-unit-btn" onClick={() => setPopupActive(!popupActive)}>Add Unit</button>

        {popupActive && <div className="popup">
          <div class="ad-unit-form-style">
            <h1>Adding AdUnit</h1>

            {/* https://www.sanwebe.com/2014/08/css-html-forms-designs */}

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                value={form.AdUnit_Name}
                name="field1"
                placeholder="Ad unit name"
                onChange={e => setForm({ ...form, AdUnit_Name: e.target.value })}
              />


              <input
                type="text"
                value={form.AdUnit_Type}
                name="field2"
                placeholder="Type of the ad unit"
                onChange={e => setForm({ ...form, AdUnit_Type: e.target.value })}
              />


              <input
                type="text"
                value={form.Game_Id}
                name="field3"
                placeholder="Game ID"
                onChange={e => setForm({ ...form, Game_Id: e.target.value })}
              />


              <input
                type="submit"
                value="Submit"
              />

            </form>
          </div>
        </div>}

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
              <td> <button className="delete-adunit" onClick={() => removeData(adUnitData.id)}>Delete</button> </td>
            </tr>
          ))}
        </table>


      </div>

    </div>
  )
}
