import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Graph from './components/graph';
import Parent from './components/parent'

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Parent/>} />
          <Route path="/graphLink" element={<Graph/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
