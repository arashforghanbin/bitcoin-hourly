import useBarChartData from "./hourlySlide.func";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./hourlySlide.style.scss";
import "swiper/css";
import "swiper/css/pagination";
import { unixToHourAndMinute } from "../../../utils/timesStampConvertor";

const HourlySlide = () => {
  const hourlyData = useBarChartData();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <section className="hourlySlide">
      <Swiper
        style={{ height: "100%" }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
      >
        {hourlyData &&
          hourlyData.map((item, index) => (
            <SwiperSlide key={index} style={{ padding: "16px" }}>
              <Bar
                options={{
                  maintainAspectRatio: false,
                  elements: {
                    bar: {
                      borderWidth: 0,
                    },
                  },
                  scales: {
                    y: {
                      grid: { drawTicks: false },
                      beginAtZero: true,
                      border: { dash: [4, 4] },
                    },
                    x: { grid: { display: false } },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: `Market Volume of ${unixToHourAndMinute(
                        item.time
                      )}`,
                    },
                  },
                }}
                data={{
                  labels: [""],
                  datasets: [
                    {
                      label: "High",
                      data: [item.volume],
                      borderColor: "#11B89B",
                      backgroundColor: "#11B89B",
                      borderRadius: 8,
                    },
                  ],
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default HourlySlide;
