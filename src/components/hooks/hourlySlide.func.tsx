import axios from "axios";
import { useEffect, useState } from "react";

const nLastElemetns = 10;

const useBarChartData = () => {
  const [hourlyExchangeVolumeData, setHourlyExchangeVolumeData] = useState<
    any[] | undefined
  >(undefined);

  const fetchAPI = async () => {
    return await axios.get(
      "https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10"
    );
  };

  const getHourlyExchangeVolume = async () => {
    let slicedData: any;
    const now = Date.now();
    if (localStorage.getItem("hourlyExchangeVolumeData")) {
      const data = JSON.parse(
        `${localStorage.getItem("hourlyExchangeVolumeData")}`
      );
      if (data) {
        slicedData = data.slicedData;
        if (now - data.expiryDate > 1000 * 60 * 60) {
          slicedData = (await fetchAPI()).data.Data.slice(-nLastElemetns);
          localStorage.setItem(
            "hourlyExchangeVolumeData",
            JSON.stringify({ expiryDate: now, slicedData })
          );
        }
      }
    } else {
      slicedData = (await fetchAPI()).data.Data.slice(-nLastElemetns);
      localStorage.setItem(
        "hourlyExchangeVolumeData",
        JSON.stringify({ expiryDate: now, slicedData })
      );
    }
    if (slicedData) {
      setHourlyExchangeVolumeData(slicedData);
    }
  };

  useEffect(() => {
    getHourlyExchangeVolume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hourlyExchangeVolumeData;
};

export default useBarChartData;
