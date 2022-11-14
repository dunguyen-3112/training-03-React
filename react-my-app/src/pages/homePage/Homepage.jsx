import PropTypes from 'prop-types'

import classes from './Homepage.module.css'
import { Switch } from '../../components/ui/switch'

function Homepage({ onChangeTheme }) {

    return (
        <div className={classes.homepage}>
            <Switch onClick={onChangeTheme} />
        </div>
    )
}

Homepage.propTypes = {
    onChangeTheme: PropTypes.func
}

export default Homepage
