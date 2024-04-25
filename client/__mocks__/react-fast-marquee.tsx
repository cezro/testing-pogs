import React from "react";
import { DataPogs } from "@/lib";
import Link from "next/link";

const FastMarque = ({ allDataPogs }: { allDataPogs: DataPogs[] | null }) => {
  if (!allDataPogs || !allDataPogs.length) {
    return <div data-testid="mock-loading">Loading...</div>;
  }

  return (
    <div data-testid="mock-slider">
      {allDataPogs.map((item) => (
        <Link data-testid="mock-indiv-slider" key={item.id} href={`${item.id}`}>
          {item.ticker_symbol}
        </Link>
      ))}
    </div>
  );
};

export { FastMarque as Marque };
