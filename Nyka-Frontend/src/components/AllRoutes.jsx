import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Dashboard } from '../pages/Dashboard';
import { Analytics } from '../pages/Analytics';
import { Login } from '../pages/Login';


export const AllRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/analytics" element={<Analytics />}></Route>
      <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  )
}
