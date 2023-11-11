import React from 'react';
import Calculator from './components/calculator';
import { BrowserRouter, Route,Routes ,Switch} from 'react-router-dom';
import Graph from './components/graph';


function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Calculator/>} />
          <Route path="/graph" element={<Graph/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;