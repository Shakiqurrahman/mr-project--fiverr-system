const DownArrow = ({ color, size }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 2083 2083"
      enableBackground="new 0 0 2083 2083"
      xmlSpace="preserve"
      className={size ? size : "size-5"}
    >
      <g>
        <path
          fill={color ? color : "#FFFFFF"}
          d="M420.2,1086c37.2,20.7,74.5,41.3,111.7,62.1c166.8,93.2,333.7,186.5,500.4,279.9c6.4,3.6,10.9,3.1,17.1-0.3
		c201.6-113,403.2-225.8,604.9-338.6c2.9-1.6,5.9-3.1,8.8-4.7c2.1-0.7,2.5,0.2,2,2c-2.5,2.6-5.1,5.3-7.6,7.9
		c-92.3,92.3-184.6,184.6-276.9,276.9c-110.4,110.4-220.8,220.9-331.2,331.4c-2.8,2.8-5.2,6-8.7,7.8c-3.5-1.5-5.5-4.3-7.8-6.6
		c-203.2-203.2-406.4-406.4-609.6-609.6c-1.9-1.9-3.7-3.9-5.5-5.8C417.4,1086.5,418.1,1085.6,420.2,1086z"
        />
        <path
          fill={color ? color : "#FFFFFF"}
          d="M1541,700.6c-2.9,2.8-5.8,5.5-8.6,8.3c-161.1,161.1-322.3,322.3-483.4,483.4c-8.5,8.5-8.5,8.5-17.1-0.1
		C907.6,1067.8,783.3,943.3,659,818.9c-35.8-35.8-71.6-71.7-107.3-107.5c-2.1-2.1-4.1-4.4-6.1-6.6c-0.3-2,0.4-3,2.5-2.5
		c23.6,13.1,47.2,26.1,70.7,39.3c95.5,53.6,191,107.2,286.6,160.8c42.1,23.6,84.3,47.1,126.2,71c6.2,3.5,10.7,4.1,17.2,0.5
		c116.9-65.8,234-131.3,351.1-196.9c46.5-26,92.9-52.1,139.4-78.2C1541.4,697.8,1541.6,698.8,1541,700.6z"
        />
        <path
          fill={color ? color : "#FFFFFF"}
          d="M663.6,372.9c37.4,21,74.8,42,112.2,63c74.6,41.8,149.1,83.6,223.7,125.4c11.6,6.5,23.4,12.7,34.8,19.6
		c4.7,2.9,8.2,2.5,12.7-0.1c46.9-26.5,94-52.8,141-79.1c58.6-32.8,117.3-65.6,176-98.3c16.3-9.1,32.6-17.9,48.9-26.9
		c2.2-0.6,2.8,0.4,2.4,2.4c-2.3,2.4-4.4,5-6.8,7.3c-119.6,119.6-239.2,239.3-358.9,358.9c-10.1,10.1-8,10.3-18.1,0.2
		c-53-53-106-106-158.9-159C803.8,517.1,735,448,666.1,378.8c-1.4-1.4-2.9-2.7-4.4-4.1C661.2,373,661.4,372,663.6,372.9z"
        />
      </g>
    </svg>
  );
};

export default DownArrow;
