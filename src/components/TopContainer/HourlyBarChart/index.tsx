import { unixToHourAndMinute } from "../../../utils/timesStampConvertor";
import "./hourlyBarChart.style.scss";
import useBartChartData from "./hourlyBarChart.func";

const HourlyBarChart = () => {
  const hourlyData = useBartChartData();

  return (
    <section className="hourlyBarChart">
      <ul>
        {hourlyData &&
          hourlyData?.map((item, index) => (
            <li key={index}>{unixToHourAndMinute(item.time)}</li>
          ))}
      </ul>
    </section>
  );
};

export default HourlyBarChart;
