import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomeUsers from "./HomeUsers";
import AllUsers from "./AllUsers"; 
import { BellRing, History, Users, UserCheck } from "lucide-react"; // Icons
import Loader from "./Loader";

const Home = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  console.log(userCount);

  // Data for the cards
  const cards = [
    { title: "SOS Alerts", path: "/sos-alerts", icon: <BellRing />, description: "View active SOS alerts.", total: 31 },
    { title: "SOS History", path: "/sos-history", icon: <History />, description: "Check past SOS alerts.", total: 31 },
    { title: "Emergency Users", path: "/emergency-users", icon: <Users />, description: "Manage emergency contacts.", total: 10 },
    { title: "All Users", path: "/all-users", icon: <UserCheck />, description: "View and manage all users.", total: 2 },
  ];

  return (
    <>
      <Sidebar />
      {isLoading ?(
        <Loader />
      ) : (

      
      <div className="home-container">
        <div className="card-container">
          {cards.map((card, index) => (
            <div className="card" key={index} onClick={() => navigate(card.path)}>
              <span className="total-users">{card.total} users</span>
              <div className="card-content">
                <div className="card-icon">{card.icon}</div>
                <div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      <HomeUsers />
    
    </>
  );
};

export default Home;
