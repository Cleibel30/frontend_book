import { useState } from 'react'
import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css"

// Routes

import { Home } from './routes/Home'
import { Login } from './routes/Login'
import { Book } from './routes/Book'
import { Login_admin } from './routes/Login_admin'
import { Profile } from './routes/Profile'
import { Register_admin } from './routes/Register_admin'
import { Register } from './routes/Register'
import { Gender } from './routes/Gender'

//Context

import { Context } from './context/Context';

import './App.css'

function App() {
  

  return (
    <>
      <Context>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ladmin" element={<Login_admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/radmin" element={<Register_admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gender/:id" element={<Gender />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        </Context>
    </>
  )
}

export default App
