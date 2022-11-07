import { useEffect, useState, useContext } from 'react';
import './App.css'
import FormLogin from './pages/login/FormLogin';
import Product from './pages/products/Product';
import API from './helpers/api-helper'
import Card from './layouts/Card/Card';
import AuthContext from './store/auth-context.jsx';
import Button from './components/Button/Button';
import Header from './components/header/Header';
import Router from './components/navigation/Router';

function App() {

    const auth = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    const fetchData = async function () {
        const data = await API('products', API.options('get'));
        setProducts(data.products);
    }

    const handleLogout = (event) => {
        auth.handlerLogout();
    };
    useEffect(() => {
        fetchData();

    }, [])


    return (
        <>
            <Header />
            <Router products={products} />
        </>
    )
}

export default App
