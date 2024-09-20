import React from 'react';

const DownArrow = ({className = "fill-white size-4" }) => {
  return (
    <svg
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 303.88 153.5"
  >
    <path
      d="M402.8,175.77,249.39,326.25,98.91,172.74l151.15,86.51Z"
      transform="translate(-98.91 -172.74)"
    />
  </svg>
  );
};

export default DownArrow;