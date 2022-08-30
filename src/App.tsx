import '@/app.scss';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TweenDemo from '@/components/TweenDemo';

function App() {
  return (
    <div className="app">
      <h1>animations ex</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/tween" element={<TweenDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
