"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

type Props = {
  pogPageId: string;
};

type StockDataProps = {
  createdat: string;
  value: string;
};

function PogsGraph({ pogPageId }: Props) {
  const [stockData, setStockData] = useState<StockDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pog-values/${pogPageId}`
        );

        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.length === 0) {
            setError("No Pogs found");
          } else {
            setStockData(jsonData);
          }
        } else if (response.status === 404) {
          setError("No Stock Data");
        }
      } catch (error) {
        setError("Error occurred: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pogPageId]);

  const graphData = () => {
    const data: (string | number)[][] = [["Time", "Stock Value"]];

    stockData.forEach((item) => {
      try {
        const date = new Date(item.createdat);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const timeString = `${hours}:${minutes}:${seconds}`;
        const value = parseFloat(item.value);
        if (!isNaN(value)) {
          data.push([timeString, value]);
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    });

    return data;
  };

  return (
    <div className="text-center">
      {error && <div>{error}</div>}
      {stockData.length > 0 && (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={graphData()}
          options={{
            hAxis: {
              title: "Date",
              format: "MMM d, yyyy", // Format date on the horizontal axis
            },
            vAxis: {
              title: "Stock Value",
            },
            legend: "none",
          }}
        />
      )}
    </div>
  );
}

export default PogsGraph;
