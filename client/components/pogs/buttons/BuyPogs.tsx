"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client";
import Balance from "../balance";

type Props = {
  pogPageId: string;
  setIsAddingNewValue: React.Dispatch<React.SetStateAction<boolean>>;
};

function BuyButton({ pogPageId, setIsAddingNewValue }: Props) {
  const { user, error, isLoading } = useUser();
  const [quantity, setQuantity] = useState<number>(0);

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogsTransact/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub_id: user?.sub,
            pogId: Number(pogPageId),
            quantity: quantity,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((data) => {
          console.log(data);
        })

        .catch((error) => {
          console.error("There was an error!", error);
        });
      console.log(response);
      setIsAddingNewValue(true);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Pog</DialogTitle>
          <Balance />
          <DialogDescription>
            Buy amount of pogs. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="Enter price"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BuyButton;
