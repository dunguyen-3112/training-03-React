import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Layout from './pages/layout'

function Appc() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='contact' element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Appc