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
    <main className="flex min-h-screen flex-col">
      {!allDataPogs && <p>There&apos;s no pogs </p>}
      {allDataPogs && <PogSlider allDataPogs={allDataPogs} />}
    </main>
  );
}
