import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useBartChartData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);

  const getHourlyVolume = async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10"
    );
    if (res.status === 200) {
      const slicedData = res.data.Data.slice(-nLastElemetns);
      console.log(slicedData);
      setHourlyData(slicedData);
    }
  };

  useEffect(() => {
    getHourlyVolume();
  }, []);

  return hourlyData;
};

export default useBartChartData;
