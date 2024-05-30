import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useBarChartData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);

  const getHourlyVolume = async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10"
    );
    if (res.status === 200) {
      console.log(res);
      const slicedData = res.data.Data.Data.slice(-nLastElemetns);
      console.log(slicedData);
      setHourlyData(slicedData);
    }
  };

  useEffect(() => {
    getHourlyVolume();
  }, []);

  return hourlyData;
};

export default useBarChartData;
