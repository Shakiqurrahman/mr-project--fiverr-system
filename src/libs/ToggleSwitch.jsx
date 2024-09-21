export const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <div
      className={`flex h-6 w-12 cursor-pointer items-center rounded-full border border-primary p-1 transition-all duration-300 ${isChecked ? "" : ""}`}
      onClick={onToggle}
    >
      <div
        className={`size-4 transform rounded-full shadow-md transition-transform duration-300 ${isChecked ? "translate-x-[23px] bg-blue-500" : "translate-x-0 bg-gray-500"}`}
      />
    </div>
  );
};
