import React from 'react';
import { BrowserRouter, HashRouter, Route,Routes } from 'react-router-dom';
import Graph from './components/graph';
import Parent from './components/parent'

function App() {
  
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Parent/>} />
          <Route path="/graphLink" element={<Graph/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
