import { createContext } from 'react'
import PropTypes from 'prop-types';


export const Context = createContext();

function ContextProvider({ value, children }) {
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    value: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired
}



export default ContextProvider