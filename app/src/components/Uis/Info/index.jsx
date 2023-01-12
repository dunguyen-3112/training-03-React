import React from "react";
import PropTypes from "prop-types";
import classes from "./Info.module.sass";

function Info({ data }) {
  return (
    <span className={classes.info}>
      <figure className={classes.avatar}>
        <img src={data?.avatar} alt="avatar assignBy" />
      </figure>
      <span className={classes.name}>{data?.name}</span>
    </span>
  );
}

Info.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Info;
