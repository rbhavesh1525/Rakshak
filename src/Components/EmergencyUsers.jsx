import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const EmergencyUsers = () => {
  const [emergencyUsers, setEmergencyUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("all");

  useEffect(() => {
    const fetchEmergencyUsers = async () => {
      setIsLoading(true);
      try {
        const snapshot = await get(ref(database, "/emergencyusers"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const usersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setEmergencyUsers(usersArray);
          setFilteredUsers(usersArray);
        } else {
          setEmergencyUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error fetching emergency users:", error);
      }
      setIsLoading(false);
    };

    fetchEmergencyUsers();
  }, []);

  useEffect(() => {
    if (selectedPosition === "all") {
      setFilteredUsers(emergencyUsers);
    } else {
      setFilteredUsers(
        emergencyUsers.filter((user) => user.position === selectedPosition)
      );
    }
  }, [selectedPosition, emergencyUsers]);

  const handleFilterChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  return (
    <>
      <Sidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="emergency-container">
          <h2 className="heading">Emergency Users</h2>
          
          {/* Filter Dropdown */}
          <div className="filter-container">
            <label>Filter by Position: </label>
            <select value={selectedPosition} onChange={handleFilterChange}>
              <option value="all">All</option>
              {[...new Set(emergencyUsers.map((user) => user.position))].map(
                (position) => (
                  <option key={position} value={position}>{position}</option>
                )
              )}
            </select>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Position</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.contact}</td>
                      <td>{user.position}</td>
                      <td>{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No Emergency Users Found</p>
          )}
        </div>
      )}
    </>
  );
};

export default EmergencyUsers;
