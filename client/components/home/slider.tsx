"use client";

import { DataPogs } from "@/lib";
import Marquee from "react-fast-marquee";
import { Button } from "../ui/moving-border";
import Link from "next/link";
import { calculatePercentageChange } from "@/utils/calculatePriceDiff";

export const colorVariantsDiff = {
  "↑": "text-green-500",
  "↓": "text-red-500",
  "": "text-black",
};

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
                  containerClassName="w-fit h-7"
                  borderRadius="0.2rem"
                  className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  <div className="px-2 flex gap-1 text-xs">
                    <div className="font-semibold">
                      {dataPogs.ticker_symbol}
                    </div>

                    <span
                      className={`${colorVariantsDiff[calculatePercentageChange(dataPogs.prev_value, dataPogs.value).includes("↓") ? "↓" : "↑"]} font-bold`}
                    >
                      {calculatePercentageChange(
                        dataPogs.prev_value,
                        dataPogs.value
                      )}
                    </span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </Marquee>
      )}
    </>
  );
};
