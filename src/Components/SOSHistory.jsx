import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const SOSHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("date");

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(database, "/sos_history"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const historyArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setHistory(historyArray);
          setFilteredHistory(historyArray);
        } else {
          setHistory([]);
          setFilteredHistory([]);
        }
      } catch (error) {
        console.error("Error fetching SOS history:", error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    let sortedHistory = [...history];

    if (filter === "date") {
      sortedHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (filter === "time") {
      sortedHistory.sort((a, b) => {
        const timeA = new Date(a.timestamp).getHours() * 60 + new Date(a.timestamp).getMinutes();
        const timeB = new Date(b.timestamp).getHours() * 60 + new Date(b.timestamp).getMinutes();
        return timeA - timeB;
      });
    }

    setFilteredHistory(sortedHistory);
  }, [filter, history]);

  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <div className="sos-container">
          <h2 className="heading">SOS History</h2>
          <div className="filter-container">
            <label>Filter by: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="date">Date</option>
              <option value="time">Time</option>
            </select>
          </div>
          {filteredHistory.length > 0 ? (
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
                  {filteredHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.userId}</td>
                      <td>{entry.latitude}</td>
                      <td>{entry.longitude}</td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No SOS History Found</p>
          )}
        </div>
      )}
    </>
  );
};

export default SOSHistory;
