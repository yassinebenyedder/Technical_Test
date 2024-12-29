import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './AdminStyles.css';

function AdminsTable({ onDelete }) {
  const [admins, setAdmins] = useState([]);
  const [cookies] = useCookies(['access_token']);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = cookies.access_token;
      if (!token) return console.error("No token found");

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/alladmins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, [cookies.access_token]);

  const handleDelete = async (id) => {
    const token = cookies.access_token;
    if (!token) return console.error("No token found");

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/admin/deleteadmin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(admins.filter(admin => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="adminstable">
      {admins.map(admin => (
        <div key={admin._id} className="adminCard">
          <h3>{admin.username}</h3>
          <p>{admin.email}</p>
          <button onClick={() => handleDelete(admin._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminsTable;
