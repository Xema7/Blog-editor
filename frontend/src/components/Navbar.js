import {React, useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to= {user ? "/home" : "/"} style={styles.logo}>Blog Editor</Link>
        <Link to= {user ? "/home" : "/"}  style={styles.link}>Home</Link>
        {user && (
          <>
            <Link to="/published-blogs" style={styles.link}>Published</Link>
            <Link to="/drafts-blogs" style={styles.link}>Drafts</Link>
          </>
        )}
      </div>
      <div style={styles.right}>
        {user ? (
            <>
                <span style={styles.username}>{user.username}</span>
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </>
        ) : (
          <Link to="/register" style={styles.button}>Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#222",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#fff",
    textDecoration: "none",
    marginRight: "1.5rem",
  },
  link: {
    marginRight: "1rem",
    color: "#ccc",
    textDecoration: "none",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  username: {
    display: "flex",
    color: "#ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#fff",
    color: "#222",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
  left: {
    display: "flex",
    alignItems: "center",
  }
};

export default Navbar;
