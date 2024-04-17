"use client";

import PogsGraph from "@/components/graph/page";
import AddNewValue from "@/components/pogs/buttons/AddNewValue";
import DeleteButton from "@/components/pogs/buttons/DeletePogs";
import EditButton from "@/components/pogs/buttons/EditPogs";
import { Button } from "@/components/ui/button";
import { DataPogs } from "@/lib";
import Link from "next/link";
import { useState, useEffect } from "react";

type PogPageProps = {
  params: {
    id: string;
  };
};

function PogPage({ params }: PogPageProps) {
  const pogPageId = params.id;
  const [data, setData] = useState<DataPogs[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingNewValue, setIsAddingNewValue] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs/${pogPageId}`
        );

        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.length === 0) {
            setError("No Pogs found");
          } else {
            setData(jsonData);
          }
        } else if (response.status === 404) {
          setError("Page not found");
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

  useEffect(() => {
    if (isAddingNewValue) {
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
              setData(jsonData);
            }
          } else if (response.status === 404) {
            setError("Page not found");
            return;
          }
        } catch (error) {
          setError("Error occurred: " + error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAddingNewValue, pogPageId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(data);

  return (
    <>
      <div>
        <h1>{`PogPage ${pogPageId}`}</h1>
        <div className="flex justify-between">
          <div className="flex">
            {data && (
              <>
                <EditButton pogPageId={pogPageId} data={data} />
                <DeleteButton pogPageId={pogPageId} data={data} />
                <AddNewValue
                  pogPageId={pogPageId}
                  setIsAddingNewValue={setIsAddingNewValue}
                />
              </>
            )}
          </div>
          <div>
            <Link href={"/"}>
              <Button>Go To Homepage</Button>
            </Link>
          </div>
        </div>

        {data &&
          data.map((pogs) => (
            <div key={pogs.id}>
              <p>Name: {pogs.name}</p>
              <p>Ticker Symbol: {pogs.ticker_symbol}</p>
              <p>Price: {pogs.price}</p>
              <p>Color: {pogs.color}</p>
              <p>Time Created: {pogs.createdat}</p>
            </div>
          ))}
      </div>
      <div>
        <PogsGraph pogPageId={pogPageId} />
      </div>
    </>
  );
}

export default PogPage;
