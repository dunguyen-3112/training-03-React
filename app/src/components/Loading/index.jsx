import React from "react";
import { memo } from "react";

import classes from "./index.module.sass";

function Loading() {
  return (
    <div className={classes["loading"]}>
      <div className={classes["loading--layer-1"]}></div>
      <div className={classes["loading--layer-2"]}></div>
    </div>
  );
}

export default memo(Loading);
