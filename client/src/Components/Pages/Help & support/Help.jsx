import React from 'react'
import './help.css';

//Import globle components
import Navbar from '../../Globle_component/Navbar';
import SideNav from '../../Globle_component/SideNav';


export default function Help() {
  return (
    <div className='help'>
      <SideNav />
      <Navbar />
      <div className="help-container">

        <div className="help-topic"><h1>Help & Support</h1></div>

        <div className="box-column-hs">

            <div className="box-hs">
              <h3>Recover a forgotten username or password</h3>
              <p>
                Use the complaint section or attempt to retrieve your password on your given mail if you've forgotten your AdSense username or
                password or are having trouble checking in. This will assist you get back into your account.
              </p>
            </div>

            <div className="box-hs">
              <h3>Privacy and security</h3>
              <p>
                Your online account's information is securely collected and stored by us. In order to deliver the most pertinent content adverts on
                your games, we will also occasionally scan your games.
                
                A user's information could also be collected by VOASIZ (PVT) LTD.
                
                The efficacy of an advertisement may be evaluated using data like this, but no personally identifiable information about your visitors
                will be linked to it.
              </p>
            </div>

            <div className="box-hs">
              <h3>How can I help make this platform better?</h3>
              <p>
              One important part of developing responsibly is expanding participation, so more people can experience this, provide feedback, and help Bard improve. 
              You can rate responses as good or bad and send feedback using our email system.
              </p>
            </div>

            <div className="box-hs">
              <h3>Who can use Game deverloper?</h3>
              <p>
              You must have a private Google Account that you control on your own in order to utilize this. 
              So, you are unable to utilize a Google Account that is under the supervision of a parent, legal guardian, or Google Workspace admin. And you have to be 18 or older. 
              Currently, this platform can be used by game developers who require adverts on their games. 
              </p>
            </div>

          </div>

      </div>
        
    </div>
  )
}
