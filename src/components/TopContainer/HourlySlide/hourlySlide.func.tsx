import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useBarChartData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);

  const getHourlyExchangeVolume = async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10"
    );
    if (res.status === 200) {
      const slicedData = res.data.Data.slice(-nLastElemetns);
      setHourlyData(slicedData);
    }
  };

  useEffect(() => {
    getHourlyExchangeVolume();
  }, []);

  return hourlyData;
};

export default useBarChartData;
