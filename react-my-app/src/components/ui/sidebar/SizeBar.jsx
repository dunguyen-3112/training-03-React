import { useContext } from 'react'

import { Context } from '../../../store/ContextProvider'
import { Navigation } from '../navigation'
import { Logo } from '../logo'
import { Box } from '../box'
import { THEME_LIGHT } from '../../../constants'

import classes from './SizeBar.module.css'

function SizeBar() {

    const context = useContext(Context)

    const logoUrl = context.theme.localeCompare(THEME_LIGHT) !== 0
        ? 'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Exclude_light.png?alt=media&token=939eaaa2-63b6-44af-adeb-1f100a1e7246'
        : 'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Exclude.png?alt=media&token=a322964f-b006-4c9f-be59-a45d0fbc9b69'

    return (
        <div
            className={`${classes.sizeBar} ${classes[`sizeBar-${context.theme}`]}`}
        >
            <Logo
                src={logoUrl}
                size={30}
                title='Maglo.'
                theme={context.theme}
            />

            <Navigation
                src='https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/NavIcon.png?alt=media&token=642d5db6-961d-457c-a718-bd73fde0a5c1'
                size={20}
            >
                <Box col className={classes.nav}>
                    <Navigation.Item
                        pos={0}
                    >
                        Dashboard
                    </Navigation.Item>

                    <Navigation.Item
                        pos={1}
                    >
                        Transaction
                    </Navigation.Item>

                    <Navigation.Item
                        pos={2}
                    >
                        Invoices
                    </Navigation.Item>

                    <Navigation.Item
                        pos={3}
                    >
                        My Wallets
                    </Navigation.Item>

                    <Navigation.Item
                        pos={4}
                    >
                        Setting
                    </Navigation.Item>
                </Box>
                <Box col className={classes.nav}>

                    <Navigation.Item
                        pos={5}
                    >
                        Help
                    </Navigation.Item>

                    <Navigation.Item
                        pos={6}
                    >
                        Logout
                    </Navigation.Item>
                </Box>
            </Navigation>
        </div>
    )
}

SizeBar.propTypes = {}

export default SizeBar
