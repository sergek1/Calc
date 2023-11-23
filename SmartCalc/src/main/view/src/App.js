import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Parent from './components/parent'

function App() {
  
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route exact path="/"  element={<Parent/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
