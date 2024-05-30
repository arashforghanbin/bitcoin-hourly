import { unixToHourAndMinute } from "../../../utils/timesStampConvertor";
import "./hourlyBarChart.style.scss";
import useBarChartData from "./hourlyBarChart.func";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

const HourlyBarChart = () => {
  const hourlyData = useBarChartData();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    scales: {
      y: {
        grid: { drawTicks: false },
        beginAtZero: false,
        border: { dash: [4, 4] },
      },
      x: { grid: { display: false } },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          useBorderRadius: true,
          borderRadius: 8,
          boxWidth: 16,
          boxHeight: 16,
        },
      },
      title: {
        display: false,
      },
    },
  };

  const labels = hourlyData?.map((item) => unixToHourAndMinute(item.time));

  const data = {
    labels,
    datasets: [
      {
        label: "High",
        data: hourlyData ? hourlyData.map((item) => item.high) : null,
        borderColor: "#11B89B",
        backgroundColor: "#11B89B",
        borderRadius: 8,
      },
      {
        label: "Average",
        data: hourlyData ? hourlyData.map((item) => item.open) : null,
        borderColor: "#FFD966",
        backgroundColor: "#FFD966",
        borderRadius: 8,
      },
      {
        label: "Low",
        data: hourlyData ? hourlyData.map((item) => item.low) : null,
        borderColor: "#F24A4A",
        backgroundColor: "#F24A4A",
        borderRadius: 8,
      },
    ],
  };

  return (
    <section className="hourlyBarChart">
      <Bar options={options} data={data} />
    </section>
  );
};

export default HourlyBarChart;
