import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useOHLCVData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);
  const [maxHigh, setMaxHigh] = useState<any>(undefined);
  const [minLow, setMinLow] = useState<any>(undefined);
  const [minHigh, setMinHigh] = useState<any>(undefined);
  const [maxLow, setMaxLow] = useState<any>(undefined);

  const getHourlyPairOHLCV = async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10"
    );
    if (res.status === 200) {
      const slicedData = res.data.Data.Data.slice(-nLastElemetns);
      setHourlyData(slicedData);
      const maxHighObj = slicedData.reduce((max: any, obj: any) => {
        return obj.high > max.high ? obj : max;
      }, slicedData[0]);
      setMaxHigh(maxHighObj);

      const minLowObj = slicedData.reduce((min: any, obj: any) => {
        return obj.low < min.low ? obj : min;
      }, slicedData[0]);
      setMinLow(minLowObj);

      const minHigh = slicedData.reduce((max: any, obj: any) => {
        return obj.high < max.high ? obj : max;
      }, slicedData[0]);
      setMinHigh(minHigh);

      const maxLowObj = slicedData.reduce((min: any, obj: any) => {
        return obj.low > min.low ? obj : min;
      }, slicedData[0]);
      setMaxLow(maxLowObj);
    }
  };

  useEffect(() => {
    getHourlyPairOHLCV();
  }, []);

  return { hourlyData, maxHigh, minLow, minHigh, maxLow };
};

export default useOHLCVData;
