const FileIcon = ({ name }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
    >
      <rect
        x={10}
        y={0}
        width={80}
        height={100}
        rx={5}
        fill="#f0f0f0"
        stroke="#ccc"
      />
      <polygon points="10,0 90,0 90,10 10,10" fill="#4A90E2" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize={20}
        fill="#333"
      >
        {name || "FILE"}
      </text>
    </svg>
  );
};

export default FileIcon;
