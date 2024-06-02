import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/navbar.css"

export const Navbar = () => {
  

  
  
  return (
    <div className="navbar">
      <Link to="/saved">Recipes</Link>
      <Link to="/">Home</Link>
      <Link to="/add">Create Recipe</Link>
      
    </div>
  );
};