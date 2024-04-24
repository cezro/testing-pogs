/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas/formSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { PogDataForm, PogsCreationFormProps } from "@/lib";

type Props = {
  pogPageId: string;
  data: PogDataForm[];
};

function EditButton({ pogPageId, data }: Props) {
  const router = useRouter();

  const [name, setName] = useState(data[0].name);
  const [tickerSymbol, setTickerSymbol] = useState(data[0].ticker_symbol);
  const [price, setPrice] = useState(data[0].price);
  const [color, setColor] = useState(data[0].color);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      ticker_symbol: tickerSymbol,
      price: price,
      color: color,
    },
  });

  const onSubmit = async (data: PogsCreationFormProps) => {
    console.log(data);
    try {
      const parsedData = {
        ...data,
        price: parseFloat(String(data.price)),
      };
      formSchema.parse(parsedData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs/${pogPageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );
      console.log(response.body);

      if (!response.ok) {
        throw new Error(`Failed to UPDATE POG: ${response.statusText}`);
      }

      const dataJson = await response.json();
      console.log(dataJson.message);
      toast({
        title: "Pogs Updated Successfully!",
        description: `Pogs ${data.name} with ticker of ${data.ticker_symbol} has been updated and saved to the database.`,
      });

      console.log("response" + response);
      router.push(`/pogs/${pogPageId}`);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "There was an error updating the POG.",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticker_symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticker Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="Ticker Symbol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditButton;
