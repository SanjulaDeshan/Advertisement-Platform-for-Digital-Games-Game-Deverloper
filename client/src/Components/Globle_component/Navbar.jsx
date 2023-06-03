import React, { useState } from 'react';
import "./navbar.css";


export default function Navbar() {

  return (
    <div className="nav">
      
      <div className="top-nav-item">Home</div>
      <div className="top-nav-item">About</div>
      <div className="top-nav-item">Contact</div>
      <div className="top-nav-item">Notification</div>
      
    </div>
  );
}
































// const [showPopup, setShowPopup] = useState(false);

//   function handleOpenPopup() {
//     setShowPopup(true);
//   }

//   function handleClosePopup() {
//     setShowPopup(false);
//   }

//  <div>
//       <div onClick={handleOpenPopup} className="top-nav-item">Notification</div>
      
//       {showPopup && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onClick={handleClosePopup}
//         >
//           <div
//             style={{
//               backgroundColor: '#fff',
//               padding: '1rem',
//               borderRadius: '0.5rem',
//               boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
//               textAlign: 'center',
//             }}
//             onClick={(event) => event.stopPropagation()}
//           >
//             <h2>Popup Title</h2>
//             <p>This is the content of the popup.</p>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div> 