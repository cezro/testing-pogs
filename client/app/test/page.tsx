"use client";

import React from "react";
import { Chart } from "react-google-charts";

function StockChart() {
  const generateRandomValue = () => {
    return Math.floor(Math.random() * 100) + 50;
  };

  const generateRandomData = () => {
    const data: (string | number)[][] = [["Date", "Stock Value"]];
    for (let i = 1; i <= 15; i++) {
      data.push([i.toString(), generateRandomValue()]);
    }
    return data;
  };

  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={generateRandomData()}
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
  );
}

export default StockChart;
