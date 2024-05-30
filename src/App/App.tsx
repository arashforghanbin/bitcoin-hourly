import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const nLastElemetns = 10;

function App() {
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

  return (
    <div className="App">
      <ul>
        {hourlyData &&
          hourlyData?.map((item, index) => (
            <li key={index}>
              {new Date(item.time * 1000).toTimeString().slice(0, 5)}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
