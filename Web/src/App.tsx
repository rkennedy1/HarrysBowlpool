import React, { Component } from 'react';
import { Homepage } from './components/Homepage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage year={2023} />} />
          <Route path="/2023" element={<Homepage year={2023} />} />
          <Route path="/2022" element={<Homepage year={2022} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
