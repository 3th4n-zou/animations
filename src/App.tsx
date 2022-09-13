import '@/app.scss';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollDrive from './scroll-drive/ScrollDrive';

function App() {
  return (
    <div className="app">
      <h1>animations ex</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/scroll-drive" element={<ScrollDrive />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
