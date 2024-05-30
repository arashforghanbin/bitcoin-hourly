import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useOHLCVData = () => {
  const [hourlyData, setHourlyData] = useState<any[] | undefined>(undefined);
  const [maxHigh, setMaxHigh] = useState<any>(undefined);
  const [minLow, setMinLow] = useState<any>(undefined);
  const [minHigh, setMinHigh] = useState<any>(undefined);
  const [maxLow, setMaxLow] = useState<any>(undefined);

  const fetchAPI = async () => {
    return await axios.get(
      "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10"
    );
  };

  const getHourlyPairOHLCV = async () => {
    let slicedData: any;
    const now = Date.now();
    if (localStorage.getItem("OHLCVData")) {
      const data = JSON.parse(`${localStorage.getItem("OHLCVData")}`);
      if (data) {
        slicedData = data.slicedData;
        if (now - data.expiryDate > 1000 * 60 * 60) {
          slicedData = (await fetchAPI()).data.Data.Data.slice(-nLastElemetns);
          localStorage.setItem(
            "OHLCVData",
            JSON.stringify({ expiryDate: now, slicedData })
          );
        }
      }
    } else {
      slicedData = (await fetchAPI()).data.Data.Data.slice(-nLastElemetns);
      localStorage.setItem(
        "OHLCVData",
        JSON.stringify({ expiryDate: now, slicedData })
      );
    }
    if (slicedData) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { hourlyData, maxHigh, minLow, minHigh, maxLow };
};

export default useOHLCVData;
