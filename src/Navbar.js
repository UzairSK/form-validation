import React, {useState} from 'react'
import './Navbar.css';
import {Link} from "react-router-dom";

function Navbar() {
    const [active, setActive] = useState(true);
    // activeTab object is a style object applied on conditional rendering i.e if a tab is clicked
   const activeTab= {
    color: '#8870C9',
    borderBottom: '2px solid #8870C9',
    animation: 'fadeIn linear 1s'
   };
    return (
        <div className="Navbar">
                <Link className="tab " style={active?activeTab:null} to="/" onClick={() => setActive(true)}>Form</Link>
                <Link className="tab " style={!active?activeTab:null} to="/table" onClick={() => setActive(false)}>Table</Link>
      </div>
    )
}

export default Navbar
