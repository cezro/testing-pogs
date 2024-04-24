import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataPogs } from "@/lib";

// import { colorVariants } from "@/colorVariants";
// import { DataPogs } from "@/lib";
export const colorVariants = {
  blue: "text-blue-600",
  red: "text-red-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  brown: "text-[#8B4513]",
};

interface TablePogsProps {
  allDataPogs: DataPogs[] | null;
}

export function TablePogs(props: TablePogsProps) {
  const { allDataPogs } = props;
  console.log(allDataPogs, "table data");

  return (
    <>
      {!allDataPogs && <>No Data</>}
      {allDataPogs && allDataPogs.length > 0 && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Ticker Symbol</TableHead>
              <TableHead>Prev Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allDataPogs.map((pogs: DataPogs) => (
              <TableRow key={pogs.id}>
                <TableCell className="font-medium ">{pogs.id}</TableCell>
                <TableCell>{pogs.name}</TableCell>
                <TableCell className={`${colorVariants[pogs.color]} font-bold`}>
                  {pogs.ticker_symbol}
                </TableCell>
                <TableCell>₱ {pogs.prev_value}</TableCell>
                <TableCell className="text-right">
                  ₱{" "}
                  {Number(pogs.value).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      )}
    </>
  );
}

export default TablePogs;
