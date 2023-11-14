import React from 'react';
import Calculator from './components/calculator';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Graph from './components/graph';
import Info from './components/info';
import Parent from './components/parent'

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Parent/>} />
          <Route path="/graph" element={<Graph/>} />
          {/* <Route path="/info" element={<Info />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;