// client/src/components/Navbar/Navbar.js
import React from "react";
import "./Navbar.css"; // <-- Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div class="navbar">
        <a class="active" href="#about">
          HOME
        </a>
        <a href="#skills">Skills</a>
        <a href="#schedule">Schedule</a>
        <a href="#contact">Contact</a>
      </div>
      {/* Your navbar content goes here */}
    </nav>
  );
};

export default Navbar;
