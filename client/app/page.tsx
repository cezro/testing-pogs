"use client";

import { PogSlider } from "@/components/home/slider";
import { DataPogs } from "@/lib";
import { useEffect, useState } from "react";

export default function Home() {
  const [allDataPogs, setAllDataPogs] = useState<DataPogs[]>([]);

  useEffect(() => {
    async function fetchAllData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs`
      );
      const data = await response.json();
      console.log(data);
      setAllDataPogs(data);
    }
    fetchAllData();
  }, []);

  // 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>Home Page</h3>
      <PogSlider allDataPogs={allDataPogs} direction="right" speed="normal" />
      {allDataPogs && allDataPogs.length > 0 ? (
        <ul>
          {allDataPogs.map((pog) => (
            <li key={pog.id}>
              <p>{pog.name}</p>
              <p>{pog.ticker_symbol}</p>
              <p>{pog.price}</p>
              <p>{pog.color}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Pogs found</p>
      )}
    </main>
  );
}
