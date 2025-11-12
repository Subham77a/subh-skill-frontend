import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // ✅ Hook to programmatically navigate

  const handleClick = () => {
    navigate('/signup'); // ✅ Navigate to signup page
  };

  return (
    <div>
      <h1>Hello this is my first react app</h1>
      <p>
        So here it is just a basic interface now with a lot of things going on in this page but the main thing is the login button or get started button
      </p>
      <br />
      <h1>After clicking to this button you will be navigated to login page</h1>
      <button onClick={handleClick}>Get Started</button>
    </div>
  );
};

export default Home;