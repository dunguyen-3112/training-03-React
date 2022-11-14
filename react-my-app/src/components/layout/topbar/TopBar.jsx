import { useContext } from 'react'

import { Title } from '../../ui/title'
import { Box } from '../../ui/box'
import { Icon } from '../../ui/icon'

import classes from './TopBar.module.css'
import Avatar from '../../ui/avatar/Avatar'
import { Context } from '../../../store/ContextProvider'
import { PAGES } from '../../../constants'

function TopBar() {

    const context = useContext(Context)

    return (
        <Box className={classes.topBar}>
            <Box>
                <Title text={PAGES[context.page].title} />
            </Box>
            <Box className={classes.topBar_right}>
                <Icon
                    src="https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/iconsearch.png?alt=media&token=c552cc15-85ef-4133-9cfb-62a1d43bceac"
                />
                <Icon
                    src="https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/icon_notifi.png?alt=media&token=3a9d2bc3-567a-4c58-82bd-8343d155e5aa"
                />
                <Box className={`${classes.topBar_icon} ${classes[`topBar_icon-${context.theme}`]}`}>
                    <Box className={classes.topBar_name}>
                        <Avatar
                            src='https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/avatar.png?alt=media&token=5327d45f-f304-4e0d-9795-34206631e3b6'
                            size={20}
                        />
                        <Title text='Mahfuzul Nabil' className={classes.topBar_textName} />
                    </Box>
                    <Icon
                        className={classes.topBar_dropdown}
                        src='https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Dropdown.png?alt=media&token=8fd6df81-e6cf-4e8d-b413-b335d3dcec5e'
                    />
                </Box>
            </Box>
        </Box>
    )
}

TopBar.propTypes = {

}

export default TopBar
