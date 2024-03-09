"use client";

import { useState, useEffect } from "react";

type PogPageProps = {
  params: {
    id: string;
  };
};

type PogData = {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
};

function PogPage({ params }: PogPageProps) {
  const pogPageId = Number(params.id);
  const [data, setData] = useState<PogData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs/${pogPageId}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, [pogPageId]);

  return (
    <div>
      <h1>{`PogPage ${pogPageId}`}</h1>
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Ticker Symbol: {data.ticker_symbol}</p>
          <p>Price: {data.price}</p>
          <p>Color: {data.color}</p>
        </div>
      )}
    </div>
  );
}

export default PogPage;
