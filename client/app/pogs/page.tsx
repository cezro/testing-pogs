import CreatePogsButton from "@/components/pogs/createPogs";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

function Pogs({}: Props) {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>Pogs</div>
      <CreatePogsButton />
    </main>
  );
}

export default Pogs;
