import {React, useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  

  return (
    <nav className="nav">
      <div className="left">
        <Link to= {user ? "/home" : "/"} className="logo">Blog Editor</Link>
        <Link to= {user ? "/home" : "/"}  className="link">Home</Link>
        {user && (
          <>
            <Link to="/published-blogs" className="link">Published</Link>
            <Link to="/drafts-blogs" className="link">Drafts</Link>
          </>
        )}
      </div>
      <div className="right">
        {user ? (
            <>
                <span className="username">{user.username}</span>
                <button onClick={handleLogout} className="logout">Logout</button>
            </>
        ) : (
          <Link to="/signup" className="signup">Sign Up</Link>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
