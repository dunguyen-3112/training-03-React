import React, { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.sass";
import { PAGE_PER } from "@constants";
import { Button, DropDown } from "@components";

function Pagination({ page, counterItems, counterPages, onSelect }) {
  const [pagePer, setPagePer] = useState(8);
  page = page || 1;
  counterItems = counterItems || 0;
  counterPages = counterPages || 0;
  const handleNextpage = useCallback(() => {
    // if (page < counterPages) {
    //   const currentPage = page + 1;
    //   onSelect(currentPage);
    // }
  }, [counterPages, onSelect, page]);

  const handleBackpage = useCallback(() => {
    // if (page > 1) {
    //   const currentPage = page - 1;
    //   onSelect(currentPage);
    // }
  }, [onSelect, page]);

  return (
    <div className={`${classes.pagination} flex`}>
      <DropDown value={pagePer} options={PAGE_PER} />
      <div className={`${classes.pagination__element} flex`}>
        <span className={`${classes.pagination__meta} flex`}>
          <span>{(page - 1) * pagePer + 1}</span>
          <span>-</span>
          <span>{Math.min(counterItems, page * pagePer)}</span>
          <span>of</span>
          <span>{` ${counterItems}`}</span>
        </span>
        <Button outline onClick={handleBackpage} disabled={page <= 1}>
          {"<"}
        </Button>
        <Button
          outline
          onClick={handleNextpage}
          disabled={page >= counterPages}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  counterItems: PropTypes.number,
  counterPages: PropTypes.number,
  onSelect: PropTypes.func,
  page: PropTypes.number,
};

export default memo(Pagination);
