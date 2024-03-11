"use client";

import { parse } from "path";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

type Props = {
  pogPageId: string;
};

function PogsGraph({ pogPageId }: Props) {
  const [stockData, setStockData] = useState<[]>([]);
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
            console.log(jsonData);
          }
        } else if (response.status === 404) {
          setError("No Stock Data");
          return;
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
    const data: (string | number)[][] = [["Date", "Stock Value"]];

    if (stockData.length !== 0 && stockData) {
      for (let i = 0; i < stockData.length; i++) {
        const value = parseFloat((stockData[i] as { value: string }).value);
        if (!isNaN(value)) {
          data.push([i.toString(), value]);
        }
      }
    }

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
