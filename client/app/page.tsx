"use client";

import { PogSlider } from "@/components/home/slider";
import CreatePogsButton from "@/components/pogs/createPogs";
import { DataPogs } from "@/lib";
import { useEffect, useState } from "react";

export default function Home() {
  const [allDataPogs, setAllDataPogs] = useState<DataPogs[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs`
        );
        console.log("Response status:", response.status);
        if (response.status === 404) {
          setAllDataPogs(null);
        } else if (!response.ok) {
          setError("Error fetching data");
        } else {
          const data = await response.json();
          setAllDataPogs(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <CreatePogsButton />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !allDataPogs && <p>There&apos;s no pogs </p>}
      {!loading && !error && allDataPogs && (
        <PogSlider allDataPogs={allDataPogs} />
      )}
    </main>
  );
}
