import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";

const NavBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        minWidth: "100%",
        height: "10vh",
        backgroundColor: "lightgray",
      }}
    >
      <Link style={{ textDecoration: "none", fontSize: "2rem" }} to="/">
        WorkoutBuddy
      </Link>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>{user?.email}</span>
        {user && (
          <div>
            <button
              style={{
                backgroundColor: "red",
                padding: "6px 12px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {!user && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
            className="menu"
          >
            <Link style={{ textDecoration: "none" }} to="/user/signup">
              Sign Up
            </Link>
            <Link style={{ textDecoration: "none" }} to="/user/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
