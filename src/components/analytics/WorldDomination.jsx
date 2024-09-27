import WorldMap from "react-svg-worldmap";

const WorldDomination = () => {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];
  const getStyle = ({ countryValue, color }) => ({
    fill: countryValue ? "rgba(27, 140, 220, 1)" : color,
    stroke: "#fff",
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: "pointer",
  });
  return (
    <div className="border p-3">
      <h1 className="text-lg font-semibold">World Domination 9%</h1>
      <div>
        <WorldMap
          color="rgba(27, 140, 220, 0.2)"
          data={data}
          size={"xxl"}
          styleFunction={getStyle}
          valueSuffix="Sales"
          tooltipBgColor="#fff"
          tooltipTextColor="#000"
        />
      </div>
    </div>
  );
};

export default WorldDomination;
