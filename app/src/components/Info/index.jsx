import React from "react";
import PropTypes from "prop-types";
import classes from "./index.module.sass";
import { memo } from "react";
import { useCallback } from "react";

function Info({ data, onClick }) {
  const handleClick = useCallback(() => {
    onClick(data);
  }, []);

  return (
    <span className={classes.info} onClick={handleClick}>
      <figure className={classes.avatar}>
        <img src={data?.avatar} alt="avatar assignBy" />
      </figure>
      <span className={classes.name}>{data?.name}</span>
    </span>
  );
}

Info.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default memo(Info);
