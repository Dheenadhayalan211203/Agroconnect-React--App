import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userdashboard1 from './Components/Userdashboard1';
import Userdashboard2 from './Components/Userdashboard2';
import AddToCartUser1 from './Components/Addtocartuser1';
import AddToCartUser2 from './Components/Addtocartuser2';
import Home from './Components/Home';
import Login from './pages/Login';
 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userdashboard1" element={<Userdashboard1 />} />
        <Route path="/userdashboard2" element={<Userdashboard2 />} />
        <Route path="/addtocartuser1" element={<AddToCartUser1 />} />
        <Route path="/addtocartuser2" element={<AddToCartUser2 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
