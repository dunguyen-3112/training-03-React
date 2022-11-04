import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import Product from './components/products/ListProduct/Product';
import API from './helpers/api-helper'
import Card from './layouts/Card/Card';

function App() {

    const [products, setProducts] = useState([]);

    const fetchData = async function () {
        const data = await API('products', API.options('get'));
        setProducts(data.products);
    }
    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <Product products={products} />
        </>
    )
}

export default App
