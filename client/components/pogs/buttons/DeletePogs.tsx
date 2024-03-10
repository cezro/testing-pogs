"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type PogData = {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
};

type Props = {
  pogPageId: string;
  data: PogData[];
};

export default function DeleteButton({ pogPageId, data }: Props) {
  const router = useRouter();
  function handleDelete() {
    console.log("Delete button clicked");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs/${pogPageId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Pogs Deleted Successfully!",
            description: `Pogs ${data[0].name} with ticker of ${data[0].ticker_symbol} has been deleted and removed from the database.`,
          });
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log(data);
        router.push("/pogs");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently be deleted and
            removed from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
