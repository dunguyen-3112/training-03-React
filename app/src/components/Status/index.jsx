import React, { memo } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";

function Status({ children, status }) {
  return (
    <span data-status={status} className={classes.status}>
      {children}
    </span>
  );
}

Status.propTypes = {
  children: PropTypes.string,
  status: PropTypes.number,
};

export default memo(Status);
