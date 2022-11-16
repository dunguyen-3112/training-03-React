// import PropTypes from 'prop-types'

import { Text } from '../../components/ui/text'
import Test from '../../components/ui/text/Test'
import classes from './Homepage.module.css'

function Homepage() {

    return (
        <div className={classes.homepage}>
            <Test />
        </div>
    )
}

Homepage.propTypes = {

}

export default Homepage
