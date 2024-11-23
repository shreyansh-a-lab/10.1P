import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <nav className="nav">
        <a href="#post">Post</a>
        <a href="#login">Login</a>
      </nav>
    </div>
  );
}

export default Header;