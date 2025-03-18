// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import VoiceAssistantPage from './components/VoiceAssistantPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage   />} />
            <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
