import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './logo.png';

function Nav() {

  return (
    <nav>
        <div>
        </div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/start">Start</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li>Login</li>
            
        </ul>
    </nav>
  )
}

export default Nav;
