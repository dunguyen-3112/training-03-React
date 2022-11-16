import { useContext } from 'react'
import PropTypes from 'prop-types'

import { Box } from '../../ui/box'
import { Icon } from '../../ui/icon'
import Avatar from '../../ui/avatar/Avatar'
import { Switch } from '../../ui/switch'
import { Context } from '../../../store/ContextProvider'
import { PAGES } from '../../../constants'

import classes from './TopBar.module.css'
import { Text } from '../../ui/text'

function TopBar({ onChangeTheme }) {

    const context = useContext(Context)

    return (
        <Box className={classes.topBar}>
            <Box>
                <Text
                    fontWeight={600}
                    size={25}
                    dark={context.theme.localeCompare('dark') === 0}
                    light={context.theme.localeCompare('light') === 0}
                    type='h1'
                >
                    {PAGES[context.page].title}</Text>
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
                        <Text
                            dark={context.theme.localeCompare('dark') === 0}
                            light={context.theme.localeCompare('light') === 0}
                            fontWeight={600}
                            size={14}
                        >
                            Mahfuzul Nabil
                        </Text>
                    </Box>
                    <Icon
                        className={classes.topBar_dropdown}
                        src='https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/Dropdown.png?alt=media&token=8fd6df81-e6cf-4e8d-b413-b335d3dcec5e'
                    />
                </Box>
                <Switch onClick={onChangeTheme} />
            </Box>
        </Box>
    )
}

TopBar.propTypes = {
    onChangeTheme: PropTypes.func
}

export default TopBar
