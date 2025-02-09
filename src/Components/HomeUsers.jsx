import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import Loader from "./Loader"

const HomeUsers = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filter, setFilter] = useState("id");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(database, "/Users"));
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsers(userData);
          setFilteredUsers(userData);
        } else {
          setUsers(null);
          setFilteredUsers(null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers(null);
        setFilteredUsers(null);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);



  return (
    <>
    {loading ?(
      <Loader />
    ):(
    <div className="home-dashboard-container">
      <h2 className="home-title">All Users</h2>
      <div className="home-filter-container">
        <label>Filter by: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="id">Names</option>
          <option value="time">Emergency Number</option>
        </select>
      </div>
      <div className="home-table-wrapper">
        <table className="home-users-table">
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
                <td colSpan="4" className="home-no-users">⚠️ No Users Found!</td>
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

export default HomeUsers;