import React, { createContext } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

function ContextProvider({ children, value }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object.isRequired,
};

export default ContextProvider;
