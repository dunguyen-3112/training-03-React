import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

function ArticlesIcon({ active }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={active ? "1" : "0.4"}
        d="M15 11.25V0.75C15 0.334375 14.6656 0 14.25 0H4C2.34375 0 1 1.34375 1 3V13C1 14.6562 2.34375 16 4 16H14.25C14.6656 16 15 15.6656 15 15.25V14.75C15 14.5156 14.8906 14.3031 14.7219 14.1656C14.5906 13.6844 14.5906 12.3125 14.7219 11.8313C14.8906 11.6969 15 11.4844 15 11.25ZM5 4.1875C5 4.08438 5.08438 4 5.1875 4H11.8125C11.9156 4 12 4.08438 12 4.1875V4.8125C12 4.91562 11.9156 5 11.8125 5H5.1875C5.08438 5 5 4.91562 5 4.8125V4.1875ZM5 6.1875C5 6.08438 5.08438 6 5.1875 6H11.8125C11.9156 6 12 6.08438 12 6.1875V6.8125C12 6.91562 11.9156 7 11.8125 7H5.1875C5.08438 7 5 6.91562 5 6.8125V6.1875ZM12.9187 14H4C3.44687 14 3 13.5531 3 13C3 12.45 3.45 12 4 12H12.9187C12.8594 12.5344 12.8594 13.4656 12.9187 14Z"
        fill={active ? "#DDE2FF" : "#9FA2B4"}
      />
    </svg>
  );
}

ArticlesIcon.propTypes = {
  active: PropTypes.bool,
};

export default memo(ArticlesIcon);
