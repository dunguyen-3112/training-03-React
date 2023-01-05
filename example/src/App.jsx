import { useState, useRef, useEffect } from 'react';
import './App.css'
import Products from './pages/product/Products';
import useFetch from './useFetch';


function App() {

    const [data, error, loading] = useFetch('https://jsonplaceholder.typicode.com/albums')

    data != null && console.log(data)
    return (
        <>
            <ul>

            </ul>
        </>
    )
}

export default App
