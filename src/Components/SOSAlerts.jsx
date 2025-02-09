import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const SOSAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("date"); // Default filter is by date

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      try {
        const snapshot = await get(ref(database, "/sos_alerts"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const alertsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAlerts(alertsArray);
          setFilteredAlerts(alertsArray);
        } else {
          setAlerts([]);
          setFilteredAlerts([]);
        }
      } catch (error) {
        console.error("Error fetching SOS alerts:", error);
      }
      setIsLoading(false);
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    let sortedAlerts = [...alerts];

    if (filter === "date") {
      sortedAlerts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (filter === "time") {
      sortedAlerts.sort((a, b) => {
        const timeA = new Date(a.timestamp).getHours() * 60 + new Date(a.timestamp).getMinutes();
        const timeB = new Date(b.timestamp).getHours() * 60 + new Date(b.timestamp).getMinutes();
        return timeA - timeB;
      });
    }

    setFilteredAlerts(sortedAlerts);
  }, [filter, alerts]);

  return (
    <>
      <Sidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="sos-alerts-container">
          <h2 className="heading">SOS Alerts</h2>
          <div className="filter-container">
            <label>Filter by: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="date">Date</option>
              <option value="time">Time</option>
            </select>
          </div>
          {filteredAlerts.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.userId}</td>
                      <td>{alert.latitude}</td>
                      <td>{alert.longitude}</td>
                      <td>{new Date(alert.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No SOS Alerts Found</p>
          )}
        </div>
      )}
    </>
  );
};

export default SOSAlerts;
