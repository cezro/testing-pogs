"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputProps } from "@/components/ui/input";

type Props = {
  pogPageId: string;
  setIsAddingNewValue: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddNewValue({ pogPageId, setIsAddingNewValue }: Props) {
  const [price, setPrice] = useState<string>("");

  const onSubmit = async () => {
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      alert("Price must be a valid number greater than 0");
      throw new Error("Price must be a valid number greater than 0");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pog-values/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: parseFloat(price),
            pogId: Number(pogPageId),
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
        <Button variant="outline">Add New Entry</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Value</DialogTitle>
          <DialogDescription>
            Add new value of pogs. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewValue;
