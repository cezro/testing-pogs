import CreatePogsButton from "@/components/pogs/createPogs";
import TablePogs from "@/components/pogs/TablePogRow";

type Props = {};

function Pogs({}: Props) {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <div>Pogs</div>
      <CreatePogsButton />
      <TablePogs />
    </div>
  );
}

export default Pogs;
