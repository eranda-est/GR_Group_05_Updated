import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import Footer from "./components/templates/Footer";


function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
          <Route path="/signIn" element={< SignIn/>} />
         
        </Routes>
      </Router>
  );
}

export default App;
