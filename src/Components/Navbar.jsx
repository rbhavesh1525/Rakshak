import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    <nav className="navbar">
      <div className="container">
       <Link to="/" className="logo"> <h1 >Rakshak</h1></Link>

        {/* Navbar Hamburger (☰ for open, ✖ for close) */}
        <button className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links - Opens in Small Screen */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/sos-alerts" className="nav-link">SOS Alerts</Link></li>
          <li><Link to="/sos-history" className="nav-link">SOS History</Link></li>
          <li><Link to="/emergency-users" className="nav-link">Emergency Users</Link></li>
          <li><Link to="/all-users" className="nav-link">All Users</Link></li>
        </ul>

        {/* Logout/Login Button */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
