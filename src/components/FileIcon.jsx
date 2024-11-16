const FileIcon = ({ name }) => {
  return (
    <div className="relative h-[80px] w-[70px] select-none">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 80"
      >
        <path
          d="M-435.75,113.24h5.42l-11.08-11.18v5.47A5.69,5.69,0,0,0-435.75,113.24Z"
          transform="translate(493.62 -95.35)"
          fill="#ffffff"
        />
        <path
          d="M-446.07,107.53v-7.47h-37.22a5.69,5.69,0,0,0-5.66,5.7v59.18a5.69,5.69,0,0,0,5.66,5.71h49.35a5.68,5.68,0,0,0,5.65-5.71v-47h-7.46A10.38,10.38,0,0,1-446.07,107.53Z"
          transform="translate(493.62 -95.35)"
          fill="#fff"
        />
        <path
          d="M-423.62,113.23l-17.73-17.8-.06,0v-.13h-41.88a10.38,10.38,0,0,0-10.33,10.41v59.18a10.38,10.38,0,0,0,10.33,10.41h49.35a10.38,10.38,0,0,0,10.32-10.41v-51.7Zm-6.71,0h-5.42a5.69,5.69,0,0,1-5.66-5.71v-5.47Zm2,51.7a5.68,5.68,0,0,1-5.65,5.71h-49.35a5.69,5.69,0,0,1-5.66-5.71V105.76a5.69,5.69,0,0,1,5.66-5.7h37.22v7.47a10.38,10.38,0,0,0,10.32,10.41h7.46Z"
          transform="translate(493.62 -95.35)"
          fill="#558dca"
        />
      </svg>
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 font-bold text-primary">
        {name || "FILE"}
      </p>
    </div>
  );
};

export default FileIcon;
