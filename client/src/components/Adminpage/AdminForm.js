import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './AdminStyles.css';

function AdminForm({ setAdmins }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies] = useCookies(['access_token']);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.access_token;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/createadmin`,
        { username, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmins(prev => [...prev, response.data]);
    } catch (error) {
      setErrorMessage("Failed to create admin");
      console.error("Error creating admin:", error);
    }
  };

  return (
    <form className="adminForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <button type="submit">Add Admin</button>
    </form>
  );
}

export default AdminForm;
