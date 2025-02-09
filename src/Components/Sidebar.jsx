import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing X icon for close

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Nav items with paths
  const navItems = [
    { name: "Home", path: "/" },
    { name: "SOS Alerts", path: "/sos-alerts" },
    { name: "Emergency Users", path: "/emergency-users" },
    { name: "SOS History", path: "/sos-history" },
    { name: "All Users", path: "/all-users" },
  ];
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); 
  };

  return (
    <>
      {/* Hamburger Icon (Only Visible on Mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(true)}>
        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button (Only in Mobile View) */}
        <div className="close-btn" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false); // Close sidebar on click (for mobile)
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
