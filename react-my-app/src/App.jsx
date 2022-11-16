import { useCallback, useState, useEffect } from 'react'
import { RouterProvider } from "react-router-dom";

import './App.css'

import { TopBar } from './components/layout/topbar'
import ContextProvider from './store/ContextProvider'
import router from './router'
import { THEME_DARK, THEME_LIGHT } from './constants';
import { useLayoutEffect } from 'react';



function App() {

    const [theme, setTheme] = useState('light')

    const [page, setPage] = useState(0)

    const [posts, setPosts] = useState([])

    document.querySelector('#root').className = theme

    const handleChangeTheme = useCallback(() => {
        setTheme(prev => {
            if (prev.localeCompare(THEME_LIGHT) === 0)
                return THEME_DARK
            return THEME_LIGHT
        });
    }, [])

    const handleChangePage = useCallback((p) => {
        setPage(p)
    }, [])

    return (
        <ContextProvider value={{ theme, page, handleChangePage }}>
            <TopBar onChangeTheme={handleChangeTheme} />
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App
