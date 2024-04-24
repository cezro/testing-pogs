"use client";
import { useState, useEffect } from "react";
import CreatePogsButton from "@/components/pogs/createPogs";
import TablePogs from "@/components/pogs/TablePogRow";
import { DataPogs } from "@/lib";
import { useUser } from "@auth0/nextjs-auth0/client";

function Pogs() {
  const [allDataPogs, setAllDataPogs] = useState<DataPogs[] | null>(null);
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState<string>("user");

  console.log(allDataPogs, "/pogs");
  useEffect(() => {
    console.log("ran");
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

  useEffect(() => {
    async function fetchUserRole() {
      try {
        if (!user) {
          // User is not available, handle this case as needed
          return;
        }

        const fetchRole = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sub: user.sub }), // Assuming user.sub is the correct property
          }
        );

        const role = await fetchRole.json();
        setRole(role);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserRole(); // Call the function directly

    // Include all variables used inside the useEffect in the dependency array
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>Pogs</div>
      {role === "admin" ? <CreatePogsButton /> : <></>}
      {!allDataPogs && <>No Data Yet</>}
      {allDataPogs && <TablePogs allDataPogs={allDataPogs} />}
    </div>
  );
}

export default Pogs;
