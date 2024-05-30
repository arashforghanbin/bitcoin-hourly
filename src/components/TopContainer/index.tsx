import HourlyBarChart from "./HourlyOHLCVBarChart";
import HourlySlide from "./HourlySlide";
import "./topContainer.style.scss";

const TopContainer = () => {
  return (
    <div className="topContainer">
      <HourlyBarChart />
      <HourlySlide />
    </div>
  );
};

export default TopContainer;
