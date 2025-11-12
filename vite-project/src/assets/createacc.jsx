import React, { useState } from 'react';

// Define the URL for your Express backend endpoint
const BACKEND_URL = 'http://localhost:3000/addDetail'; 

function Createacc() {
  // 1. Initialize state for all form fields
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''   // ✅ changed from create_new_password to password
  });
  const [message, setMessage] = useState(''); // For status messages

  // 2. Handle input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    setMessage('Sending data...');

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the state data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Registration successful! ✅');
        console.log('Success:', result);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message || 'Server error'}. ❌`);
        console.error('Error Response:', errorData);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}. ⚠️`);
      console.error('Network Error:', error);
    }
  };

  // 4. Render the form
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br/><br/>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br/><br/>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br/><br/>

        {/* ✅ Password Input */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br/><br/>

        <button type="submit">Register User</button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
}

export default Createacc;