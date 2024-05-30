import useOHLCVData from "../hooks/hourlyBarChart.func";
import "./bottomContainer.style.scss";
import { unixToHourAndMinute } from "../../utils/timesStampConvertor";

const BottomContainer = () => {
  const { maxHigh, minLow, minHigh, maxLow } = useOHLCVData();

  return (
    <section className="bottomContainer">
      <div className="bottomContainer__maxRange">
        <p className="bottomContainer__maxRange__title">Maximum Range:</p>
        <p className="bottomContainer__maxRange__value">
          from {minLow && unixToHourAndMinute(minLow.time)} to{" "}
          {maxHigh && unixToHourAndMinute(maxHigh.time)}
        </p>
      </div>
      <div className="bottomContainer__minRange">
        <p className="bottomContainer__minRange__title">Minimum Range:</p>
        <p className="bottomContainer__minRange__value">
          {" "}
          from {maxLow && unixToHourAndMinute(maxLow.time)} to{" "}
          {minHigh && unixToHourAndMinute(minHigh.time)}
        </p>
      </div>
    </section>
  );
};

export default BottomContainer;
