
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Admin from "../src/page/admin";
import Dashboard from '../src/page/dashboard';
import Doctors from "../src/page/doctors";
import Users from "../src/page/users";
import Login from "../src/page/login";

import './index.css'


createRoot(document.getElementById('root')).render;
  
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
    

      </Routes>
      </BrowserRouter>
);
