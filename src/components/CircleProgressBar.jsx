const CircleProgressBar = ({ precentage, circleWidth }) => {
  const radius = 20;
  const dashArray = radius * Math.PI * 2;
  const dashOffSet = dashArray - (dashArray * precentage) / 100;
  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={radius}
          className="fill-none stroke-[#ddd]"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={radius}
          className="fill-none stroke-primary"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffSet,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3rem"
          className="text-xs font-medium"
        >
          {precentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgressBar;
