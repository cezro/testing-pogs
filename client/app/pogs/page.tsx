"use client";
import { useState, useEffect } from "react";
import CreatePogsButton from "@/components/pogs/createPogs";
import TablePogs from "@/components/pogs/TablePogRow";
import { DataPogs } from "@/lib";

function Pogs() {
  const [allDataPogs, setAllDataPogs] = useState<DataPogs[] | null>(null);
  console.log(allDataPogs);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs`
        );
        if (!response.ok) {
          console.log("response null");
          setAllDataPogs(null);
          return;
        }
        const data = await response.json();

        console.log(data);
        setAllDataPogs(data);
      } catch (error) {
        setAllDataPogs(null);
        console.log(error);
      }
    }
    fetchAllData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>Pogs</div>
      <CreatePogsButton />
      {!allDataPogs && <>No Data Yet</>}
      {allDataPogs && <TablePogs allDataPogs={allDataPogs} />}
    </div>
  );
}

export default Pogs;
