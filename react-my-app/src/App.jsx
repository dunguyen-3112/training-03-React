import { useCallback, useState } from 'react'

import './App.css'
import { TopBar } from './components/layout/topbar'
import { Box } from './components/ui/box'
import { SizeBar } from './components/ui/sidebar'

import { PAGES, THEME_DARK, THEME_LIGHT } from './constants'
import { Homepage } from './pages/homePage'
import { HelpPage } from './pages/helpPage'
import ContextProvider from './store/ContextProvider'
import { InVoicesPage } from './pages/invoicesPage'
import { MyWalletsPage } from './pages/myWalletsPage'
import { TransactionPage } from './pages/transactionPage'
import { SettingPage } from './pages/settingPage'


function App() {

    const [theme, setTheme] = useState('light')

    const [page, setPage] = useState(0)

    const handleChangeTheme = useCallback(() => {
        setTheme(prev => {
            if (prev.localeCompare(THEME_LIGHT) === 0)
                return THEME_DARK
            return THEME_LIGHT
        });
    }, [])

    const selectRoute = useCallback(() => {

        switch (page) {
            case PAGES[0].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <Homepage onChangeTheme={handleChangeTheme} />
                    </Box>
                )
            case PAGES[1].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <TransactionPage />
                    </Box>
                )

            case PAGES[2].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <InVoicesPage />
                    </Box>
                )
            case PAGES[3].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <MyWalletsPage />
                    </Box>
                )
            case PAGES[4].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <SettingPage />
                    </Box>
                )
            case PAGES[5].index - 1:
                return (
                    <Box col>
                        <TopBar />
                        <HelpPage />
                    </Box>
                )

            default:
                return (<h1>Not Found</h1>);
        }
    }, [])

    const handleChangePage = useCallback((page) => {
        setPage(page)
    }, [page])

    return (
        <ContextProvider value={{ theme, page, handleChangePage }}>
            <SizeBar />
            {selectRoute()}
        </ContextProvider>
    )
}

export default App
