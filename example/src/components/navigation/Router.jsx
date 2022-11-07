import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Product from '../../pages/products/Product'
import Navigation from './Navigation'

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path='products' element={<Product products={props.products} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router