import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './assets/home';
import About from './assets/about';
import Signup from './assets/signin';
import Dashboard from './assets/dashboard';
import Createacc from './assets/Createacc';

//import Createacc from './assets/createacc';

const App = () => {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
        <Link to="/">Home</Link>
        <Link to="/about">Contact</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/createacc" element={<Createacc />}/>
      </Routes>
      </>
  );
};

export default App;