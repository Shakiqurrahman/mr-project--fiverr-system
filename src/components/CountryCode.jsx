import { useEffect } from "react";
import { countryCodes } from "../libs/countryCodeList";

function CountryCode({ setCountryCode, countryName, countryCode }) {
  const countryCodeList = Object.values(countryCodes);
  const getTheCountryCode = countryCodes[countryName];
  useEffect(() => {
    setCountryCode((prev) => ({ ...prev, countryCode: getTheCountryCode }));
  }, [getTheCountryCode]);

  const handleChange = (e) => {
    setCountryCode((prev) => ({ ...prev, countryCode: e.target.value }));
  };
  return (
    <select
      name="countryCode"
      value={countryCode}
      onChange={handleChange}
      className="border-none bg-white outline-none"
    >
      {countryCodeList?.map((code, i) => (
        <option key={i} value={code}>
          ({code})
        </option>
      ))}
    </select>
  );
}

export default CountryCode;
