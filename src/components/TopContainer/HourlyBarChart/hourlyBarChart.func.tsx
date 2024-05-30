import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useBarChartData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);

  const getHourlyPairOHLCV = async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10"
    );
    if (res.status === 200) {
      const slicedData = res.data.Data.Data.slice(-nLastElemetns);
      setHourlyData(slicedData);
    }
  };

  useEffect(() => {
    getHourlyPairOHLCV();
  }, []);

  return hourlyData;
};

export default useBarChartData;
