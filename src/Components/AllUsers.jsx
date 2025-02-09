import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filter, setFilter] = useState("name");
  const [userCount, setUserCount] = useState(0); 
  const [isLoading, setIsLoading] = useState(true); // Set initial state to true

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Start loading
      try {
        const snapshot = await get(ref(database, "/Users"));
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsers(userData);
          setFilteredUsers(userData);
          setUserCount(Object.keys(userData).length);
        } else {
          setUsers(null);
          setFilteredUsers(null);
          setUserCount(0);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers(null);
        setFilteredUsers(null);
        setUserCount(0);
      }
      setIsLoading(false); // Stop loading after fetching data
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      let sortedUsers = Object.entries(users);

      if (filter === "name") {
        sortedUsers.sort(([_, userA], [__, userB]) => 
          (userA.name || "").localeCompare(userB.name || "") // Handle missing names
        );
      }

      setFilteredUsers(Object.fromEntries(sortedUsers));
    }
  }, [filter, users]);

  return (
    <>
      <Sidebar />
      {isLoading ? (
        <Loader /> // Show loader while fetching data
      ) : (
        <div className="dashboard-container">
          <h2 className="title">All Users ({userCount})</h2>
          <div className="filter-container">
            <label>Filter by: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Emergency Contact 1</th>
                  <th>Emergency Contact 2</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers ? (
                  Object.entries(filteredUsers).map(([id, user]) => (
                    <tr key={id}>
                      <td>{user.name}</td>
                      <td>{user.number}</td>
                      <td>{user.emergencyContact1}</td>
                      <td>{user.emergencyContact2}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-users">⚠️ No Users Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;
