import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AllUsers from "./Components/AllUsers";
import SOSAlerts from "./Components/SOSAlerts";
import SOSHistory from "./Components/SOSHistory";
import EmergencyUsers from "./Components/EmergencyUsers";
import Navbar from "./Components/Navbar"; // Optional: Navbar for navigation
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Sidebar from "./Components/Sidebar";
import HomeUsers from "./Components/HomeUsers";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation bar for easy navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/sos-alerts" element={<SOSAlerts />} />
        <Route path="/sos-history" element={<SOSHistory />} />
        <Route path="/emergency-users" element={<EmergencyUsers />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/homeusers" element={<HomeUsers/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
