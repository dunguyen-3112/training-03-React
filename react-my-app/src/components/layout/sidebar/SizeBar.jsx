import { useContext } from 'react'

import { Context } from '../../../store/ContextProvider'
import { Navigation } from '../../ui/navigation'
import { Logo } from '../../ui/logo'
import { Box } from '../../ui/box'
import { PAGES, THEME_LIGHT } from '../../../constants'

import classes from './SizeBar.module.css'
import Bar from '../../ui/bar/Bar'

function SizeBar() {

    const context = useContext(Context)

    const handleChangePage = event => {
        const indexPage = PAGES.findIndex(
            page => page.
                title.
                toLocaleLowerCase()
                .replace(" ", "")
                .localeCompare(
                    event.
                        target.
                        href
                        .split('/')
                        .at(-1)
                ) === 0
        )

        context.handleChangePage(indexPage)

    }

    const logoUrl = context.theme.localeCompare(THEME_LIGHT) !== 0
        ? 'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Exclude_light.png?alt=media&token=939eaaa2-63b6-44af-adeb-1f100a1e7246'
        : 'https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Exclude.png?alt=media&token=a322964f-b006-4c9f-be59-a45d0fbc9b69'


    const nav = PAGES.map(page => (
        <Bar
            icon='https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/NavIcon.png?alt=media&token=642d5db6-961d-457c-a718-bd73fde0a5c1'
            textFontSize={600}
            textSize={14}
            wIcon={20}
            pos={((PAGES.length - page.index + 2)) * 2 - 1}
            key={page.index}
            isSelected={page.index === context.page + 1}
            href={`/${page.title.toLocaleLowerCase().replace(" ", "")}`}
            onClick={handleChangePage}
        >
            {page.title}
        </Bar>))

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

            <Navigation>
                <Box col className={classes.nav}>
                    {nav.slice(0, 5)}
                </Box>
                <Box col className={classes.nav}>
                    {nav.slice(5, 7)}
                </Box>
            </Navigation>
        </div>
    )
}

SizeBar.propTypes = {}

export default SizeBar
