import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login.jsx'
import Game from '../Components/Game.jsx'
import Add from '../Components/Add.jsx'

const RouterApp = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/game' element={<Game />} />
        <Route path='/add' element={<Add />} />


    </Routes>
    </BrowserRouter>
  )
}

export default RouterApp