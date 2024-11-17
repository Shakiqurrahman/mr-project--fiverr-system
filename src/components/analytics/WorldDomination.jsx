import { useEffect, useState } from "react";
import WorldMap from "react-svg-worldmap";
import { useGetWordlDominationDataQuery } from "../../Redux/api/analyticsApiSlice";

const WorldDomination = () => {
  const { data: worldsData } = useGetWordlDominationDataQuery();
  console.log(worldsData);
  const [dataList, setDataList] = useState([
    // { country: "cn", value: 1389618778 }, // china
  ]);
  useEffect(() => {
    if (worldsData) {
      setDataList(worldsData.worldDominationDetails);
    }
  }, [worldsData]);
  const getStyle = ({ countryValue, color }) => ({
    fill: countryValue ? "rgba(27, 140, 220, 1)" : color,
    stroke: "#fff",
    strokeWidth: 1,
    strokeOpacity: 0.5,
    cursor: "pointer",
  });
  return (
    <div className="border p-3">
      <h1 className="text-lg font-semibold">
        World Domination {worldsData?.worldDomiation || "0%"}
      </h1>
      <div>
        <WorldMap
          color="rgba(27, 140, 220, 0.2)"
          data={dataList}
          size={"xxl"}
          styleFunction={getStyle}
          valueSuffix="Sales"
          tooltipBgColor="#fff"
          tooltipTextColor="#000"
          richInteraction={true}
        />
      </div>
    </div>
  );
};

export default WorldDomination;
