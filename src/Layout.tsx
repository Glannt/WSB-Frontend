import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { HomePage } from './components/Content/HomePage';
import { ListRoom } from './components/Content/ListRoom';

export const Layout = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<App />} />

    //     <Route index element={<HomePage />} />
    //     <Route path="list-room" element={<ListRoom />} />
    //   </Routes>
    //   <Route path="login" element={''} />
    //   <Route path="sign-up" element={''} />
    // </BrowserRouter>
    <h1>heloo</h1>
  );
};
