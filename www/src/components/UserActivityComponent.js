import React, { useState, useEffect } from 'react';
import UserDataComponent from './UserDataComponent';

function UserActivityComponent({ answer, user }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showUserData, setShowUserData] = useState(false);

  useEffect(() => {
    const { REACT_APP_SERVER_HOST: host, REACT_APP_SERVER_PORT: port } = process.env;
    fetch(`${host}:${port}/user`) // Replace with your actual API URL
      .then(response => response.json())
      .then(data => {
        setUsers(data.result);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedUserId(event.target.value);
    setShowUserData(false);
  };

  const handleSubmit = () => {
    if (selectedUserId) {
      setShowUserData(true);
    }
  };

  return (
    <div className="userActivity">
      <div>
        <h2>Select a user to view their activity</h2>
        <select value={selectedUserId} onChange={handleDropdownChange}>
          <option value="">Select a User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Show Data</button>
      </div>
      {showUserData && <UserDataComponent userId={selectedUserId} />}
    </div>
  );
}

export default UserActivityComponent;