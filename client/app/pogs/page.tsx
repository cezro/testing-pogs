"use client";
import { useState, useEffect } from "react";
import CreatePogsButton from "@/components/pogs/createPogs";
import TablePogs from "@/components/pogs/TablePogRow";
import { DataPogs } from "@/lib";

function Pogs() {
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

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>Pogs</div>
      <CreatePogsButton />
      <TablePogs allDataPogs={allDataPogs} />
    </div>
  );
}

export default Pogs;
