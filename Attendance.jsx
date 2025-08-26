import React, { useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const markAttendance = async () => {
    try {
      const response = await axios.post('http://localhost:3000/mark-attendance', { userId });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={markAttendance}>Mark Attendance</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Attendance;
