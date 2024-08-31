function Datalist({ id, options = [], className, value, maxCount }) {
  return (
    <datalist
      id={id}
      className={`top-100 absolute left-0 mt-3 w-full max-w-[300px] bg-white ${className}`}
    >
      {options
        .filter((v) => {
          const searchTerm = value.toLowerCase();
          return searchTerm && v.toLowerCase().startsWith(searchTerm);
        })
        .slice(0, maxCount)
        .map((v, i) => (
          <option key={i} value={v} />
        ))}
    </datalist>
  );
}

export default Datalist;
