"use client";

import { DataPogs } from "@/lib";
import Marquee from "react-fast-marquee";
import { Button } from "../ui/moving-border";
import Link from "next/link";

export const PogSlider = ({
  allDataPogs,
}: {
  allDataPogs: DataPogs[] | null;
}) => {
  console.log(allDataPogs);
  return (
    <>
      {!allDataPogs && <div>Loading...</div>}
      {allDataPogs && (
        <Marquee pauseOnHover={true} gradientWidth={200} gradient={true}>
          <div className="w-full flex flex-row gap-3">
            {allDataPogs.map((dataPogs) => (
              <Link href={`/pogs/${dataPogs.id}`} key={dataPogs.id}>
                <Button
                  containerClassName="w-16 h-8"
                  borderRadius="0.2rem"
                  className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  {dataPogs.ticker_symbol}
                </Button>
              </Link>
            ))}
          </div>
        </Marquee>
      )}
    </>
  );
};
